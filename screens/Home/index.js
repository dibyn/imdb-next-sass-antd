import React, { PureComponent } from 'react';
import { Row, Col, Card, Descriptions, Badge } from 'antd';
import { connect } from 'react-redux';
import { fetchMoviesList } from './../../store/Actions/omdb';
import styles from './styles';
import _ from 'underscore';
const { Meta } = Card;
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
    const { moviesList_1, movieList } = this.props;
    return (
      <div style={{ background: '#fff', padding: '30px' }}>
        <Row gutter={0}>
          {movieList
            ? movieList.Search.map((val, indx) => {
                return (
                  <Col key={indx} span={8}>
                    <Card
                      hoverable
                      style={{ width: 240, margin: '5px' }}
                      cover={
                        <img
                          alt={val.title}
                          onError={(e) => {
                            e.target.onError = null;
                            e.target.src =
                              'https://via.placeholder.com/300/ebebeb/525252?text=Image Not Found';
                          }}
                          src={val.Poster}
                        />
                      }
                    >
                      <Meta
                        title={val.Title}
                        description={
                          <span>
                            Year: {val.year} | Type: {val.Type}
                          </span>
                        }
                      />
                    </Card>
                  </Col>
                );
              })
            : moviesList_1 && (
                <Descriptions title={moviesList_1.Title} bordered>
                  {_.map(moviesList_1, (val, key) => {
                    return (
                      <Descriptions.Item key={key} label={key}>
                        {typeof val === 'string' && val}
                      </Descriptions.Item>
                    );
                  })}
                </Descriptions>
              )}
        </Row>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    omdbReducer: state.omdbReducer,
    movieList: state.omdbReducer.movieList,
    moviesList_1: state.omdbReducer.moviesList_1,
  };
};

export default connect(mapStateToProps, { fetchMoviesList }, null)(Home);
