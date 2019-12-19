import { Layout, Input } from 'antd';
import styles from './styles';
import { connect } from 'react-redux';
const { Search } = Input;
const { Header } = Layout;
import { searchMovies, fetchMoviesList } from 'store/Actions/omdb';
class LayoutHeader extends React.Component {
  handleSearch = async (val, id) => {
    const searchVal = id === 'onChange' ? val.target.value : val;
    searchVal.length >= 1
      ? await this.props.searchMovies(searchVal)
      : searchVal.length === 0 &&
        (await this.props.fetchMoviesList('tt0108052', 0));
  };
  render() {
    return (
      <React.Fragment>
        <Layout>
          <Header className="header">
            <Search
              placeholder="Search movies"
              onChange={(e) =>
                e.target.value.length === 0 && this.handleSearch(e, 'onChange')
              }
              onSearch={(value) => this.handleSearch(value, 'onSearch')}
              style={{ width: 200 }}
            />
          </Header>
        </Layout>
        <style jsx>{styles}</style>
      </React.Fragment>
    );
  }
}
export default connect(
  null,
  { searchMovies, fetchMoviesList },
  null
)(LayoutHeader);
