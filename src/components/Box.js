import React, { Component, useState } from 'react';

class Box extends Component {  

    constructor(props) {
        super(props);
        this.state = {
          isHidden: false,
        };
    }
    handleClick() {
        this.setState({
            isHidden: true,
        });
    }

  render() {
    const {content} = this.props;
    
    if (this.state.isHidden) {
        return null
    }
    return (
      <div class="appointmentBox">
        {content}
        <button class="button" onClick={this.handleClick.bind(this)}>
            Delete Appointment
        </button>
      </div>
    );
  }
}

export default Box;