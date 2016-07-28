import React from 'react';

import TaskListsStore from './stores/TaskListsStore';
import TasksStore from './stores/TasksStore';
import ShowError from './components/ShowError.jsx';


import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import './styles/base.less';

function getStateFromFlux() {
  return {
    error: TasksStore.getError() || TaskListsStore.getError() || null,
  };
}

const App = React.createClass({

  getInitialState(){
    return {
      ...getStateFromFlux()
    }
  },

  componentDidMount() {
    TasksStore.addChangeListener(this._onChange);
    TaskListsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    TasksStore.removeChangeListener(this._onChange);
    TaskListsStore.removeChangeListener(this._onChange);
  },

  render() {
    return (
      <div className='App'>
        {this.state.error && <ShowError error={this.state.error}/>}
        {this.props.children}
      </div>
    );
  },

  _onChange() {
    this.setState(getStateFromFlux());
  }
});

export default App;
