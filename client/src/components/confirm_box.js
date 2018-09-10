import React, { Component } from 'react';


class ConfirmBox extends Component {
    constructor(props) {
        super(props);
        this.state = {boxSize: {width: 0, height: 0}};
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        if (this.box) {
            this.setState({boxSize: this.box.getBoundingClientRect()});    
        }
    }
    
    handleClick() {
        this.props.confirmDelete();
    }

    render() {
        var position = {
            left: this.props.windowSize.width/2 - 110,
            top: this.props.windowSize.height/2 - 55
        }

        if(this.props.display) {
            return (
                <div
                    className="confirm-box"
                    style={position}
                    ref={(box) => this.box = box}>
                    <p>Are you sure?</p>
                    <div className="confirm-box-btns">
                        <button onClick={(e) => {this.props.confirm()}}>yes</button>
                        <button onClick={(e) => {this.props.cancel(false, null)}}>no</button>
                    </div>
                </div>
            )
        } else {
            return null;
        }

    }
}

export default ConfirmBox;


// this component should be set up to be flexible. end game is to pass in an action to be used for the confirm 
// cancel options. 