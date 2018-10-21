import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import CreateNewMap from './CreateNewMap';
import OpenDialog from './OpenDialog';
import ConfirmBox from './confirm_box';
import MessageBox from './MessageBox';
import FeedbackBox from './FeedbackBox';

import logo from './NOTEMAPS1-02 original.png';
// import 'materialize-css/dist/css/materialize.min.css';

// component to perform meta functions.
// --> create map
// --> switch map
// --> log in / log out
// shoulw display important info like the user that is currently logged in.
// will be present on nearly all views.

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = { createNew: false, openMap: false, feedback: false };
		this.submitNew = this.submitNew.bind(this);
		this.openMap = this.openMap.bind(this);
		this.toggleConfirm = this.toggleConfirm.bind(this);
		this.confirmDelete = this.confirmDelete.bind(this);
	}

	componentDidMount() {
		// this.setState({ width: window.innerWidth, height: window.innerHeight });
		// // console.log(this.props.header);
		// this.props.fetchMaps();
		// this.props.openMap(this.props.header.active);
		// for future use. TODO
		// setTimeout(() => {
		// 	this.setState({feedback: true});
		// }, 2000);
	}

	updateWindowDimensions() {
		// should really extract this up to the app level.
		this.setState({ width: window.innerWidth, height: window.innerHeight });
	}

	renderAppControls() {
		if (this.props.user) {
			return [
				<li
					key={1}
					className="header-controls-item"
					onClick={e => {
						this.setState({ createNew: true });
					}}>
					New
				</li>,
				<li
					key={2}
					className="header-controls-item"
					onClick={e => {
						this.setState({ openMap: true });
					}}>
					Open
				</li>,
				<li
					key={3}
					className="header-controls-item"
					onClick={() =>
						this.props.saveMap(
							this.props.Nodes,
							this.props.Connections,
							this.props.header.active
						)
					}>
					Save
				</li>
			];
		}
		return null;
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

	openMap(mapId) {
		this.setState({ openMap: false });
		this.props.openMap(mapId);
	}

	submitNew(title) {
		// call action creator here and set state.
		this.props.createMap(title);
		this.setState({ createNew: false });
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
// {this.props.header.sideMenu ? 'meta-menu' : 'meta-menu'}

