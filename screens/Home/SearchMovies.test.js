import React from 'react';
import { shallow } from 'enzyme';
import SearchedMovies from './SearchedMovies';
describe('SearchedMovies', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<SearchedMovies debug />);

    expect(component).toMatchSnapshot();
  });
});
