import React, { PureComponent } from 'react';
import { Row, Col, Card, Descriptions, Pagination } from 'antd';
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
  'tt0108102',
];
export class Home extends PureComponent {
  state = {
    current: 1,
  };
  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  };
  handleClick = async (e, imdbID) => {
    await this.props.fetchMoviesList(imdbID, 0);
  };
  randomMovie = (obj) => {
    let keys = Object.keys(obj);
    this.setState({
      randMovie: obj[keys[(keys.length * Math.random()) << 0]],
    });
    return obj[keys[(keys.length * Math.random()) << 0]];
  };
  onChange = async (page) => {
    this.setState({
      current: page,
    });
    await this.props.fetchMoviesList(moviesListById[page], 0);
  };
  async componentDidMount() {
    let randomId =
      moviesListById[Math.floor(Math.random() * moviesListById.length)];
    await this.props.fetchMoviesList(randomId, 0);
  }
  componentDidCatch(error, info) {
    if (error) {
      this.setState({
        errorNow: true,
      });
    }
  }
  render() {
    const { movieList, moviesList_1, omdbData } = this.props;
    const { errorNow } = this.state;
    return errorNow || (movieList && movieList.Error) ? (
      <h1 style={{ textAlign: 'center' }}>{'Error? No, Its feature'}</h1>
    ) : (
      <div style={{ background: '#fff', padding: '30px' }}>
        <Row gutter={0}>
          {moviesList_1 && moviesList_1 ? (
            <React.Fragment>
              <Pagination
                current={this.state.current}
                onChange={this.onChange}
                total={50}
              />
              <Descriptions
                title={moviesList_1.Title}
                bordered
                style={{ paddingTop: '20px' }}
              >
                {_.map(moviesList_1, (val, key) => {
                  return (
                    <Descriptions.Item key={key} label={key}>
                      {typeof val === 'string' &&
                        (key !== 'Poster' ? (
                          val
                        ) : (
                          <img alt={'poster'} src={val} />
                        ))}
                    </Descriptions.Item>
                  );
                })}
              </Descriptions>
            </React.Fragment>
          ) : (
            movieList &&
            movieList.Search.sort((p, n) => {
              return p.Year - n.Year;
            }).map((val, indx) => {
              return (
                <Col key={indx} span={8}>
                  <Card
                    hoverable
                    style={{ width: 240, margin: '5px' }}
                    onClick={(e) => this.handleClick(e, val.imdbID)}
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
                          Year: {val.Year} | Type: {val.Type}
                        </span>
                      }
                    />
                  </Card>
                </Col>
              );
            })
          )}
        </Row>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    omdbData: state.omdbReducer,
    movieList: state.omdbReducer.movieList,
    moviesList_1: state.omdbReducer.moviesList_1,
  };
};

export default connect(mapStateToProps, { fetchMoviesList }, null)(Home);
