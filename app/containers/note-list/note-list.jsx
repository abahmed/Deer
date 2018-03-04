import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ACTIONS from './../../actions';
import NoteList from './../../components/note-list';

function mapStateToProps({ notes }) {
  return notes;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ACTIONS, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(
  NoteList
);
