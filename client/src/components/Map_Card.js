import React, { Component } from 'react';

// what do we need in this component?
// need hover behaviour - to show and hide the icons.
// 		-> need to set state on sidemenu
// onclick fire an event to change the map


class MapCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// keep track of whether you are editting a map title or not.
			// when you click away from this... anywhere on screen you need to cancel it...
			edit: false,
			title: this.props.map.title
		}
		this.onInputChange = this.onInputChange.bind(this);
		this.renderTitle = this.renderTitle.bind(this); // is this needed if not making any reference to the object?
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	onInputChange(e) {
		this.setState({title: e.target.value});
	}

	handleSubmit(e) {
		e.preventDefault();
		e.stopPropagation();
		this.props.editMap(this.props.map._id, this.state.title);
		this.props.toggleEdit(null);
		console.log(e);
	}

	renderTitle() {
		if (this.props.edit) {
			return (
				<form onSubmit={this.handleSubmit}>
					<input onChange={this.onInputChange} value={this.state.title} />
				</form>
			)
		} else {
			return (
				<p>{this.state.title}</p>
			)
		}
	}

	render() {
		const { map } = this.props;
		return (
			<div
				className="map-card"
				key={map._id}
				onClick={() => {
					this.props.openMap(map._id);
				}}
				onMouseEnter={(e) => {this.props.hoverMap(map._id)}}
				onMouseLeave={(e) => {this.props.hoverMap(0)}}
				>
				{this.renderTitle()}
				{this.props.hover ? 
					[
						<i 
						  key={1}
							onClick={(e) => {e.stopPropagation(); this.props.toggleConfirm(map._id)}}
							className="fa fa-trash right"
							aria-hidden="true">
							</i>,
						<i key={2} onClick={(e) => {e.stopPropagation(); this.props.toggleEdit(map._id)}} className="fa fa-pencil right" aria-hidden="true"></i>
					] : null}
			</div>
		)
	}
}

export default MapCard;

