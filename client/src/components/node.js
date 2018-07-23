import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';
// import ReactResizeDetector from 'react-resize-detector';

import NodeControls from './node_controls';
import EditNode from './edit_node';
import NodeEditor from './node_editor';
import NodeHeader from './node_header';
import '../style/css/font-awesome.css';
import * as actions from '../actions';

class Node extends Component {
  constructor(props) {
    super(props);
    this.setState = this.setState.bind(this);
    this.deleteNode = this.deleteNode.bind(this);
    this.editNode = this.editNode.bind(this);
    this.getPosition = this.getPosition.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onTitleEdit = this.onTitleEdit.bind(this);
    this.saveNode = this.saveNode.bind(this);
    this.toggleDisplay = this.toggleDisplay.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);
    this.getClassName = this.getClassName.bind(this);
    // this.handleMouseMove = this.handleMouseMove.bind(this);
    this.toggleDrag.bind(this);

    this.state = { editorState: EditorState.createEmpty() };
  }

  getPosition() {
    var rect = this.node.getBoundingClientRect();
    var anchorPos = {
      x: rect.x + rect.width / 2,
      y: rect.y + rect.height / 2
    };
    return { rect, anchorPos };
  }

  componentDidMount() {
    var position = this.getPosition();
    var {id, node} = this.props;
    this.setState({
      rect: position.rect,
      editorState: EditorState.createWithContent(node.content),
      title: node.title
    });
    // this.props.dragLines(id, position.anchorPos); // , { x: 0, y: 0 } dont need to drag lines any more!
    this.props.updateAnchor(id, position.anchorPos); // , { x: 0, y: 0 }
    this.props.updateLines(id, position.anchorPos);
  }

  toggleDrag(dragging) {
    // call this on mouse down, set the state on the mindmap component above, to call the update
    // position, updat eanchor and drag lines functions.
    // need to calculate the delta based on the origin and the current mouse position.
    // then need to set position based on the relative position of the node to the origin mouss position
    
    this.props.triggerDrag(
      dragging,
      this.props.mouse,
      this.getPosition(),
      this.props.nodeId
    );
  }

  toggleDisplay() {
    var { id } = this.props;
    this.props.toggleDisplay(id, this.getPosition().anchorPos);
    setTimeout(() => {
      this.props.updateAnchor(id, this.getPosition().anchorPos);
      this.props.updateLines(id, this.getPosition().anchorPos);

    }, 1);
  }

  onTitleEdit(title) {
    this.setState({ title: title });
  }

  editNode() {
    if (!this.props.node.display) {
      this.props.toggleDisplay(this.props.node.id);
    }
    this.props.editNode(this.props.id);
  }

  saveNode() {
    this.props.saveNode(
      this.props.id,
      this.state.title,
      this.state.editorState.getCurrentContent()
    );
    this.props.editNode(null);
    this.props.selectNode(null);
  }

  deleteNode() {
    this.props.triggerDialog(true, this.props.node);
  }

  handleCancel(e) {
    this.props.editNode(null);
    this.props.selectNode(null);
  }

  handleClick(e) {
    if (this.props.connect.active) {
      // handle case if user clicked 'connect' button.
      // we land here if there is a node in the 'start' location.

      // need to handle case where node is already selected when the connect button is clicked.
      this.props.createConnection(this.props.connect.node, this.props.node);
      this.props.toggleConnection(false);
      this.props.connectNode(null, null);
    } 
    else if (this.props.header.connection) {
      this.props.connectNode(this.props.node, true);
    } else {
      this.props.connectNode(null, null);
    }
  }

  onEditorChange(editorState) {
    this.setState({ editorState });
  }

  getClassName(selectedId) {
    // if node is selected, but not being connected, return selected node
    // if node is selected and being connected return selected-connect node
    // if node is not selected, but being connected, return node node-connect
    // if node is not selected, and not being connected, returun node.
    // ... simple right?
    // probably a better implementation than this. but this will do for now.
    // should really revisit this. TODO
    if (selectedId === this.props.id && this.props.header.connection) {
      return 'selected-connect node';
    } else if (selectedId === this.props.id) {
      return 'selected node';
    } else if (this.props.header.connection) {
      return 'node-connect node';
    } else {
      return 'node';
    }
  }


  render() {
    var selectedId;
    if (this.props.selected) {
      selectedId = this.props.selected.id;
    } else {
      selectedId = 0;
    }
    var handleClass = !this.props.node.edit
      ? 'node-container handle'
      : 'node-container';
    var selectedClass = this.getClassName(selectedId);

    return (
      <Draggable
        position={this.props.node.position}
        disabled={true}
        handle=".handle"
        axis={this.props.node.edit ? 'none' : 'both'}
        onMouseDown={e => {
          this.props.selectNode(this.props.node);
          if (!this.props.node.edit) {
            this.toggleDrag(true);
            this.props.triggerDrag(
              true,
              this.props.mouse,
              this.getPosition(),
              this.props.id
            );
          }
        }}
        onMouseUp={e => {
          this.toggleDrag(false);
          this.props.mouseUp();
        }}>
        <div
          className={handleClass}
          style={
            selectedId === this.props.id
              ? { zIndex: 250 }
              : {
                  zIndex: this.props.node.style
                    ? this.props.node.style.zIndex // nested ternaries? come on jon
                    : 0
                }
          }
          onWheel={this.props.handleWheel}
          onMouseMove={this.props.handleMove}>
          <div
            ref={node => {
              this.node = node;
            }}
            onClick={this.handleClick}
            onDoubleClick={e => {
              this.toggleDisplay(this.props.id);
            }}
            className={selectedClass}
            // style={this.props.style}
            style={this.props.node.style}>
            {this.props.node.edit ? (
              <div>
                <EditNode
                  title={this.props.node.title}
                  onTitleEdit={this.onTitleEdit}
                  saveNode={this.saveNode}
                />
              </div>
            ) : (
              <NodeHeader
                title={this.props.node.title}
                handleClick={e => {
                  this.toggleDisplay(this.props.id);
                }}
                display={this.props.node.display}
                styleProps={this.props.node.style}
              />
            )}
            {this.props.node.display ? (
              <NodeEditor
                onEditorChange={this.onEditorChange}
                editorState={this.state.editorState}
                edit={this.props.node.edit}
              />
            ) : null}
          </div>
          {selectedId === this.props.id ? (
            <NodeControls
              edit={this.props.node.edit}
              editNode={this.editNode}
              delete={this.deleteNode}
              cancel={e => this.handleCancel()}
              saveNode={this.saveNode}
              connectNode={this.props.connectNode}
              toggleConnection={this.props.toggleConnection}
              node={this.props.node}
              updateRank={this.props.updateRank}
            />
          ) : null}
        </div>
      </Draggable>
    );
  }
}

function mapStateToProps({Selected, connect, header}) {
  // should use an object as global state. with ids as keys.
  return { selected: Selected, connect, header };
}
export default connect(mapStateToProps, actions)(Node);
// export default connect(mapStateToProps, mapDispatchToProps)(Node);

// old drag handlers

// onStart={e => {
//     this.handleStart(e);
// }}
// onDrag={e => {
//     debounce(this.handleDrag(e), 5, true);
// }}
// onStop={e => {
//     this.handleStop(e);
// }}
// handleStart(e) {
//     var position = this.getPosition();
//     this.props.updatePosition(this.props.id, position.rect);
//     this.props.updateAnchor(this.props.id, position.anchorPos);
//     this.props.dragLines(this.props.id, position.anchorPos);
// }

// handleDrag(e) {
//     var position = this.getPosition();
//     this.props.updatePosition(this.props.id, position.rect);
//     this.props.updateAnchor(this.props.id, position.anchorPos);
//     this.props.dragLines(this.props.id, position.anchorPos);
// }

// handleStop(e) {
//     var position = this.getPosition();
//     this.props.updatePosition(this.props.id, position.rect);
//     this.props.updateAnchor(this.props.id, position.anchorPos);
// }
