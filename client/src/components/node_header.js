import React, { Component } from 'react';

class NodeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = '';
  }

  render() {
    var pinnedClass = !this.props.pinned ? 'open-icon' : null;
    return (
      <div className="node-header">
        <p className="node-title">{this.props.title}</p>
        <div className="icon-btn" onClick={e => this.props.handleClick(e)}>
          <i
            className={
              this.props.display
                ? 'fa fa-chevron-up note-open-btn'
                : 'fa fa-chevron-down note-open-btn'
            }
            aria-hidden="true"
          />
        </div>
        <div
          onClick={e => this.props.pinNode(e)}
          className={
            this.props.pinned ? 'icon-btn icon-btn-active' : 'icon-btn'
          }>
          <i className={"fa fa-lock "+pinnedClass} aria-hidden="true" />
        </div>
      </div>
    );
  }
}

export default NodeHeader;
// this could be a simple function really...
