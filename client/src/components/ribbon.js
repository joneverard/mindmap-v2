import React, { Component } from 'react';
import '../style/skeleton.css';
import '../style/normalize.css';
import '../style/style.css';
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
    const position = {
      x: this.props.window.width / 2.0,
      y: this.props.window.height / 2.0
    };
    const newNode = this.props.createNode(
      this.state.title,
      this.props.selected,
      position
    );
    this.props.createConnection(this.props.selected, newNode.payload);
    this.setState({ title: '' });
  }

  handleConnect(e) {
    console.log('toggled connect');
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
          this.props.header.sideMenu ? 'ribbon ribbon-menu-active' : 'ribbon'
        }>
        <form
          onSubmit={e => {
            this.handleSubmit(e);
          }}>
          <button type="submit" className="create-btn">
            +
          </button>
          <input
            type="text"
            className="title-box"
            placeholder="enter a note title"
            onChange={e => this.onInputChange(e.target.value)}
            value={this.state.title}
          />
        </form>
        <div className="temp-box">
          <button className="connect-btn" onClick={this.handleConnect}>
            <i className="fa fa-link" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ createNode, createConnection }, dispatch);
// }

function mapStateToProps({ Selected, header }) {
  return { selected: Selected, header };
}

export default connect(mapStateToProps, actions)(Ribbon);
