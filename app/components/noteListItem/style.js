import { fade } from '@material-ui/core/styles/colorManipulator'

export default theme => ({
  listItem: {
    padding: '15px 0 15px 9px;',
    borderRadius: '4px',
    backgroundColor: fade(theme.palette.primary.main, 0.10),
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
    fontFamily: [
      'Mali',
      'El Messiri',
      'monospace'
    ].join(',')
  },
  badge: {
    top: 6,
    right: 6
  },
  flexDisplay: {
    display: 'flex'
  }
})
