import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../actions';

import AppControls from '../components/AppControls';


class SideMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {show: true};
	}

	componentDidMount() {
		// do some stuff here probably...
	}

	renderMaps() {
		const maps = this.props.header.maps.map((m) => {
			return (<div className="map"></div>);
		})
	}

	render() {
		console.log('maps', this.props.header);
		return (
			<div className={this.props.header.sideMenu ? "side-menu side-menu-active" : "side-menu"}>
				<AppControls />
			</div>
		)
	}
}

function mapStateToProps({ user, header }) {
	return { user, header };
}

export default connect(mapStateToProps, actions)(SideMenu);
