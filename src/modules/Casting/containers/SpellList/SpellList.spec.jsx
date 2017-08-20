import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { fromJS } from 'immutable';
import renderer from 'react-test-renderer';
import { SpellList, mapStateToProps } from './SpellList';
import * as CastingActions from '../../ducks/CastingRedux';

jest.mock('../../ducks/CastingRedux', () => ({ getAllSpells: jest.fn() }));
jest.mock('../../components/Spell', () => (() => (null)));
jest.mock('../FilterBar', () => (() => (null)));

const spells = [
  {
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
  },
  {
    casting_time: '1 minute',
    classes: [{
      name: 'Cleric',
      url: 'http://www.dnd5eapi.co/api/classes/3',
    }],
    components: ['V', 'S', 'M'],
    concentration: 'no',
    desc: ['You contact your deity or a divine proxy and ask up to three questions that can be answered with a yes or no. You must ask your questions before the spell ends. You receive a correct answer for each question.', 'Divine beings aren’t necessarily omniscient, so you might receive “unclear” as an answer if a question pertains to information that lies beyond the deity’s knowledge. In a case where a one-word answer could be misleading or contrary to the deity’s interests, the DM might offer a short phrase as an answer instead.', 'If you cast the spell two or more times before finishing your next long rest, there is a cumulative 25 percent chance for each casting after the first that you get no answer. The DM makes this roll in secret.'],
    duration: '1 minute',
    id: '58f40b80c9e7ce9f72153149',
    index: 45,
    level: 5,
    material: 'Incense and a vial of holy or unholy water.',
    name: 'Commune',
    page: 'phb 223',
    range: 'Self',
    ritual: 'yes',
    school: {
      name: 'Divination',
      url: 'http://www.dnd5eapi.co/api/magic-schools/3',
    },
    subclasses: [{
      name: 'Devotion',
      url: 'http://www.dnd5eapi.co/api/subclasses/7',
    }],
    url: 'http://www.dnd5eapi.co/api/spells/45',
  },
  {
    casting_time: '1 bonus action',
    classes: [{
      name: 'Paladin',
      url: 'http://www.dnd5eapi.co/api/classes/7',
    }],
    components: ['V', 'S'],
    concentration: 'yes',
    desc: ['Your prayer empowers you with divine radiance. Until the spell ends, your weapon attacks deal an extra 1d4 radiant damage on a hit.'],
    duration: 'Up to 1 minute',
    id: '58f40b80c9e7ce9f72153164',
    index: 84,
    level: 1,
    name: 'Divine Favor',
    page: 'phb 234',
    range: 'Self',
    ritual: 'no',
    school: {
      name: 'Evocation',
      url: 'http://www.dnd5eapi.co/api/magic-schools/5',
    },
    subclasses: [{
      name: 'Lore',
      url: 'http://www.dnd5eapi.co/api/subclasses/2',
    }],
    url: 'http://www.dnd5eapi.co/api/spells/84',
  },
];

const immutableSpells = fromJS(spells);
const noSpells = fromJS([]);
const testSpell = fromJS([spells[0]]);

describe('<SpellList />', () => {
  it('one spell should match the snapshot, and getAllSpells to not be called', () => {
    const dispatch = () => ('dispatch');
    renderer.create(<SpellList
      allSpells={testSpell}
      filteredSpells={testSpell}
      dispatch={dispatch}
    />);
    expect(CastingActions.getAllSpells.mock.calls.length).toBe(0);
  });
  it('zero spells should match the snapshot and fetch more spells', () => {
    const dispatch = () => ('dispatch');
    renderer.create(<SpellList
      allSpells={noSpells}
      filteredSpells={noSpells}
      dispatch={dispatch}
    />);
    expect(CastingActions.getAllSpells).toBeCalledWith(dispatch);
  });
  it('two spells should match the snapshot', () => {
    const dispatch = () => ('dispatch');
    const wrapper = shallow(<SpellList
      allSpells={immutableSpells}
      filteredSpells={immutableSpells}
      dispatch={dispatch}
    />);
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
    expect(props.allSpells).toBe(casting.get('allSpells'));
  });
});
