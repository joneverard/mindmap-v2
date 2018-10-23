import React, { Component } from 'react';

// should this be called sidemenucontrols?
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
			<form onSubmit={this.props.handleSubmit} className="create-new-form row">
				<div className="eight columns full-width">
				<input
					type="text"
					value={this.props.title}
					onChange={e => {
						// this.setState({ title: e.target.value });
						this.props.onInputChange(e.target.value);
					}}
					placeholder="Enter a map title."
					className="full-width"
				/>
				</div>
				<div className="four columns">
					<input type="submit" value="Create" />
				</div>
			</form>
		);
	}

	render() {
		return (
			<div className="side-menu-header container">
				<div className="row">
					<h4>Your Maps</h4>
				</div>
				{this.renderCreateNew()}
			</div>
		);
	}
}

export default AppControls;

//{this.state.createNew ? this.renderCreateNew() : null}
// <button
// onClick={() => this.setState({ createNew: !this.state.createNew })}>
// {this.state.createNew ? "Cancel" : "New"}
// </button>

					// <button
					// 	onClick={e => {
					// 		this.props.cancel();
					// 	}}>
					// 	Cancel
					// </button>