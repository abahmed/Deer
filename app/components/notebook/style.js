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
    overflow: 'auto'
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
  button: {
    margin: '7px'
  },
  select: {
    width: '-webkit-fill-available',
    textAlign: 'center'
  },
  toolbar: {
    justifyContent: 'center',
    paddingRight: '7px',
    paddingLeft: '7px',
    paddingTop: '0px',
    paddingBottom: '0px'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.main, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.25),
      '&:focus': {
        backgroundColor: fade(theme.palette.primary.main, 0.25)
      }
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.primary.main, 0.25)
    },
    marginLeft: 0,
    width: '100%'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
    fontFamily: ['Mali', 'El Messiri', 'monospace'].join(',')
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 5,
    width: '100%'
  }
})
