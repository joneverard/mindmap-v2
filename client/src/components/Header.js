import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import ConfirmBox from './confirm_box';
import MessageBox from './MessageBox';
import FeedbackBox from './FeedbackBox';

import logo from './NOTEMAPS1-02 original.png';
// import 'materialize-css/dist/css/materialize.min.css';

// component to perform meta functions.
// --> log in / log out
// shoulw display important info like the user that is currently logged in.
// will be present on nearly all views.

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = { createNew: false, openMap: false, feedback: false };
		// this.submitNew = this.submitNew.bind(this);
		// this.openMap = this.openMap.bind(this);
		this.toggleConfirm = this.toggleConfirm.bind(this);
		this.confirmDelete = this.confirmDelete.bind(this);
	}

	updateWindowDimensions() {
		// should really extract this up to the app level.
		this.setState({ width: window.innerWidth, height: window.innerHeight });
	}

	// saveMap needs to take in the nodes, connections and current mapId.
	// this means we need to track / keep in state which map is 'active'.
	// maybe get the switching between maps working first.

	renderUserControls() {
		// <a href="/auth/google"></a>
		switch (this.props.user) {
			case false:
				return <li className="header-controls-item" />;
			default:
				return (
					<li className="header-controls-item">
						<a href="/api/logout">Log out</a>
					</li>
				);
		}
	}

	toggleConfirm(mapId) {
		this.setState({ selectedMap: mapId, showConfirm: true });
	}

	confirmDelete() {
		// call action creator
		this.props.deleteMap(this.state.selectedMap);
		this.setState({ selectedMap: 0, showConfirm: false });
	}

	render() {
		var { height, width } = this.state;
		return (
			<nav className="top-bar header">
					<div className="top-bar-toggle-menu">
						<i
							className="fa fa-bars"
							aria-hidden="true"
							onClick={this.props.toggleMenu}
						/>
					</div>
					<div className="logo">
						<img className="logo-img" src={logo} alt="Logo" />
					</div>
					<ul className="user-controls header-controls">
						{this.props.desktop ? this.renderUserControls() : null}
					</ul>
				
				<ConfirmBox
					display={this.state.showConfirm}
					windowSize={{ height, width }}
					confirm={this.confirmDelete}
					cancel={() => {
						this.setState({ showConfirm: false, selectedMap: 0 });
					}}
				/>
				{this.state.feedback ? <FeedbackBox /> : null}
				{this.props.header.msg ? (
					<MessageBox
						display={true}
						windowSize={{ height, width }}
						cancel={() => {
							this.props.closeMsg();
						}}
						msg={this.props.header.msg}
					/>
				) : null}
			</nav>
		);
	}
}

function mapStateToProps({ Nodes, Connections, header, user }) {
	return { Nodes, Connections, header, user };
}

export default connect(mapStateToProps, actions)(Header);
