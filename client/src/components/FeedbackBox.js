import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';


class FeedbackBox extends Component {
	constructor(props) {
		super(props);
		this.state = {page: 0};
	}

	render() {
		return (
			<div className="feedback-box">testing stuff now.</div>
		)
	}
}

export default FeedbackBox;