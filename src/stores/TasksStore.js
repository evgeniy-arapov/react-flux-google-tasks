import {EventEmitter} from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _tasks = [];
let _isLoading = true;
let _error = null;

function formatTask(data) {
  return {
    id: data.id,
    text: data.title,
    notes: data.notes,
    dueTime: data.due ? new Date(data.due) : '',
    isCompleted: data.status === 'completed',
    position: data.position
  };
}

function getErrorMessage(error) {
  const errorMessage = {
    400: "Cannot load tasks list with that ID"
  };

  return errorMessage[error.code] || error.message || "Something error happened"
}

const TasksStore = Object.assign({}, EventEmitter.prototype, {
  getTasks() {
    return _tasks;
  },

  getError() {
    return _error;
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  isLoading() {
    return _isLoading;
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function (action) {
  switch (action.type) {

    case AppConstants.TASKS_LOAD_REQUEST: {
      _tasks = [];
      _error = null;
      _isLoading = true;

      TasksStore.emitChange();
      break;
    }

    case AppConstants.TASKS_LOAD_SUCCESS: {
      _tasks = action.items.map(formatTask);
      _isLoading = false;
      TasksStore.emitChange();
      break;
    }

    case AppConstants.TASKS_LOAD_FAIL: {
      _tasks = [];
      _error = getErrorMessage(action.error);
      _isLoading = false;

      TasksStore.emitChange();
      break;
    }

    case AppConstants.TASK_UPDATE_SUCCESS: {
      const updatedTaskIndex = _tasks.findIndex(task => task.id === action.taskId);
      _tasks[updatedTaskIndex] = formatTask(action.task);

      TasksStore.emitChange();
      break;
    }

    case AppConstants.TASK_UPDATE_FAIL: {
      _error = getErrorMessage(action.error);

      TasksStore.emitChange();
      break;
    }

    case AppConstants.TASK_DELETE_SUCCESS: {
      const deletedTaskIndex = _tasks.findIndex(task => task.id == action.taskId);
      _tasks.splice(deletedTaskIndex, 1);

      TasksStore.emitChange();
      break;
    }

    case AppConstants.TASK_DELETE_FAIL: {
      _error = getErrorMessage(action.error);

      TasksStore.emitChange();
      break;
    }

    case AppConstants.TASK_CREATE_SUCCESS: {
      const newTask = formatTask(action.task);
      _tasks.unshift(newTask);

      TasksStore.emitChange();
      break;
    }

    case AppConstants.TASK_CREATE_FAIL: {
      _error = getErrorMessage(action.error);

      TasksStore.emitChange();
      break;
    }

    default: {
    }
  }
});

export default TasksStore;
