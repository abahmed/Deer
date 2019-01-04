import { fade } from '@material-ui/core/styles/colorManipulator'
export default theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    height: '100vh'
  },
  menuButton: {
    marginLeft: -20,
    marginRight: 3
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.main, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.25)
    },
    marginRight: 0,
    marginLeft: 0,
    width: '-webkit-fill-available'
  },
  searchIcon: {
    width: '40px',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: '40px',
    fontFamily: [
      'Mali',
      'El Messiri',
      'monospace'
    ].join(',')
  },
  noteAddButton: {
    marginLeft: '3px',
    marginRight: '-19px'
  }
})
