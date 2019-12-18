import React, { PureComponent } from 'react';
import { Row, Col, Card } from 'antd';
import { connect } from 'react-redux';
import { fetchMoviesList } from './../../store/Actions/omdb';
import styles from './styles';
const moviesListById = [
  'tt7975244',
  'tt0111161',
  'tt0068646',
  'tt0110912',
  'tt0108052',
];
export class Home extends PureComponent {
  state = {
    size: 'large',
  };

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  };
  async componentDidMount() {
    moviesListById.map(
      async (val, i) => await this.props.fetchMoviesList(val, i)
    );
  }

  render() {
    return (
      <div style={{ background: '#fff', padding: '30px' }}>
        <Row gutter={16}>
          <Col span={6}>
            <Card title="Card title" bordered={true}>
              Card content
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Card title" bordered={true}>
              Card content
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Card title" bordered={true}>
              Card content
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Card title" bordered={true}>
              Card content
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    omdbReducer: state.omdbReducer,
  };
};

export default connect(mapStateToProps, { fetchMoviesList }, null)(Home);
