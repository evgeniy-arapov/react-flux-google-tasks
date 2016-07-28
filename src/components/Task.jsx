import React from 'react';

import Checkbox from 'material-ui/lib/checkbox';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import TextField from 'material-ui/lib/text-field';

import ChatIcon from 'material-ui/lib/svg-icons/communication/chat';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

import './Task.less';

const ENTER_KEY = 13;
const ESC_KEY = 27;

const Task = React.createClass({
  getInitialState() {
    this.dueTime = this.props.dueTime;
    this.descriptionValue = this.props.notes;
    return {
      isEditing: false,
      isCompleted: this.props.isCompleted,
      text: this.props.text
    };
  },

  handleEdit(e) {
    this.setState({isEditing: true}, this.focusInput);
  },

  handleDelete() {
    this.props.onDelete();
  },

  handleCancel() {
    this.cancelTask();
  },

  handleSave() {
    this.saveTask();
  },

  datepickerChange(event, value) {
    this.dueTime = value;
  },
  handleChangeDescription(event) {
    this.descriptionValue = event.target.value;
  },

  handleCheck() {
    this.props.onStatusChange({
      isCompleted: !this.state.isCompleted
    });
    this.setState({
      isCompleted: !this.state.isCompleted
    })
  },

  handleKeyDown(e) {
    if (e.keyCode === ENTER_KEY) {
      this.saveTask();
    }

    if (e.keyCode === ESC_KEY) {
      this.cancelTask();
    }
  },

  focusInput() {
    this.input.focus();
  },

  saveTask() {
    this.setState({
      text: this.input.value,
      isEditing: false
    });
    this.props.onUpdate({
      text: this.input.value,
      date: this.dueTime,
      notes: this.descriptionValue
    });
  },

  cancelTask() {
    this.setState({isEditing: false});
  },

  render() {
    const { notes, dueTime } = this.props;
    const { text, isCompleted, isEditing } = this.state;

    return (
      isEditing
        ?
        <div className='Task editing'>
          <input
            className='Task__input'
            type='text'
            defaultValue={text}
            onKeyDown={this.handleKeyDown}
            ref={c => this.input = c}
          />
          <TextField
            hintText='Description'
            multiLine={true}
            rows={2}
            rowsMax={4}
            defaultValue={this.descriptionValue}
            onChange={this.handleChangeDescription}
          />
           <DatePicker
              hintText="Due Date"
              autoOk={true}
              onChange={this.datepickerChange}
              defaultDate={dueTime instanceof Date ? dueTime : undefined}
            />
          <div className='Task__toolbar'>
            <div>
              <RaisedButton primary onClick={this.handleSave} label='Save'/>
              <FlatButton onClick={this.handleCancel} label='Cancel'/>
            </div>
          </div>
        </div>
        :
        <div className='Task'>
          <Checkbox
            className='Task__checkbox'
            checked={isCompleted}
            onCheck={this.handleCheck}
          />

          <div className='Task__text' onClick={this.handleEdit}>
            <div className='Task__title'>{text}{dueTime || notes ? <ChatIcon viewBox="-10 -10 35 35"/> : ''}</div>
          </div>

          <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
            <MenuItem onClick={this.handleEdit}>Edit</MenuItem>
            <MenuItem onClick={this.handleDelete}>Delete</MenuItem>
          </IconMenu>
        </div>
    );
  }
});

export default Task;
