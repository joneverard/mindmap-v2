import React, { Component } from 'react';
import '../style/skeleton.css';
import '../style/normalize.css';
import '../style/style.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createNode, createConnection } from '../actions';

class Ribbon extends Component {
    constructor(props) {
        super(props);
        this.state = {title: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        var newNode = this.props.createNode(this.state.title, this.props.selected);
        this.props.createConnection(this.props.selected, newNode.payload);
        this.setState({title: ''});
    }

    onInputChange(title) {
        this.setState({title: title});
    }

    render() {
        return (
            <div className="ribbon">
                <form onSubmit={(e) => {this.handleSubmit(e)}}>
                    <button
                        type="submit"
                        className="create-btn"
                        >
                    +
                    </button>
                    <input
                        type="text"
                        className="title-box"
                        placeholder="enter a node title"
                        onChange={(e) => this.onInputChange(e.target.value)}
                        value={this.state.title}
                        >

                    </input>
                </form>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({createNode, createConnection}, dispatch);
}

function mapStateToProps(state)  {
    return { selected: state.Selected }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ribbon);
