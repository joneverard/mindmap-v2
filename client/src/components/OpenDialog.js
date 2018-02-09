import React, { Component } from 'react';

// this component should be set up to be flexible. end game is to pass in an action to be used for the confirm
// cancel options.

class OpenDialog extends Component {
  constructor(props) {
    super(props);
    this.state = { boxSize: { width: 0, height: 0 }, hover: 0};
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

  renderMaps() {
    return this.props.mapList.map(map => {
      return (
        <div
          className="map-card"
          key={map._id}
          onClick={() => {
            this.props.confirm(map._id);
          }}
          onMouseEnter={(e) => {this.setState({hover: map._id})}}
          onMouseLeave={(e) => {this.setState({hover: 0})}}>
          <p>{map.title}</p>
          {this.state.hover === map._id ? 
            <i
              onClick={(e) => {e.stopPropagation(); this.props.toggleConfirm(map._id)}} 
              className="fa fa-trash right" 
              aria-hidden="true"></i> : null }
        </div>
      );
    });
  }

  render() {
    var position = {
      left: this.state.width / 2 - 150,
      top: this.state.height / 2 - 150
    };

    if (this.props.display) {
      return (
        <div
          className="open-dialog"
          style={position}
          ref={box => (this.box = box)}>
          <p>Select a map to open</p>
          <div className="maps-container">{this.renderMaps()}</div>
          <div className="open-dialog-btn">
            <button
              onClick={e => {
                this.props.cancel();
              }}>
              Cancel
            </button>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default OpenDialog;
