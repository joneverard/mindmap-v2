import React, { Component } from "react";
import "../style/css/font-awesome.css";

class NodeControls extends Component {
  constructor(props) {
    super(props);
    this.state = { displayExtra: false, level: 0 };
    this.renderEditControls = this.renderEditControls.bind(this);
    this.renderNoteControls = this.renderNoteControls.bind(this);
  }

  // split this up into two...?

  increment(value) {
    // these two functions are pretty bad... should probably refactor these.
    var { level } = { ...this.state };
    if (level === 5) {
    } else {
      this.setState({ level: level + value });
    }
  }

  decrement(value) {
    var { level } = { ...this.state };
    if (level === 0) {
    } else {
      this.setState({ level: level + value });
    }
  }

  renderEditControls() {
    return [
      <button
        type="submit"
        className="save-btn"
        onClick={this.props.saveNode}
        key={1}
      >
        Save
      </button>,
      <button type="submit" onClick={this.props.cancel} key={2}>
        Cancel
      </button>
    ];
  }

  renderNoteControls() {
    return [
      <button type="submit" onClick={this.props.editNode} key={1}>
        Edit
      </button>,
      <button
        type="submit"
        onClick={() => {
          this.props.connectNode(this.props.node, true);
        }}
        key={2}
      >
        Connect
      </button>,
      <button type="submit" onClick={this.props.delete} key={3}>
        Delete
      </button>,
      <button
        type="submit"
        onClick={() => {
          this.setState({ displayExtra: !this.state.displayExtra });
        }}
        key={4}
      >
        <i className="fa fa-ellipsis-v" aria-hidden="true" />
      </button>
    ];
  }

  renderExtraControls() {
    return (
      <div className="level-controls">
        <p>Level: {this.state.level}</p>
        <button
          type="submit"
          onClick={() => {
            this.increment(1);
          }}
        >
          up
        </button>
        <button
          type="submit"
          onClick={() => {
            this.decrement(-1);
          }}
        >
          down
        </button>
      </div>
    );
  }

  render() {
    var classList = "node-controls fade-in";
    return (
      <div className={classList}>
        {this.props.edit
          ? this.renderEditControls()
          : this.renderNoteControls()}
        {this.state.displayExtra ? this.renderExtraControls() : null}
      </div>
    );
  }
}

export default NodeControls;
