import React from 'react';
import ReactDOM from 'react-dom';
import Spell from './modules/Casting/components/Spell';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Spell />, div);
});
