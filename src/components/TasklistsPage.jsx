import React from 'react';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

import Divider from 'material-ui/lib/divider';
import ListIcon from 'material-ui/lib/svg-icons/action/view-list';
import HomeIcon from 'material-ui/lib/svg-icons/action/home';
import ExitIcon from 'material-ui/lib/svg-icons/action/exit-to-app';
import FolderIcon from 'material-ui/lib/svg-icons/file/folder';
import AddIcon from 'material-ui/lib/svg-icons/content/add';

import './TasklistsPage.less';

const TasklistsPage = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  render() {
    const {router} = this.context;

    const { taskLists, selectedListId, onAddTaskList, page, onLogOut } = this.props;

    return (
      <div className='TasklistsPage'>
        <div className='TasklistsPage__menu'>
          <List className='TasklistsPage__list'>
            <h3 className='TasklistsPage__title'>Almost Google Tasks</h3>
            <Divider />
            <List className='TasklistsPage__list'>
              <ListItem
                leftIcon={<HomeIcon />}
                primaryText="Home"
                onClick={router.push.bind(null, `/`)}
              />
              <ListItem
                leftIcon={<ListIcon />}
                primaryText="About"
                onClick={router.push.bind(null, `/about`)}
              />
            </List>
            <Divider />
            <List className='TasklistsPage__list' subheader="Task Lists">
              {
                taskLists.map(list =>
                  <ListItem
                    key={list.id}
                    leftIcon={<FolderIcon />}
                    primaryText={list.name}
                    onClick={router.push.bind(null, `/lists/${list.id}`)}
                    className={ list.id === selectedListId ? 'active' : ''}
                  />
                )
              }
              <ListItem
                leftIcon={<AddIcon />}
                primaryText="Create new list"
                onClick={onAddTaskList}
              />
            </List>
            <Divider />
            <List className='TasklistsPage__list'>
              <ListItem
                leftIcon={<ExitIcon />}
                primaryText="Log out"
                onClick={onLogOut}
              />
            </List>
          </List>
        </div>
        <div className='TasklistsPage__tasks'>
          {page}
        </div>
      </div>
    );
  }
});

export default TasklistsPage;
