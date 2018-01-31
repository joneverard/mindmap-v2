import React, { Component } from 'react';


class NodeControls extends Component {
    constructor(props) {
        super(props);
        this.state = '';
    }

    render() {
        var classList = "node-controls fade-in"
        if (this.props.edit) {
            return (
                <div className={classList}>
                    <button type="submit" className="save-btn" onClick={this.props.saveNode}>Save</button>
                    <button type="submit" onClick={this.props.cancel}>Cancel</button>
                </div>
            )
        } else {
            return (
                <div className={classList}>
                    <button type="submit" onClick={this.props.editNode}>Edit</button>
                    <button type="submit" onClick={() => {this.props.connectNode(this.props.node, true)}}>Connect</button>
                    <button type="submit" onClick={this.props.delete}>Delete</button>
                </div>
            )
        }
    }
}

export default NodeControls;