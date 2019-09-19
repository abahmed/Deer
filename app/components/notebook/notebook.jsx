import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Slide from '@material-ui/core/Slide'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import InputBase from '@material-ui/core/InputBase'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Styles from './style'

import { getLastSelectedNoteBook, setLastSelectedNoteBook } from '../../utils/api.electron'

// UI wrappers.
import { withStyles, withTheme } from '@material-ui/core/styles'

/**
 * NoteBook Component
 */
class NoteBook extends React.Component {
  static propTypes = {
    /**
     * ID of active notebook
     */
    activeNoteBookID: PropTypes.string.isRequired,
    /**
     * array of note IDs of active notebook
     */
    noteIDs: PropTypes.array.isRequired,
    /**
     * list of notebook names
     */
    nameList: PropTypes.object.isRequired,
    /**
     * array of notebooks
     */
    noteBooks: PropTypes.array.isRequired,
    /**
     * used to determine if there are notebooks or not
     */
    hasNoteBooks: PropTypes.bool.isRequired,
    /**
     * used to determine if there are notebook notes or not
     */
    hasNoteList: PropTypes.bool.isRequired,
    /**
     * used to determine if a notebook is opened or not
     */
    noteBookIsOpened: PropTypes.bool.isRequired,
    /**
     * fetches notebooks from database into notebooks array
     */
    fetchAllNoteBooks: PropTypes.func.isRequired,
    /**
     * adds a new notebook
     */
    createNoteBook: PropTypes.func.isRequired,
    /**
     * selects active notebook with ID
     */
    setActiveNoteBookID: PropTypes.func.isRequired,
    /**
     * selects notebook with ID
     */
    setSelectedNoteBookID: PropTypes.func.isRequired,
    /**
     * deletes selected notebook
     */
    removeSelectedNoteBook: PropTypes.func.isRequired,
    /**
     * sets notebook is opened prop to true
     */
    openNoteBook: PropTypes.func.isRequired,
    /**
     * sets notebook is opened prop to false
     */
    closeNoteBook: PropTypes.func.isRequired,
    /**
     * creates list of notebook notes
     */
    createNoteList: PropTypes.func.isRequired,
    /**
     * deletes list of notebook notes
     */
    deleteNoteList: PropTypes.func.isRequired,
    /**
     * styles for this component
     */
    classes: PropTypes.object.isRequired,
    /**
     * theme used generally in App
     */
    theme: PropTypes.object.isRequired,
    /**
     * gets current translation
     */
    t: PropTypes.func.isRequired,
    /**
     * used for navigation after saving
     */
    history: PropTypes.object.isRequired
  }

  /**
   * this is constructor description.
   * @param {object} props passed to component
   */
  constructor (props) {
    super()

    this.state = {
      noteBookName: '',
      errorMessage: '',
      activeNoteBookID: '',
      noteBookIsOpened: false,
      selectedNoteBookID: getLastSelectedNoteBook()
    }

    this.handleOnNameChange = this.handleOnNameChange.bind(this)
    this.handleOnNoteBookChange = this.handleOnNoteBookChange.bind(this)
    this.showErrorMessage = this.showErrorMessage.bind(this)
    this.handleOnClickNewNoteBook = this.handleOnClickNewNoteBook.bind(this)
    this.handleRemoveSelectedNoteBook = this.handleRemoveSelectedNoteBook.bind(this)
    this.isApplyDisabled = this.isApplyDisabled.bind(this)
    this.isOpenDisabled = this.isOpenDisabled.bind(this)
    this.handleOnApplyClick = this.handleOnApplyClick.bind(this)
    this.handleOnOpenClick = this.handleOnOpenClick.bind(this)
    this.handleOnReturnClick = this.handleOnReturnClick.bind(this)
  }

  /**
   * Called after mounting component.
   */
  componentDidMount () {
    // Trigger fetching notebooks as this component is loaded.
    if (!this.props.hasNoteBooks) {
      this.props.fetchAllNoteBooks()
    }
  }

  /**
   * Called when user writes in name field.
   */
  handleOnNameChange (event) {
    // Local component state used for UI internally, so we don't need to keep
    // it in Redux.
    this.setState({ noteBookName: event.target.value })
  }

  /**
   * Called when user changes notebook.
   */
  handleOnNoteBookChange (event) {
    // Local component state used for UI internally, so we don't need to keep
    // it in Redux.
    this.setState({ selectedNoteBookID: event.target.value })
    // Save the selected notebook
    setLastSelectedNoteBook(event.target.value)
  }

  /**
   * Called when an error occurs.
   */
  showErrorMessage (errorMessage) {
    // Local component state used for UI internally, so we don't need to keep
    // it in Redux.
    this.setState({ errorMessage: errorMessage })
    // Stop showing the message once 3 seconds have passed
    setTimeout(() => {
      this.setState({ errorMessage: '' })
    }, 3000)
  }

  /**
   * Called when users clicks on new notebook button.
   */
  handleOnClickNewNoteBook () {
    const noteBookName = this.state.noteBookName.trim()
    const nameList = this.props.nameList
    if (noteBookName.length === 0) {
      this.showErrorMessage('Name cannot be empty')
    } else if (nameList[noteBookName]) {
      this.showErrorMessage('Name already exists')
    } else {
      this.props.createNoteBook(noteBookName)
      this.setState({ noteBookName: '' })
    }
  }

  /**
   * Called when users clicks on delete button.
   */
  handleRemoveSelectedNoteBook () {
    const selectedNoteBookID = this.state.selectedNoteBookID
    const activeNoteBookID = this.state.activeNoteBookID
    this.props.setSelectedNoteBookID(selectedNoteBookID)
    this.props.removeSelectedNoteBook()
    setLastSelectedNoteBook('none')

    if (selectedNoteBookID === activeNoteBookID) {
      this.props.setActiveNoteBookID('none')
      this.setState({
        activeNoteBookID: 'none',
        selectedNoteBookID: 'none'
      })
    } else {
      this.setState({ selectedNoteBookID: 'none' })
    }
  }

  /**
   * Checks if user selected a different notebook than the active notebook
   * @return {boolean} True if the same notebook has been selected,
   * otherwise returns false.
   */
  isApplyDisabled () {
    if (this.state.selectedNoteBookID !== this.props.activeNoteBookID) {
      return false
    }
    return true
  }

  /**
   * Checks if selected notebook is active
   * @return {boolean} False if selected notebook is active,
   * otherwise returns true.
   */
  isOpenDisabled () {
    const activeNoteBookID = this.props.activeNoteBookID
    const selectedNoteBookID = this.state.selectedNoteBookID
    if (selectedNoteBookID === activeNoteBookID && selectedNoteBookID !== 'none') {
      return false
    }
    return true
  }

  /**
   * Called when user clicks on apply button.
   */
  handleOnApplyClick () {
    const selectedNoteBookID = this.state.selectedNoteBookID
    this.setState({ activeNoteBookID: selectedNoteBookID })
    this.props.setActiveNoteBookID(selectedNoteBookID)
    if (this.props.hasNoteList) {
      this.props.closeNoteBook()
      this.props.deleteNoteList()
    }
  }

  /**
   * Called when user clicks on open button.
   */
  handleOnOpenClick () {
    if (this.props.noteIDs.length === 0) {
      this.showErrorMessage('Notebook cannot be empty')
    } else {
      if (this.state.noteBookIsOpened) {
        this.props.closeNoteBook()
      }
      this.props.openNoteBook()
      this.setState({ noteBookIsOpened: true })
    }
  }

  /**
   * Called when user clicks on return button.
   */
  handleOnReturnClick () {
    this.props.history.push('/')
  }

  /**
   * called before un-mounting component.
   */
  componentWillUnmount () {
    if (
      this.props.noteIDs.length !== 0 &&
      this.state.activeNoteBookID.length !== 0 &&
      this.state.activeNoteBookID !== 'none'
    ) {
      this.props.createNoteList()
    }
  }

  /**
   * Rendering method
   */
  render () {
    // Redirect to home when a notebook is opened or closed
    if (this.state.noteBookIsOpened || this.state.activeNoteBookID === 'none') {
      return <Redirect to='/' />
    }

    const { classes, t } = this.props
    return (
      <Slide in direction='left'>
        <Grid container justify='center' className={classes.root}>
          <Paper className={classes.paper}>
            <Typography variant='h5'>{t('settings:notebooks')}</Typography>
            <Divider className={classes.divider} />
            <Typography variant='h5'>{this.state.errorMessage}</Typography>
            <Divider className={classes.divider} />
            <Grid container>
              <Grid item xs={9}>
                <Toolbar variant='dense' className={classes.toolbar}>
                  <div className={classes.search}>
                    <InputBase
                      placeholder='Enter Notebook Name'
                      value={this.state.noteBookName}
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput
                      }}
                      onChange={this.handleOnNameChange}
                    />
                  </div>
                </Toolbar>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant='contained'
                  color='primary'
                  className={classes.button}
                  onClick={this.handleOnClickNewNoteBook}
                >
                  {t('settings:addBtn')}
                </Button>
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <Grid container>
              <Grid item xs={4}>
                <Typography variant='body1'>{t('settings:notebook')}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Select
                  value={this.state.selectedNoteBookID}
                  onChange={this.handleOnNoteBookChange}
                  className={classes.select}
                  color='primary'
                >
                  <MenuItem value='none'>none</MenuItem>
                  {this.props.noteBooks.map((noteBook, index) => (
                    <MenuItem key={index} value={noteBook.id}>
                      {noteBook.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={2}>
                {this.state.selectedNoteBookID !== 'none' ? (
                  <IconButton color='primary' onClick={this.handleRemoveSelectedNoteBook}>
                    <DeleteIcon />
                  </IconButton>
                ) : (
                  ''
                )}
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <div className={classes.buttons}>
              <Button
                variant='contained'
                color='primary'
                className={classes.button}
                disabled={this.isApplyDisabled()}
                onClick={this.handleOnApplyClick}
              >
                {t('settings:applyBtn')}
              </Button>
              <Button
                variant='contained'
                color='primary'
                className={classes.button}
                disabled={this.isOpenDisabled()}
                onClick={this.handleOnOpenClick}
              >
                {t('settings:openBtn')}
              </Button>
              <Button
                variant='contained'
                color='primary'
                className={classes.button}
                onClick={this.handleOnReturnClick}
              >
                {t('settings:backBtn')}
              </Button>
            </div>
          </Paper>
        </Grid>
      </Slide>
    )
  }
}
export default withTheme()(withStyles(Styles)(NoteBook))
