import React, { Component } from 'react';
import { Layout, Input } from 'antd';
import Link from 'next/link';
import styles from './styles';
const { Search } = Input;
const { Header } = Layout;

class LayoutHeader extends Component {
  render() {
    return (
      <React.Fragment>
        <Layout>
          <Header className="header">
            <Search
              placeholder="input search text"
              onSearch={(value) => console.log(value)}
              style={{ width: 200 }}
            />
          </Header>
        </Layout>
        <style jsx>{styles}</style>
      </React.Fragment>
    );
  }
}

export default LayoutHeader;
