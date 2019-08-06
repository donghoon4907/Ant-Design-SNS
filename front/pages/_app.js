import React from "react";
import PropTypes from "prop-types";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import createSagaMiddleware from "redux-saga";
import withReduxSaga from "next-redux-saga";
import axios from "axios";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import Helmet from "react-helmet";
import { Container } from "next/app";

import Layout from "../components/layout/LayoutContainer";
import reducer from "../reducers";
import rootSaga from "../sagas";
import theme from "../theme";
import { LOAD_USER_REQUEST } from "../reducers/user";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Stylish&display=swap');

  ::-webkit-scrollbar { 
    display: none; 
  }
  body {
    font-family: 'Stylish', sans-serif;
  }
`;

const App = ({ Component, store, pageProps }) => (
  <Container>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Helmet
          title="Next"
          htmlAttributes={{ lang: "ko" }}
          meta={[
            {
              charset: "UTF-8"
            },
            {
              name: "viewport",
              content:
                "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes"
            },
            {
              "http-equiv": "X-UA-Compatible",
              content: "IE=edge"
            },
            {
              name: "description",
              content: "Next SNS"
            },
            {
              property: "og:type",
              content: "website"
            },
            {
              property: "og:title",
              content: "Next"
            },
            {
              property: "og:description",
              content: "Next SNS"
            }
          ]}
          link={[
            {
              rel: "stylesheet",
              href:
                "https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"
            },
            {
              rel: "stylesheet",
              href:
                "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            },
            {
              rel: "stylesheet",
              href:
                "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            }
          ]}
        />
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ThemeProvider>
  </Container>
);
// 동적 라우팅 시 해당 컴포넌트에 ctx를 전달
App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  // redux의 store 데이터에 접근
  const state = ctx.store.getState();
  // 서버 환경에서만 쿠키 직접 다루기
  // SSR 시 요청에 필요한 쿠키는 직접 넣어줘야한다.
  const cookie = ctx.isServer ? ctx.req.headers.cookie : "";
  // axios 요청 시 기본적으로 헤더에 쿠키를 포함시킵니다.
  if (ctx.isServer && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  // 로그인한 유저의 데이터 가져오기
  if (!state.user.loadUserData) {
    ctx.store.dispatch({
      type: LOAD_USER_REQUEST
    });
  }
  // 각 컴포넌트에 getInitialProps를 구현한 경우, ctx를 주입
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};
// App 컴포넌트에 리덕스 주입
export default withRedux((initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    sagaMiddleware,
    store => next => action => {
      // redux saga 에러 디버깅을 위한 커스텀 미들웨어
      console.log(action);
      next(action);
    }
  ];
  // development 환경인 경우 노출, production 환경인 경우 노출되지 않도록 구현
  const enhancer =
    process.env.NODE_ENV !== "production"
      ? compose(
          applyMiddleware(...middlewares),
          !options.isServer &&
            window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : f => f
        )
      : compose(applyMiddleware(...middlewares));
  const store = createStore(reducer, initialState, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
  // next에서 ssr 구현 시 리덕스를 사용하는 방법
})(withReduxSaga(App));

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  store: PropTypes.object.isRequired,
  pageProps: PropTypes.object
};
