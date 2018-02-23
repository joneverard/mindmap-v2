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

  promote() {
    // these two functions are pretty bad... should probably refactor these.
    // var { level } = { ...this.state };
    var { id, rank } = this.props.node;
    if (!rank) {
      this.props.updateRank(id, 1);
    } else if (rank < 5) {
      this.props.updateRank(id, rank + 1);
    }
  }

  demote(value) {
    // var { level } = { ...this.state };
    var { id, rank } = this.props.node;
    if (rank > 0) {
      this.props.updateRank(id, rank - 1);
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
        <p>Level: <span>{this.props.node.rank}</span></p>
        <button
          type="submit"
          onClick={() => {
            this.promote();
          }}
        >
          <i className="fa fa-arrow-up" aria-hidden="true"></i>
        </button>
        <button
          type="submit"
          onClick={() => {
            this.demote();
          }}
        >
          <i className="fa fa-arrow-down" aria-hidden="true"></i>
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
