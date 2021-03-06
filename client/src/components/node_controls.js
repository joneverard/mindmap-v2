import React, { Component } from 'react';
import '../style/css/font-awesome.css';

class NodeControls extends Component {
  constructor(props) {
    super(props);
    this.state = { displayExtra: false, level: 0 };
    this.renderEditControls = this.renderEditControls.bind(this);
    this.renderNoteControls = this.renderNoteControls.bind(this);
  }

  promote() {
    // var { level } = { ...this.state };
    var { id, rank } = this.props.node;
    if (rank < 5) {
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
        className="note-controls-btn note-controls-edit-save-btn"
        onClick={this.props.saveNode}
        key={1}>
        Save
      </button>
    ];
  }

  renderNoteControls() {
    return [
      <button 
        type="submit" 
        onClick={this.props.editNode} 
        key={1}
        className="note-controls-btn note-controls-edit-save-btn">
        Edit
      </button>,
      <button
        className="note-controls-btn"
        type="submit"
        onClick={() => {
          this.props.toggleConnection(true);
          this.props.connectNode(this.props.node, true);
        }}
        key={2}>
        Connect
      </button>,
      <button className="note-controls-btn" type="submit" onClick={this.props.delete} key={3}>
        Delete
      </button>
    ];
  }

  renderExtraControls() {
    return (
      <div className="level-controls">
        <p>
          Level: <span>{this.props.node.rank}</span>
        </p>
        <button
          type="submit"
          onClick={() => {
            this.promote();
          }}>
          <i className="fa fa-arrow-up" aria-hidden="true" />
        </button>
        <button
          type="submit"
          onClick={() => {
            this.demote();
          }}>
          <i className="fa fa-arrow-down" aria-hidden="true" />
        </button>
      </div>
    );
  }

  render() {
    var classList = 'note-controls fade-in';
    // displayExtra is currently unavailable. levels have been taken out for the time being.
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
