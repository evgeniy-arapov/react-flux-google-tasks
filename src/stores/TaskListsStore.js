import {EventEmitter} from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _taskLists = [];
let _currentTaskListName = null;
let _error = null;

function formatTaskList(data) {
  return {
    id: data.id,
    name: data.title
  };
}

const TaskListsStore = Object.assign({}, EventEmitter.prototype, {
  getTaskLists() {
    return _taskLists;
  },

  getError() {
    return _error;
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  getCurrentTaskListName() {
    return _currentTaskListName;
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
    case AppConstants.TASK_LISTS_LOAD_SUCCESS: {
      _taskLists = action.items.map(formatTaskList);

      TaskListsStore.emitChange();
      break;
    }

    case AppConstants.TASK_LISTS_LOAD_FAIL: {
      _taskLists = [];
      _error = action.error;

      TaskListsStore.emitChange();
      break;
    }

    case AppConstants.TASK_LIST_LOAD_SUCCESS: {
      _currentTaskListName = formatTaskList(action.taskList).name;

      TaskListsStore.emitChange();
      break;
    }

    case AppConstants.TASK_LIST_CREATE_SUCCESS: {
      const newTaskList = formatTaskList(action.taskList);
      _taskLists.push(newTaskList);

      TaskListsStore.emitChange();
      break;
    }

    case AppConstants.TASK_LIST_CREATE_FAIL: {
      _error = action.error;

      TaskListsStore.emitChange();
      break;
    }

    case AppConstants.TASK_LIST_UPDATE_REQUEST: {
      const updatedTaskList = formatTaskList(action.taskList);
      const updatedTaskListIndex = _taskLists.findIndex(el => el.id === updatedTaskList.id);
      _taskLists.splice(updatedTaskListIndex, 1, updatedTaskList);
      _currentTaskListName = updatedTaskList.name;

      TaskListsStore.emitChange();
      break;
    }

    case AppConstants.TASK_LIST_UPDATE_SUCCESS: {
      const updatedTaskList = formatTaskList(action.taskList);
      const updatedTaskListIndex = _taskLists.findIndex(el => el.id === updatedTaskList.id);
      _taskLists.splice(updatedTaskListIndex, 1, updatedTaskList);

      TaskListsStore.emitChange();
      break;
    }

    case AppConstants.TASK_LIST_UPDATE_FAIL: {
      _error = action.error;

      TaskListsStore.emitChange();
      break;
    }

    case AppConstants.TASK_LIST_DELETE_SUCCESS: {
      const deletedTaskListIndex = _taskLists.findIndex(el => el.id === action.taskListId);
      _taskLists.splice(deletedTaskListIndex, 1);

      TaskListsStore.emitChange();
      break;
    }

    case AppConstants.TASK_LIST_DELETE_FAIL: {
      _error = action.error;

      TaskListsStore.emitChange();
      break;
    }

    default: {
    }
  }
});

export default TaskListsStore;
