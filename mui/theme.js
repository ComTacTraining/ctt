import { createMuiTheme } from '@material-ui/core/styles'
import { red, brown, green } from '@material-ui/core/colors'

const headersFontFamily = [
  'Anton',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
].join(',');

const defaultFontFamily = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
].join(',');


const theme = createMuiTheme(({
  palette: {
    primary: { main: red[900] },
    secondary: { main: brown[200] },
    type: 'light',
  },
  // palette: {
  //   primary: red,
  //   secondary: brown,
  // },
  typography: {
    fontFamily: defaultFontFamily,
    h1: {
      fontFamily: headersFontFamily,
    },
    h2: {
      fontFamily: headersFontFamily,
    },
    h3: {
      fontFamily: headersFontFamily,
    },
    h4: {
      fontFamily: headersFontFamily,
    },
    h5: {
      fontFamily: headersFontFamily,
    },
    h6: {
      fontFamily: headersFontFamily,
    },
    subtitle1: {
      fontFamily: headersFontFamily,
    },
    subtitle2: {
      fontFamily: headersFontFamily,
    },
  },
  shape: {
    borderRadius: 4
  },
}))

export default theme