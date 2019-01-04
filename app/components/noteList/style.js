import { fade } from '@material-ui/core/styles/colorManipulator'

export default theme => ({
  root: {
    flexGrow: 1,
    overflow: 'auto',
    height: '94%',
    backgroundColor: fade(theme.palette.primary.main, 0.04)
  },
  section: {
    marginTop: '2px'
  },
  list: {
    paddingRight: '10px',
    paddingLeft: '10px',
    paddingButtom: 0
  }
})
