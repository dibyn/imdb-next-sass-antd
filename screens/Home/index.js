import React, { PureComponent } from 'react';
import { Button, Radio, Icon } from 'antd';
import styles from './styles';

export default class Home extends PureComponent {
  state = {
    size: 'large',
  };

  // ====================== EVENT
  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  };

  // ====================== RENDER
  render() {
    const { size } = this.state;
    return (
      <div id="home" className="container full-height-min">
        <div>{'Hello world'}</div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}
