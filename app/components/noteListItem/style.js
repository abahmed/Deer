import { fade } from '@material-ui/core/styles/colorManipulator'

export default theme => ({
  listItem: {
    padding: '15px 0 15px 9px;',
    borderRadius: '4px',
    marginBottom: '10px',
    backgroundColor: fade(theme.palette.primary.main, 0.1),
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
  listItemText: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    paddingRight: '19px',
    fontFamily: ['Mali', 'El Messiri', 'monospace'].join(',')
  },
  CustomNote: {
    position: 'relative',
    right: '0px',
    top: '0px'
  },
  CustomNotetooltip: {
    display: 'block'
  },
  CustomNoteOnHover: {
    display: 'none'
  }
})
