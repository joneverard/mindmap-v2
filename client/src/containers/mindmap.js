import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Node from "../components/node";
import MapView from "../components/map";
import ConfirmBox from "../components/confirm_box";
import * as actions from "../actions";
import { throttle } from '../utilities';

class MindMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      displayMsg: true,
      dragging: false,
      mouse: { x: 0, y: 0 }
    };
    this.setState = this.setState.bind(this);
    this.renderNode = this.renderNode.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.triggerDrag = this.triggerDrag.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.confirm = this.confirm.bind(this);
    this.cancelDrag = this.cancelDrag.bind(this);
    this.toggleDisplay = this.toggleDisplay.bind(this);

    this.updateNodePosition = throttle((nodeId, position, delta) => {
      this.props.updatePosition(nodeId, position.rect, delta);
      this.props.updateAnchor(nodeId, position.anchorPos, delta);
      this.props.dragLines(nodeId, position.anchorPos, delta);
    }, 5);
  }

  componentDidMount() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
    this.main.addEventListener("mouseup", this.cancelDrag);

  }

  componentWillUnmount() {
    this.main.removeEventListener("mouseup", this.cancelDrag);
  }

  cancelDrag(e) {
    this.setState({ dragging: false });
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  handleMouseMove(e) {
    var { mouse, position, nodeId, dragging } = this.state;
    if (dragging) {
        var delta = { x: e.clientX - mouse.x, y: e.clientY - mouse.y };
        // var func = throttle(() => {
        //     this.props.updatePosition(nodeId, position.rect, delta);
        //     this.props.updateAnchor(nodeId, position.anchorPos, delta);
        //     this.props.dragLines(nodeId, position.anchorPos, delta);
        // }, 5);
        // func();
        this.updateNodePosition(nodeId, position, delta);
    }
    this.setState({ mouse: { x: e.clientX, y: e.clientY }, position });
  }

  triggerDrag(dragging, origin, position, nodeId) {
    // call this on mouse down, set the state on the mindmap component above, to call the update
    // position, updat eanchor and drag lines functions.
    // need to calculate the delta based on the origin and the current mouse position.
    // then need to set position based on the relative position of the node to the origin mouss position
    this.setState({ dragging, origin, position, nodeId });
  }

  toggleDisplay(nodeId) {
    // this needs to receive in some form
    var delta = { x: 0, y: 0 };
    this.props.toggleDisplay(nodeId); // updates the store. node is now display:true
    // then need to get the new position of the node and update it.
    // looking to me like we need to:
    // 1 -> move this function to the node component.
    //   -- this will give us access to the node position and size.
    // 2 -> create a new action creator and reducer cases ONLY for toggling the display.
    setTimeout(() => {
        this.props.updatePosition(nodeId, this.state.position.rect, delta)
        this.props.updateAnchor(nodeId, this.state.position.anchorPos, null);
        this.props.dragLines(nodeId, this.state.position.anchorPos, null);
    }, 1);
  }

  renderNode(node) {
    let styleProps = { ...this.props.style };
    styleProps.backgroundColor = node.color;
    return (
      <Node
        node={node}
        style={styleProps}
        id={node.id}
        key={node.id}
        handleWheel={this.handleWheel}
        handleMove={this.handleMouseMove}
        mouseUp={() => {
          this.setState({ dragging: false });
        }}
        mouse={this.state.mouse}
        triggerDrag={this.triggerDrag}
        toggleDisplay={this.toggleDisplay}
      />
    );
  }

  handleWheel(e) {
    this.props.zoomMap(this.state.mouse, e.deltaY);
  }

  handleMove(e) {
    this.setState({ mouse: { x: e.clientX, y: e.clientY } });
  }

  confirm() {
    this.props.deleteNode(this.props.confirmBox.context.id);
    this.props.triggerDialog(false, null);
  }

  render() {
    return (
      <div
        className="main"
        ref={main => {
          this.main = main;
        }}
      >
        <ConfirmBox
          display={this.props.confirmBox.display}
          windowSize={{
            height: this.state.height,
            width: this.state.width
          }}
          confirm={this.confirm}
          cancel={this.props.triggerDialog}
        />
        {this.props.nodes.map(this.renderNode)}
        <MapView
          handleWheel={this.handleWheel}
          handleMove={this.handleMouseMove}
          mouseUp={() => {
            this.setState({ dragging: false });
          }}
          handleResize={this.updateWindowDimensions}
          height={this.state.height}
          width={this.state.width}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    initial: state.initial,
    nodes: state.Nodes,
    connections: state.Connections,
    style: state.style,
    confirmBox: state.confirmBox
  };
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({zoomMap, deleteNode, triggerDialog}, dispatch);
// }

export default connect(mapStateToProps, actions)(MindMap);
