import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey500 } from 'material-ui/styles/colors';
import colors, { brandColor } from './Colors';

const theme = getMuiTheme({
  fontFamily: '"Lato", Helvetica, Arial, sans-serif',
  button: {
    textTransform: 'none',
  },
  palette: {
    accent1Color: brandColor,
    primary3Color: grey500,
    textColor: colors.textColor,
    headerColor: colors.headerColor,
  },
  chip: {
    fontSize: 11,
  },
});

export default theme;
