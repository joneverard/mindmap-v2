import React, { Component } from 'react';

class NodeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = '';
  }

  render() {
    var pinnedClass = !this.props.pinned ? 'open-icon' : null;
    return (
      <div className="note-header-container">
        <div className="note-header" style={{width: this.props.width || null}} ref={header => this.header = header}>
          <div className="note-header-title" style={{width: this.header && this.header.offsetWidth - 60}}>
            <p ref={title => this.title = title}>{this.props.title}</p>
          </div>
          <div className={this.props.showBtns ? "note-header-btns show" : "note-header-btns"}>
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
        </div>
      </div>
    );
  }
}

export default NodeHeader;
// this could be a simple function really...
