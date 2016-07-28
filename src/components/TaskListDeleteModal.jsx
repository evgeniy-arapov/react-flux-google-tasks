import React from 'react';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

const TaskListDeleteModal = React.createClass({


  render() {
    const { isOpen } = this.props;

    return (
      <Dialog
        className='TaskListCreateModal'
        contentStyle={{ maxWidth: 400 }}
        actions={[
          <FlatButton
            label='Cancel'
            onTouchTap={this.props.onClose}
          />,
          <FlatButton
            primary
            label='Submit'
            onTouchTap={this.props.onSubmit}
          />
        ]}
        open={isOpen}
        onRequestClose={this.props.onClose}
      >
        <h3 className='TaskListCreateModal__modal-title'>Are you sure you want to delete this list?</h3>
      </Dialog>
    );
  }
});

export default TaskListDeleteModal;