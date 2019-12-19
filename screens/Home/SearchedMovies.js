import { Col, Card } from 'antd';
const Meta = Card.Meta;
export const SearchedMovies = ({ indx, handleClick, val }) => {
  return (
    <div>
      <Col key={indx} span={8}>
        <Card
          hoverable
          style={{ width: 240, margin: '5px' }}
          onClick={(e) => handleClick(e, val.imdbID)}
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
    </div>
  );
};

export default SearchedMovies;
