import React, { Component } from 'react';

// this component should be set up to be flexible. end game is to pass in an action to be used for the confirm 
// cancel options. 

class CreateNewMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boxSize: {width: 0, height: 0},
            value: ''
        };
    }

    componentDidMount() {
        if (this.box) {
            this.setState({boxSize: this.box.getBoundingClientRect()});    
        }
    }

    render() {
        var position = {
            left: 100,
            top: 50
        }

        if(this.props.display) {
            return (
                <div
                    className="create-new-box"
                    style={position}
                    ref={(box) => this.box = box}>
                    <p>Enter a title:</p>
                    <input 
                        type="text" 
                        value={this.state.value} 
                        onChange={(e) => {this.setState({value: e.target.value})}}>
                    </input>
                    <div className="confirm-box-btns">
                        <button onClick={(e) => {this.props.cancel()}}>Cancel</button>
                        <button onClick={(e) => {this.props.confirm(this.state.value); this.setState({value: ''})}}>Submit</button>
                    </div>
                </div>
            )
        } else {
            return null;
        }

    }
}

export default CreateNewMap;