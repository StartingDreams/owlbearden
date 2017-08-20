import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Toolbar } from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import { fromJS } from 'immutable';
import * as CastingActions from '../../ducks/CastingRedux';


export const filterSpells = (filters, spells) => {
  const levels = filters.get('levels');
  const classes = filters.get('classes');
  const levelFilter = spell => (
    levels.indexOf(spell.get('level')) !== -1
  );
  const classFilter = (spell) => {
    const spellClasses = [];
    spell.get('classes').map((classObj) => {
      if (classObj && classObj.get) {
        spellClasses.push(classObj.get('name'));
      }
      return null;
    });
    return spellClasses.find(className => (classes.indexOf(className) !== -1));
  };
  return spells
    .filter(levelFilter)
    .filter(classFilter);
};

export class FilterBar extends React.Component {
  componentDidMount() {
    this.runFilters();
  }

  runFilters() {
    const { dispatch, allSpells, filters } = this.props;
    const spells = filterSpells(filters, allSpells);
    dispatch(CastingActions.setFilteredSpells(spells));
  }

  async updateLevels(value) {
    const { dispatch, filters } = this.props;
    const values = Array.isArray(value) ? value : [value];
    const updatedFilters = filters.set('levels', fromJS(values));
    await dispatch(CastingActions.setFilters(updatedFilters));
    dispatch(CastingActions.setFilteredSpells(this.runFilters()));
  }

  async updateClasses(value) {
    const { dispatch, filters } = this.props;
    const values = Array.isArray(value) ? value : [value];
    const updatedFilters = filters.set('classes', fromJS(values));
    await dispatch(CastingActions.setFilters(updatedFilters));
    dispatch(CastingActions.setFilteredSpells(this.runFilters()));
  }

  render() {
    const { filters } = this.props;
    const updateLevels = (event, key, value) => {
      this.updateLevels(value);
    };
    const updateClasses = (event, key, value) => {
      this.updateClasses(value);
    };

    return (
      <Toolbar>
        <DropDownMenu value={filters.get('levels').first()} onChange={updateLevels}>
          <MenuItem value={0} primaryText="Cantrips" />
          <MenuItem value={1} primaryText="Level 1" />
          <MenuItem value={2} primaryText="Level 2" />
          <MenuItem value={3} primaryText="Level 3" />
          <MenuItem value={4} primaryText="Level 4" />
          <MenuItem value={5} primaryText="Level 5" />
          <MenuItem value={6} primaryText="Level 6" />
          <MenuItem value={7} primaryText="Level 7" />
          <MenuItem value={8} primaryText="Level 8" />
          <MenuItem value={9} primaryText="Level 9" />
        </DropDownMenu>
        <DropDownMenu value={filters.get('classes').first()} onChange={updateClasses}>
          <MenuItem value={'Barbarian'} primaryText="Barbarian" />
          <MenuItem value={'Bard'} primaryText="Bard" />
          <MenuItem value={'Cleric'} primaryText="Cleric" />
          <MenuItem value={'Druid'} primaryText="Druid" />
          <MenuItem value={'Fighter'} primaryText="Fighter" />
          <MenuItem value={'Monk'} primaryText="Monk" />
          <MenuItem value={'Paladin'} primaryText="Paladin" />
          <MenuItem value={'Ranger'} primaryText="Ranger" />
          <MenuItem value={'Rogue'} primaryText="Rogue" />
          <MenuItem value={'Sorcerer'} primaryText="Sorcerer" />
          <MenuItem value={'Warlock'} primaryText="Warlock" />
          <MenuItem value={'Wizard'} primaryText="Wizard" />
        </DropDownMenu>
      </Toolbar>
    );
  }
}

FilterBar.propTypes = {
  filters: ImmutablePropTypes.map,
  dispatch: PropTypes.func,
  allSpells: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      name: PropTypes.string.isRequired,
    }),
  ),
};

export const mapStateToProps = state => ({
  allSpells: state.casting.get('allSpells'),
  filters: state.casting.get('filters'),
  filteredSpells: state.casting.get('filteredSpells'),
});

export default connect(
  mapStateToProps,
)(FilterBar);
