import { fade } from '@material-ui/core/styles/colorManipulator'

export default theme => ({
  listItem: {
    padding: '15px 0 15px 9px;',
    borderRadius: '4px',
    marginBottom: '10px',
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
  listItemText: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    paddingRight: '19px',
    fontFamily: [
      'Mali',
      'El Messiri',
      'monospace'
    ].join(',')
  }
})
