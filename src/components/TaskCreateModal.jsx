import React from 'react';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import moment from 'moment';

const TaskCreateModal = React.createClass({
  getInitialState() {
    return {
      text: '',
      notes: '',
      dueTime: null  //DatePicker not suppert null value
    };
  },

  handleClose() {
    const {onClose} = this.props;

    this.setState({text: '', notes: ''});

    if (onClose) {
      onClose();
    }
  },

  handleSubmit() {
    const {onSubmit} = this.props;
    const fixedDate = moment(this.state.dueTime).add(3, 'hours');
    if (onSubmit) {
      onSubmit({
        text: this.state.text,
        notes: this.state.notes,
        dueTime: fixedDate
      });
    }

    this.setState({text: '', notes: ''});
  },

  handleTextChange(e) {
    this.setState({
      text: e.target.value
    });
  },

  handleNotesChange(e) {
    this.setState({
      notes: e.target.value
    });
  },

  handleDateChange(e, value) {
    console.log(value);
    this.setState({
      dueTime: value
    })
  },

  render() {
    const {text, notes} = this.state;
    const {isOpen} = this.props;

    return (
      <Dialog
        className='TaskCreateModal'
        contentStyle={{maxWidth: 400}}
        actions={[
          <FlatButton
            label='Cancel'
            onTouchTap={this.handleClose}
          />,
          <FlatButton
            primary
            label='Submit'
            disabled={!text}
            onTouchTap={this.handleSubmit}
          />
        ]}
        open={isOpen}
        onRequestClose={this.handleClose}
      >
        <h3 className='TaskCreateModal__modal-title'>Add task</h3>
        <TextField
          fullWidth
          ref={c => this.taskInput = c}
          value={text}
          onChange={this.handleTextChange}
          hintText='e.g. buy a bottle of milk'
          floatingLabelText='Enter task description'
        />
        <TextField
          ref={c => this.taskInput1 = c}
          hintText='Description'
          multiLine={true}
          rows={2}
          rowsMax={4}
          value={notes}
          onChange={this.handleNotesChange}
        />
        <DatePicker
          hintText="Due Date"
          autoOk={true}
          onChange={this.handleDateChange}
        />
      </Dialog>
    );
  }
});

export default TaskCreateModal;
