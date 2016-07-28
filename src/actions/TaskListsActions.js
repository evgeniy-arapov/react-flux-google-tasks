import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

import api from '../api';

const TaskListsActions = {
  loadTaskLists() {
    api.listTaskLists()
      .then(data => {
        AppDispatcher.dispatch({
          type: AppConstants.TASK_LISTS_LOAD_SUCCESS,
          items: data.items
        });
      })
      .catch(err => {
        AppDispatcher.dispatch({
          type: AppConstants.TASK_LISTS_LOAD_FAIL,
          error: err
        });
      });
  },

  loadTaskList(taskListId) {
    api.showTaskList(taskListId)
      .then(data => {
        AppDispatcher.dispatch({
          type: AppConstants.TASK_LIST_LOAD_SUCCESS,
          taskList: data
        });
      })
      .catch(err => {
        AppDispatcher.dispatch({
          type: AppConstants.TASK_LIST_LOAD_FAIL,
          error: err
        });
      });
  },

  createTaskList(params) {
    api.insertTaskList({title: params.name})
      .then(data => {
        AppDispatcher.dispatch({
          type: AppConstants.TASK_LIST_CREATE_SUCCESS,
          taskList: data
        });
      })
      .catch(err => {
        AppDispatcher.dispatch({
          type: AppConstants.TASK_LIST_CREATE_FAIL,
          error: err
        });
      });
  },

  updateTaskList(params) {
    AppDispatcher.dispatch({
      type: AppConstants.TASK_LIST_UPDATE_REQUEST,
      taskList: {
        id: params.taskListId,
        title: params.title
      }
    });

    api.updateTaskList(params.taskListId, params.title)
      .then(data => {
        AppDispatcher.dispatch({
          type: AppConstants.TASK_LIST_UPDATE_SUCCESS,
          taskList: data
        });
      })
      .catch(err => {
        AppDispatcher.dispatch({
          type: AppConstants.TASK_LIST_UPDATE_FAIL,
          error: err
        });
      });
  },

  deleteTaskList (params) {
    api.deleteTaskList(params.taskListId)
      .then(data => {
        AppDispatcher.dispatch({
          type: AppConstants.TASK_LIST_DELETE_SUCCESS,
          taskListId: params.taskListId
        });
      })
      .catch(err => {
        AppDispatcher.dispatch({
          type: AppConstants.TASK_LIST_DELETE_FAIL,
          error: err
        });
      });
  }
};

export default TaskListsActions;
