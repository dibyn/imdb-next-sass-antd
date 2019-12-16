import React, { PureComponent } from 'react';
import { Button, Radio, Icon } from 'antd';
import { connect } from 'react-redux';
import { fetchMoviesList } from './../../store/Actions/omdb';
import styles from './styles';

export class Home extends PureComponent {
  state = {
    size: 'large',
  };

  // ====================== EVENT
  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  };
  componentDidMount() {
    this.props.fetchMoviesList();
  }

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

export default connect(
  null,
  { fetchMoviesList },
  null
)(Home);
