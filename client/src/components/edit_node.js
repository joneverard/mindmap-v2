import React, { Component } from 'react';

class EditNode extends Component {
    constructor(props) {
        super(props);
        this.state = {title: this.props.title};
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(e) {
        this.setState({title: e.target.value});
        this.props.onTitleEdit(e.target.value);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.saveNode();
    }

    render() {
        return (
            <form onSubmit={(e) => {this.handleSubmit(e)}}>
                <input type="text" value={this.state.title} onChange={(e) => this.onInputChange(e)}/>
            </form>
        )
    }
}

export default EditNode;
