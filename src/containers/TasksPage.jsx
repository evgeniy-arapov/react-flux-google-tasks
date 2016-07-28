import React from 'react';
import moment from 'moment';

import TasksActions from '../actions/TasksActions';
import TasksStore from '../stores/TasksStore';

import TaskListsActions from '../actions/TaskListsActions';
import TaskListsStore from '../stores/TaskListsStore';

import TasksPage from '../components/TasksPage.jsx';
import TaskCreateModal from '../components/TaskCreateModal.jsx';
import TaskListDeleteModal from '../components/TaskListDeleteModal.jsx';

function getStateFromFlux() {
  return {
    tasks: TasksStore.getTasks(),
    error: TasksStore.getError(),
    isLoadingTasks: TasksStore.isLoading(),
    taskListName: TaskListsStore.getCurrentTaskListName()
  };
}

const TasksPageContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      ...getStateFromFlux(),
      isCreatingTask: false,
      isTaskListDeleting: false
    };
  },

  componentWillMount() {
    TaskListsActions.loadTaskList(this.props.params.id);
    TasksActions.loadTasks(this.props.params.id);
  },

  componentDidMount() {
    TasksStore.addChangeListener(this._onChange);
    TaskListsStore.addChangeListener(this._onChange);
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      TaskListsActions.loadTaskList(nextProps.params.id);
      TasksActions.loadTasks(nextProps.params.id);
    }
  },

  componentWillUnmount() {
    TasksStore.removeChangeListener(this._onChange);
    TaskListsStore.removeChangeListener(this._onChange);
  },

  handleStatusChange(taskId, {isCompleted}) {
    TasksActions.updateTaskStatus({
      taskListId: this.props.params.id,
      taskId: taskId,
      isCompleted: isCompleted
    });
  },

  handleTaskUpdate(taskId, {text, date, notes}) {
    const formatDate = moment(date).add(3, 'hours');
    TasksActions.updateTask({
      taskListId: this.props.params.id,
      taskId: taskId,
      text: text,
      dueTime: formatDate,
      notes: notes
    });
  },

  handleTaskDelete(taskId) {
    TasksActions.deleteTask({
      taskListId: this.props.params.id,
      taskId: taskId,
    })
  },

  handleAddTask() {
    this.setState({isCreatingTask: true});
  },

  handleClose() {
    this.setState({
      isCreatingTask: false,
      isTaskListDeleting: false
    });
  },

  handleTaskSubmit(task) {
    const taskListId = this.props.params.id;

    TasksActions.createTask({taskListId, ...task});

    this.setState({isCreatingTask: false});
  },

  handleListDeleting() {
    this.setState({
      isTaskListDeleting: true
    })
  },

  TaskListDelete() {
    TaskListsActions.deleteTaskList({taskListId: this.props.params.id});
    this.setState({
      isTaskListDeleting: false
    });
    this.context.router.replace('/');
  },

  handleCancel() {
    this.setState({
      isTaskListEditing: false
    })
  },

  handleSave(newTaskListName) {
    TaskListsActions.updateTaskList({taskListId: this.props.params.id, title: newTaskListName});
  },


  render() {
    console.log(this.state.taskListName);
    return (
      <div>
        <TasksPage
          taskListName={this.state.taskListName}
          onListDeleting={this.handleListDeleting}
          onAddTask={this.handleAddTask}
          onSave={this.handleSave}
          tasks={this.state.tasks}
          error={this.state.error}
          onStatusChange={this.handleStatusChange}
          onUpdate={this.handleTaskUpdate}
          onDelete={this.handleTaskDelete}
          isLoadingTasks={this.state.isLoadingTasks}
        />
        <TaskCreateModal
          isOpen={this.state.isCreatingTask}
          onSubmit={this.handleTaskSubmit}
          onClose={this.handleClose}
        />
        <TaskListDeleteModal
          isOpen={this.state.isTaskListDeleting}
          onSubmit={this.TaskListDelete}
          onClose={this.handleClose}
        />
      </div>
    );
  },

  _onChange() {
    this.setState({
      ...getStateFromFlux()
    });
  }

});

export default TasksPageContainer;
