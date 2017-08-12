import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

export class Spell extends React.PureComponent {
  render() {
    const { spell } = this.props;
    return (
      <div>{JSON.stringify(spell)}</div>
    );
  }
}

Spell.propTypes = {
  spell: ImmutablePropTypes.contains({
    something: PropTypes.string.isRequired,
  }),
};

export default Spell;
