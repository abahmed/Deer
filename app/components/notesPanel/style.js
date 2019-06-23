import { fade } from '@material-ui/core/styles/colorManipulator'

export default theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    height: '100vh'
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
  searchIcon: {
    width: theme.spacing.unit * 6,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
