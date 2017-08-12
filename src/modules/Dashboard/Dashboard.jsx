import React from 'react';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import { NavLink } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const Dashboard = () => (
  <Card>
    <CardTitle title="Casting" subtitle="Spell helpers" />
    <CardText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    </CardText>
    <CardActions>
      <FlatButton
        containerElement={<NavLink to="/casting/spells" />}
        icon={<FontIcon className="material-icons">whatshot</FontIcon>}
        label="Spells"
      />
    </CardActions>
  </Card>
);

export default Dashboard;
