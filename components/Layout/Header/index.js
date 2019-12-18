import { Layout, Input } from 'antd';
import styles from './styles';
import { connect } from 'react-redux';
const { Search } = Input;
const { Header } = Layout;
import { searchMovies } from 'store/Actions/omdb';
class LayoutHeader extends React.Component {
  handleSearch = async (val) => {
    val.length >= 1 && await this.props.searchMovies(val);
  };
  render() {
    return (
      <React.Fragment>
        <Layout>
          <Header className="header">
            <Search
              placeholder="Search movies"
              onSearch={(value) => this.handleSearch(value)}
              style={{ width: 200 }}
            />
          </Header>
        </Layout>
        <style jsx>{styles}</style>
      </React.Fragment>
    );
  }
}
export default connect(null, { searchMovies }, null)(LayoutHeader);
