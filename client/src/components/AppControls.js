import React, { Component } from 'react';

class AppControls extends Component {
	constructor(props) {
		super(props);
		this.state = { createNew: false };
	}

	renderCreateNew() {
		return (
			<form onSubmit={this.handleSubmit}>
				<p>Enter a title:</p>
				<input
					type="text"
					value={this.state.value}
					onChange={e => {
						this.setState({ value: e.target.value });
					}}
				/>
				<div className="create-new-box-btns">
					<input type="submit" value="submit" />
					<button
						onClick={e => {
							this.props.cancel();
						}}>
						Cancel
					</button>
				</div>
			</form>
		);
	}

	render() {
		return (
			<div className="app-controls">
				<h4>Your Maps</h4>
				<button
					onClick={() => this.setState({ createNew: !this.state.createNew })}>
					New
				</button>
				{this.state.createNew ? this.renderCreateNew() : null}
				<div>hello</div>
			</div>
		);
	}
}

export default AppControls;
