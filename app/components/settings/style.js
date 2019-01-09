import { fade } from '@material-ui/core/styles/colorManipulator'

export default theme => ({
  root: {
    flexGrow: 1,
    fontStyle: 'italic',
    alignItems: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: fade(theme.palette.primary.main, 0.1),
    overflow: 'hidden'
  },
  divider: {
    marginTop: '10px',
    marginBottom: '10px'
  },
  paper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    fontStyle: 'italic',
    minWidth: '45%'
  },
  select: {
    width: '-webkit-fill-available',
    textAlign: 'center'
  },
  button: {
    margin: '7px'
  }
})
