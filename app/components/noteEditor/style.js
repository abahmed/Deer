export default theme => ({
  root: {
    flexGrow: 1,
    padding: 0,
    height: '100vh'
  },
  editor: {
    '& .ql-container': {
      height: 'calc(100vh - 66px)',
      overflow: 'auto',
      fontFamily: [
        'Mali',
        'El Messiri',
        'monospace'
      ].join(','),
      fontSize: '15px',
      color: 'black',
      border: 0
    }
  }
})
