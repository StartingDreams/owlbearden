import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import * as CastingActions from '../../ducks/CastingRedux';
import Spell from '../../components/Spell';

class Spells extends React.Component {
  componentDidMount() {
    const { dispatch, spells } = this.props;
    if (spells.size !== 0) {
      return;
    }
    dispatch(CastingActions.getAllSpells());
  }

  render() {
    const { spells } = this.props;
    return (
      <div>
        { spells.map((spell, key) => (
          <Spell
            key={key}
            spell={spell}
          />
        ))}
      </div>
    );
  }
}

Spells.propTypes = {
  dispatch: PropTypes.func,
  spells: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      something: PropTypes.string.isRequired,
    }),
  ),
};

export const mapStateToProps = state => ({
  spells: state.casting.get('spells'),
});

export default connect(
  mapStateToProps,
)(Spells);
