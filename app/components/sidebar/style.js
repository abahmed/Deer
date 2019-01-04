import { fade } from '@material-ui/core/styles/colorManipulator'

export default theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: fade(theme.palette.primary.main, 0.05),
    height: '-webkit-fill-available',
    width: '230px'
  },
  section: {
    marginTop: '2px'
  },
  list: {
    paddingRight: '10px',
    paddingLeft: '10px'
  }
})
