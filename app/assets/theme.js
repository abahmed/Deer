import { createMuiTheme } from '@material-ui/core/styles'
import i18n from '../i18n/i18n'

export const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#3FB57F',
      contrastText: '#fff'
    },
    secondary: { main: '#673ab7' },
    status: {
      danger: '#b71c1c'
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: [
      'Roboto',
      'sans-serif'
    ].join(',')
  },
  direction: 'ltr'
})
