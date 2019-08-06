import React from "react";
import Document, { Main, NextScript } from "next/document";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { ServerStyleSheet } from "styled-components";

class NextDocument extends Document {
  static getInitialProps(context) {
    // styled-components ssr set up
    const sheet = new ServerStyleSheet();
    const page = context.renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, helmet: Helmet.renderStatic(), styleTags };
  }
  render() {
    const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet; // getInitialProps에서 받아온 데이터
    const htmlAttrs = htmlAttributes.toComponent(); // react-helmet에서 제공하는 html속성들을 컴포넌트화
    const bodyAttrs = bodyAttributes.toComponent(); // react-helmet에서 제공하는 body속성들을 컴포넌트화
    return (
      <html {...htmlAttrs}>
        <head>
          {this.props.styleTags}
          {Object.values(helmet).map(el => el.toComponent())}
        </head>
        <body {...bodyAttrs}>
          {/* app js*/}
          <Main />
          {/* next에 필요한 스크립트*/}
          <NextScript />
        </body>
      </html>
    );
  }
}

export default NextDocument;

NextDocument.propTypes = {
  helmet: PropTypes.object.isRequired,
  styleTags: PropTypes.object.isRequired
};
