import App, { Container } from 'next/app';
import Head from 'next/head';
import React from 'react';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import Router, { withRouter } from 'next/router';
import createStore from 'store';
import NProgress from 'nprogress';
import Layout from 'components/Layout';
import { ConfigProvider } from 'antd';
import 'styles/styles.scss';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

class MyApp extends App {
  static async getInitialProps(props) {
    const { Component, ctx } = props;
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Head>
          <title>{'Movie time'}</title>
        </Head>
        <Provider store={store}>
          <ConfigProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ConfigProvider>
        </Provider>
      </Container>
    );
  }
}

// withRouter(MyApp);
export default withRedux(createStore)(MyApp);
