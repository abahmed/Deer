import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  palette: {

    type: 'light',
    primary: { main: '#3FB57F' },
    secondary: { main: '#673ab7' },
    status: {
      danger: '#b71c1c'
    }
  },
  typography: {
    useNextVariants: true
  }
})
