import React, { Component } from 'react';

class QuickStart extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
				<div height="500px" width="500px" style={{backgroundColor: "#000", position: "absolute", top: "500px"}} onClick={(e) => this.props.skip()}>hello how are you</div>
			)
	}
}


export default QuickStart;
