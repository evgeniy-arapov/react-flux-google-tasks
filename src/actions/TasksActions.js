import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

import api from '../api';

const TasksActions = {
  loadTasks(taskListId) {

    AppDispatcher.dispatch({
      type: AppConstants.TASKS_LOAD_REQUEST
    });

    api.listTasks(taskListId)
      .then(data => {
        AppDispatcher.dispatch({
          type: AppConstants.TASKS_LOAD_SUCCESS,
          items: data.items || []
        });
      })
      .catch(err => {
        AppDispatcher.dispatch({
          type: AppConstants.TASKS_LOAD_FAIL,
          error: err
        });
      });
  },

  updateTaskStatus(params) {
    api.updateTask({
      taskListId: params.taskListId,
      taskId: params.taskId,
      status: params.isCompleted ? 'completed' : 'needsAction'
    })
      .then(data => {
        AppDispatcher.dispatch({
          type: AppConstants.TASK_UPDATE_SUCCESS,
          task: data,
          taskId: params.taskId
        });
      })
      .catch(err => {
        AppDispatcher.dispatch({
          type: AppConstants.TASK_UPDATE_FAIL,
          error: err
        });
      });
  },

  updateTask(params) {
    api.updateTask({
      taskListId: params.taskListId,
      taskId: params.taskId,
      title: params.text,
      due: params.dueTime,
      notes: params.notes
    })
      .then(data => {
        AppDispatcher.dispatch({
          type: AppConstants.TASK_UPDATE_SUCCESS,
          task: data,
          taskId: params.taskId
        });
      })
      .catch(err => {
        AppDispatcher.dispatch({
          type: AppConstants.TASK_UPDATE_FAIL,
          error: err
        });
      });
  },

  deleteTask(params) {
    api.deleteTask({
      taskListId: params.taskListId,
      taskId: params.taskId,
    })
      .then(data => {
        AppDispatcher.dispatch({
          type: AppConstants.TASK_DELETE_SUCCESS,
          task: data,
          taskId: params.taskId
        });
      })
      .catch(err => {
        AppDispatcher.dispatch({
          type: AppConstants.TASK_DELETE_FAIL,
          error: err
        });
      });
  },

  createTask(params) {
    api.insertTask({
      taskListId: params.taskListId,
      title: params.text,
      notes: params.notes,
      due: params.dueTime
    })
      .then(data => {
        AppDispatcher.dispatch({
          type: AppConstants.TASK_CREATE_SUCCESS,
          task: data
        });
      })
      .catch(err => {
        AppDispatcher.dispatch({
          type: AppConstants.TASK_CREATE_FAIL,
          error: err
        });
      });
  },
};

export default TasksActions;
