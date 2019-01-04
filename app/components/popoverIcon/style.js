import { fade } from '@material-ui/core/styles/colorManipulator'

export default theme => ({
  root: {
    display: 'inline'
  },
  popover: {
    pointerEvents: 'none'
  },
  paper: {
    padding: theme.spacing.unit
  }
})
