import { fade } from '@material-ui/core/styles/colorManipulator'

export default theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: 0,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100vh',
    backgroundColor: fade(theme.palette.primary.main, 0.05)
  }
})
