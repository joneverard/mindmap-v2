import React, { Component } from "react";

class NodeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = "";
  }

  render() {
    return (
      <div className="node-header">
        <p className="node-title">{this.props.title}</p>
        <i
          className={
            this.props.display
              ? "fa fa-chevron-up open-icon"
              : "fa fa-chevron-down open-icon"
          }
          aria-hidden="true"
          onClick={e => this.props.handleClick(e)}
        />
        <i className="fa fa-lock open-icon" aria-hidden="true" onClick={e => this.props.pinNode(e)}></i>
      </div>
    );
  }
}

export default NodeHeader;
// this could be a simple function really...
