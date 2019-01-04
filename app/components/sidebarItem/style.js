import { fade } from '@material-ui/core/styles/colorManipulator'

export default theme => ({
  listItem: {
    padding: '3px',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.25)
    }
  },
  listItemRoot: {
    '&$selected': {
      backgroundColor: fade(theme.palette.primary.main, 0.25),
      '&:hover': {
        backgroundColor: fade(theme.palette.primary.main, 0.25)
      }
    }
  },
  selected: {},
  listItemIcon: {
    marginRight: '2px'
  },
  listItemText: {
    padding: '0px'
  },
  badge: {
    top: 6,
    right: 6
  },
  flexDisplay: {
    display: 'flex'
  }
})
