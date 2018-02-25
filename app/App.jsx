import React, {Component} from 'react';

import AddNote from './components/add-note';
import NoteList from './containers/note-list';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1> Deer </h1>
        <AddNote />
        <NoteList />
      </div>
    )
  }
}


export default App
