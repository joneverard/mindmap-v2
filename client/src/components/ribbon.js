import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Ribbon extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConnect = this.handleConnect.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const selected_node = this.props.nodes.filter(node => node.id === this.props.selected)[0];
    const position = {
      x: this.props.window.width / 2.0,
      y: this.props.window.height / 2.0
    };
    const newNode = this.props.createNode(
      this.state.title,
      selected_node,
      position
    );
    this.props.createConnection(selected_node, newNode.payload);
    this.setState({ title: '' });
  }

  handleConnect(e) {
    // so what do we need to do here...
    // call an action creator which will set the state of the connect function to 'active'
    // then, onClick on node will, rather than trigger select, trigger the connect reducer..
    // will have to suppress select reducer in some way. (or hijack it ?)
    // so where does this state all live?

    this.props.toggleConnection(!this.props.header.connection);

    if (this.props.selected) {
      // call connect pair...
      this.props.connectNode(this.props.selected, true);
    }
  }

  onInputChange(title) {
    this.setState({ title: title });
  }

  render() {
    return (
      <div
        className={
          this.props.header.sideMenu ? 'map-controls map-controls-menu-active container' : 'map-controls container'
        }>
        <form
          onSubmit={e => {
            this.handleSubmit(e);
          }}
          className='row map-controls-create-note'>
          <button type="submit" className="map-controls-btn-create three columns">
            <span className='map-controls-create-icon'>+</span>
          </button>
          <input
            type="text"
            className="map-controls-input nine columns"
            placeholder="enter a note title"
            onChange={e => this.onInputChange(e.target.value)}
            value={this.state.title}
          />
        </form>
        <div className="row">
          <button className="map-controls-btn-connect three columns" onClick={this.handleConnect}>
            <i className="fa fa-link" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }
}

// this should probably make use of the columns system to align things properly...

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ createNode, createConnection }, dispatch);
// }

function mapStateToProps({ Selected, header, Nodes }) {
  return { selected: Selected, header, nodes: Nodes };
}

export default connect(mapStateToProps, actions)(Ribbon);
