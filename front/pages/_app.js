import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import createSagaMiddleware from "redux-saga";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import Layout from "../components/layout/LayoutContainer";
import reducer from "../reducers";
import rootSaga from "../sagas";
import theme from "../theme";

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
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <GlobalStyle />
      <Head>
        <title>Next</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  </ThemeProvider>
);
// 동적 라우팅 시 해당 컴포넌트에 ctx를 전달
App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};
// App 컴포넌트에 리덕스 주입
export default withRedux((initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
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
  sagaMiddleware.run(rootSaga);
  return store;
})(App);

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  store: PropTypes.object.isRequired,
  pageProps: PropTypes.object.isRequired
};
