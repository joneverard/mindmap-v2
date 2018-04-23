import React, { Component } from 'react';

class AppControls extends Component {
	constructor(props) {
		super(props);
		this.state = { createNew: false, title: '' };
	}

	handleFormSubmit(e) {
		this.props.handleSubmit(e);
	}

	renderCreateNew() {
		return (
			<form onSubmit={this.props.handleSubmit} className="create-new-map">
				<input
					type="text"
					value={this.props.title}
					onChange={e => {
						// this.setState({ title: e.target.value });
						this.props.onInputChange(e.target.value);
					}}
				/>
				<input type="submit" value="submit" />
			</form>
		);
	}

	render() {
		return (
			<div className="app-controls">
				<div>
					<h4>Your Maps</h4>
					<button
						onClick={() => this.setState({ createNew: !this.state.createNew })}>
						{this.state.createNew ? "Cancel" : "New"}
					</button>
				</div>
				{this.state.createNew ? this.renderCreateNew() : null}
			</div>
		);
	}
}

export default AppControls;


					// <button
					// 	onClick={e => {
					// 		this.props.cancel();
					// 	}}>
					// 	Cancel
					// </button>