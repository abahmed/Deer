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
  content: {
    marginLeft: '70px',
    height: '256px',
    width: '40%',
    textAlign: 'center'
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
    width: '-webkit-fill-available'
  },
  button: {
    margin: '7px'
  }
})
