import React from 'react';
import './ShowError.less';

const ShowError = React.createClass({

  getInitialState() {
    return {
      isShow: true
    }
  },

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    // if(this.props.error !== nextProps.error)
    this.setState({
      isShow: true
    })
  },

  componentDidMount(){
    this.animationDeleteElement(this.refs.errorBox);

  },

  componentDidUpdate() {
    this.animationDeleteElement(this.refs.errorBox);
  },

  animationDeleteElement(elem) {
    if(elem) {
      setTimeout(() => {
        elem.classList.add('animate')
      }, 3000);
      setTimeout(() => {
        this.setState({
          isShow: false
        });
      }, 4000);
    }
  },

  render() {
    if(this.state.isShow) {
      return (
        <div className="error" ref="errorBox">
          {this.props.error}
        </div>
      )
    }
    return false;
  }
});

export default ShowError;