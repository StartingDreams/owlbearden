import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText } from 'material-ui/Card';

export class Spell extends React.PureComponent {
  render() {
    const { spell } = this.props;
    console.log(spell);
    const subtitle = `level: ${spell.get('level')}, range: ${spell.get('range')}, casting time: ${spell.get('casting_time')}`;
    return (
      <Card>
        <CardHeader
          title={spell.get('name')}
          subtitle={subtitle}
          actAsExpander
          showExpandableButton
        />
        <CardText expandable>
          <ul>
            <li>Level: {spell.get('level')}</li>
            <li>Range: {spell.get('range')}</li>
            <li>Ritual: {spell.get('ritual')}</li>
            <li>School: {spell.get('school')}</li>
            <li>Casting Time: {spell.get('casting_time')}</li>
            <li>Components: {spell.get('components')}</li>
            <li>Duration: {spell.get('duration')}</li>
            <li>Concentration: {spell.get('concentration')}</li>
            <li>Cast at higher level: {spell.get('higher_level')}</li>
          </ul>
          <p>{spell.get('desc').join('<br/>')} {spell.get('page')}</p>
        </CardText>
      </Card>
    );
  }
}

Spell.propTypes = {
  spell: ImmutablePropTypes.contains({
    name: PropTypes.string.isRequired,
  }),
};

export default Spell;
