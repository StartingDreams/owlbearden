import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import * as CastingActions from '../../ducks/CastingRedux';
import Spell from '../../components/Spell';
import FilterBar from '../FilterBar';

export class SpellList extends React.Component {
  componentDidMount() {
    const { dispatch, allSpells } = this.props;
    if (allSpells.size !== 0) {
      return;
    }
    CastingActions.getAllSpells(dispatch);
  }

  shouldComponentUpdate(nextProps) {
    if (!nextProps.filteredSpells || nextProps.filteredSpells === 'undefined') {
      return false;
    }
    if (this.props.allSpells !== nextProps.allSpells) {
      return true;
    }
    return this.props.filteredSpells !== nextProps.filteredSpells;
  }

  render() {
    const { filteredSpells, allSpells } = this.props;
    return (
      <div>
        { allSpells.size === 0 ? null : <FilterBar /> }
        { filteredSpells.map((spell, key) => (
          <Spell
            key={key}
            spell={spell}
          />
        ))}
      </div>
    );
  }
}

SpellList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  allSpells: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  filteredSpells: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      name: PropTypes.string.isRequired,
    }),
  ),
};

export const mapStateToProps = state => ({
  filteredSpells: state.casting.get('filteredSpells'),
  allSpells: state.casting.get('allSpells'),
});

export default connect(
  mapStateToProps,
)(SpellList);
