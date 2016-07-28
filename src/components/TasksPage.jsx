import React from 'react';

import CircularProgress from 'material-ui/lib/circular-progress';
import IconButton from 'material-ui/lib/icon-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import IconDelete from 'material-ui/lib/svg-icons/action/delete';
import IconModeEdit from 'material-ui/lib/svg-icons/editor/mode-edit';

import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

import Task from './Task.jsx';

import './TasksPage.less';

const TasksPage = React.createClass({
  getInitialState() {
    return {
      isTaskListEditing: false
    }
  },

  hadleTaskListNameChange(event) {
    this.newTaskListName = event.target.value;
  },

  handleListEdit() {
    this.setState({
      isTaskListEditing: true
    })
  },

  handleSave() {
    this.setState({
      isTaskListEditing: false
    });
    this.props.onSave(this.newTaskListName);
  },

  handleCancel() {
    this.setState({
      isTaskListEditing: false
    })
  },

  renderTasks({tasks, onStatusChange, onUpdate, onDelete}) {
    return tasks.map(task =>
      <Task
        key={task.id}
        text={task.text}
        dueTime={task.dueTime}
        notes={task.notes}
        isCompleted={task.isCompleted}
        onStatusChange={onStatusChange.bind(null, task.id)}
        onUpdate={onUpdate.bind(null, task.id)}
        onDelete={onDelete.bind(null, task.id)}
      />
    )
  },

  render() {
    const {onListDeleting, onAddTask, taskListName} = this.props;

    return (
      <div className='TasksPage'>
        { this.state.isTaskListEditing ?

          <div className='TasksPage__header'>
            <h2 className='TasksPage__title'>
              <TextField
                fullWidth={true}
                defaultValue={taskListName}
                onChange={this.hadleTaskListNameChange}
                style={{fontSize: '20px', lineHeight: '20px'}}
              />
            </h2>
            <div className='TasksPage__tools'>
              <div>
                <RaisedButton primary onClick={this.handleSave} label='Save'/>
                <FlatButton onClick={this.handleCancel} label='Cancel'/>
              </div>
            </div>
          </div>

          :

          <div className='TasksPage__header'>
            <h2 className='TasksPage__title'>{taskListName}</h2>
            <div className='TasksPage__tools'>
              <IconButton onClick={onListDeleting}>
                <IconDelete/>
              </IconButton>
              <IconButton onClick={this.handleListEdit}>
                <IconModeEdit />
              </IconButton>
              <IconButton onClick={onAddTask}>
                <ContentAdd />
              </IconButton>
            </div>
          </div>
        }
        <div className='TasksPage__tasks'>
          {
            this.props.isLoadingTasks ?

              <div style={{textAlign: 'center'}}><CircularProgress/></div>

              :

              this.renderTasks(this.props)

          }
        </div>
      </div>
    );
  }
});

export default TasksPage;
