import React from 'react';
import Init from './containers/Init';
import Auth from './containers/Auth';


export class Firebase extends React.Component {
  componentDidMount = () => {};

  render = () => (
    <div>
      <Init />
      <Auth />
    </div>
  );
}

export default Firebase;
