import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import CreateNewMap from './CreateNewMap';
import OpenDialog from './OpenDialog';
import ConfirmBox from './confirm_box';
import MessageBox from './MessageBox';

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
		this.state = { createNew: false, openMap: false };
		this.submitNew = this.submitNew.bind(this);
		this.openMap = this.openMap.bind(this);
		this.toggleConfirm = this.toggleConfirm.bind(this);
		this.confirmDelete = this.confirmDelete.bind(this);
	}

	componentDidMount() {
		this.setState({ width: window.innerWidth, height: window.innerHeight });
		// console.log(this.props.header);
		this.props.fetchMaps();
		// this.props.openMap(this.props.header.active);
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
					className="control-list-item"
					onClick={e => {
						this.setState({ createNew: true });
					}}>
					New
				</li>,
				<li
					key={2}
					className="control-list-item"
					onClick={e => {
						this.setState({ openMap: true });
					}}>
					Open
				</li>,
				<li
					key={3}
					className="control-list-item"
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
		switch (this.props.user) {
			case false:
				return (
					<li className="control-list-item">
						<a href="/auth/google">Login with google</a>
					</li>
				);
			default:
				return (
					<li className="control-list-item">
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
			<nav className="">
				<div className="">
					<div className="logo">
						<img className="logo-img" src={logo} alt="Logo" />
					</div>
					<ul className="app-controls control-list">
						{this.renderAppControls()}
					</ul>
					<ul className="user-controls control-list">
						{this.renderUserControls()}
					</ul>
				</div>
				<CreateNewMap
					display={this.state.createNew}
					confirm={this.submitNew}
					cancel={() => {
						this.setState({ createNew: false });
					}}
				/>
				<OpenDialog
					display={this.state.openMap}
					confirm={this.openMap}
					mapList={this.props.header.maps}
					toggleConfirm={this.toggleConfirm}
					cancel={() => {
						this.setState({ openMap: false });
					}}
				/>
				<ConfirmBox
					display={this.state.showConfirm}
					windowSize={{ height, width }}
					confirm={this.confirmDelete}
					cancel={() => {
						this.setState({ showConfirm: false, selectedMap: 0 });
					}}
				/>
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

// class Header extends Component {
// 	renderContent() {
// 		// the whole user object is available through this.props.auth, since the reducer returns the whole user model
// 		switch (this.props.auth) {
// 			case null:
// 				return;
// 			case false:
// 				return (
// 					<li>
// 						<a href="/auth/google">Login with Google</a>
// 					</li>
// 				);
// 			default:
// 				return [
// 					<li key={1}>
// 						<Payments />
// 					</li>,
// 					<li key={2} style={{ margin: '0 10px' }}>
// 						Credits: {this.props.auth.credits}
// 					</li>,
// 					<li key={3}>
// 						<a href="/api/logout">Logout</a>
// 					</li>
// 				];
// 		}
// 	}

// 	render() {
// 		return (
// 			<nav>
// 				<div className="class-wrapper">
// 					<Link
// 						to={this.props.auth ? '/surveys' : '/'}
// 						className="left brand-logo"
// 					>
// 						Emaily
// 					</Link>
// 					<ul className="right">{this.renderContent()}</ul>
// 				</div>
// 			</nav>
// 		);
// 	}
// }

// function mapStateToProps({ auth }) {
// 	return { auth };
// }

// export default connect(mapStateToProps)(Header);
