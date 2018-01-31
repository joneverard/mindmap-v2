import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Node from '../components/node';
import MapView from '../components/map';
import ConfirmBox from '../components/confirm_box';
import { zoomMap, deleteNode, triggerDialog } from '../actions';

class MindMap extends Component {
    constructor(props) {
        super(props);
        this.state = {width: 0, height: 0, displayMsg: true};
        this.setState = this.setState.bind(this);
        this.renderNode = this.renderNode.bind(this);
        this.handleMove = this.handleMove.bind(this);
        this.handleWheel = this.handleWheel.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.confirm = this.confirm.bind(this);
    }

    componentDidMount() {
        this.setState({ width: window.innerWidth, height: window.innerHeight })
    }

    updateWindowDimensions() {  
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    renderNode(node) {
        let styleProps = {...this.props.style};
        styleProps.backgroundColor = node.color;
        return (
            <Node
                node={node}
                style={styleProps}
                id={node.id}
                key={node.id}
                handleWheel={this.handleWheel}
                handleMove={this.handleMove}
                />
        )
    }

    handleWheel(e)  {
        this.props.zoomMap(this.state.mouse, e.deltaY);
    }

    handleMove(e) {
        this.setState({mouse:{x: e.clientX, y:e.clientY}})
    }

    confirm() {
        this.props.deleteNode(this.props.confirmBox.context.id);
        this.props.triggerDialog(false, null);
    }

    render() {
        return (
            <div className="main">
                <ConfirmBox 
                    display={this.props.confirmBox.display} 
                    windowSize={{height: this.state.height, width: this.state.width}}
                    confirm={this.confirm}
                    cancel={this.props.triggerDialog}
                    />
                {this.props.nodes.map(this.renderNode)}
                <MapView
                    handleWheel={this.handleWheel}
                    handleMove={this.handleMove}
                    handleResize={this.updateWindowDimensions}
                    height={this.state.height}
                    width={this.state.width} />
            </div>
        )
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({zoomMap, deleteNode, triggerDialog}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MindMap);