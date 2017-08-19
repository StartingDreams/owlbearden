import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { fromJS } from 'immutable';
import renderer from 'react-test-renderer';
import { Spells, mapStateToProps } from './Spells';
import * as CastingActions from '../../ducks/CastingRedux';

jest.mock('../../ducks/CastingRedux', () => ({ getAllSpells: jest.fn() }));
jest.mock('../../components/Spell', () => (() => (null)));

const spells = [{ name: 'zero' }, { name: 'one' }];
const immutableSpells = fromJS(spells);
const noSpells = fromJS([]);
const testSpell = fromJS([{
  casting_time: '1 action',
  classes: [{
    name: 'Wizard',
    url: 'http://www.dnd5eapi.co/api/classes/12',
  }],
  components: ['V', 'S', 'M'],
  concentration: 'no',
  desc: ['A shimmering green arrow streaks toward a target within range and bursts in a spray of acid. Make a ranged spell attack against the target. On a hit, the target takes 4d4 acid damage immediately and 2d4 acid damage at the end of its next turn. On a miss, the arrow splashes the target with acid for half as much of the initial damage and no damage at the end of its next turn.'],
  duration: 'Instantaneous',
  higher_level: ['When you cast this spell using a spell slot of 3rd level or higher, the damage (both initial and later) increases by 1d4 for each slot level above 2nd.'],
  id: '58f40b80c9e7ce9f72153112',
  index: 1,
  level: 2,
  material: 'Powdered rhubarb leaf and an adder’s stomach.',
  name: 'Acid Arrow',
  page: 'phb 259',
  range: '90 feet',
  ritual: 'no',
  school: {
    name: 'Evocation',
    url: 'http://www.dnd5eapi.co/api/magic-schools/5',
  },
  subclasses: [{
    name: 'Lore',
    url: 'http://www.dnd5eapi.co/api/subclasses/2',
  }, {
    name: 'Land',
    url: 'http://www.dnd5eapi.co/api/subclasses/4',
  }],
  url: 'http://www.dnd5eapi.co/api/spells/1',
}]);

describe('<Spells />', () => {
  it('one spell should match the snapshot, and getAllSpells to not be called', () => {
    const dispatch = () => ('dispatch');
    renderer.create(<Spells spells={testSpell} dispatch={dispatch} />);
    expect(CastingActions.getAllSpells.mock.calls.length).toBe(0);
  });
  it('zero spells should match the snapshot and fetch more spells', () => {
    const dispatch = () => ('dispatch');
    renderer.create(<Spells spells={noSpells} dispatch={dispatch} />);
    expect(CastingActions.getAllSpells).toBeCalledWith(dispatch);
  });
  it('two spells should match the snapshot', () => {
    const dispatch = () => ('dispatch');
    const wrapper = shallow(<Spells spells={immutableSpells} dispatch={dispatch} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('mapStateToProps - spells should be passed in', () => {
    const casting = fromJS({
      spells,
    });
    const state = {
      casting,
    };
    const props = mapStateToProps(state);
    expect(props.spells).toBe(casting.get('spells'));
  });
});
