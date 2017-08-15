import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<div />, div);
});

it('div renders correctly', () => {
  const tree = renderer.create(<div>test</div>).toJSON();
  expect(tree).toMatchSnapshot();
});
