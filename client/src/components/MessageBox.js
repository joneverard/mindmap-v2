import React, { Component } from 'react';

// this component should be set up to be flexible. end game is to pass in an action to be used for the confirm
// cancel options.

class MessageBox extends Component {
  constructor(props) {
    super(props);
    this.state = { boxSize: { width: 0, height: 0 }, hover: 0, height: 0, width: 0};
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    if (this.box) {
      this.setState({ boxSize: this.box.getBoundingClientRect() });
    }
    window.addEventListener('resize', this.updateWindowDimensions);
    this.updateWindowDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    var position = {
      left: this.state.width / 2 - 110,
      top: this.state.height / 2 - 55
    };

    if (this.props.display) {
      return (
        <div
          className="message-box"
          style={position}
          ref={box => (this.box = box)}>
          <p>{this.props.msg}</p>
          <div className="open-dialog-btn">
            <button
              onClick={e => {
                this.props.cancel();
              }}>
              Ok
            </button>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default MessageBox;
