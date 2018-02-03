import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'
// import 'materialize-css/dist/css/materialize.min.css';

// component to perform meta functions.
// --> create map
// --> switch map
// --> log in / log out
// shoulw display important info like the user that is currently logged in.
// will be present on nearly all views.

class Header extends Component {
	renderAppControls() {
		return [
			<li key={1} className="control-list-item" onClick={(e) => {console.log('new')}}>New</li>,
			<li key={2} className="control-list-item" onClick={() => {console.log('open')}}>Open</li>,
			<li 
				key={3}
				className="control-list-item" 
				onClick={() => this.props.saveMap(this.props.Nodes, this.props.Connections)}>Save</li>
		]
	}

	renderUserControls() {
		switch(this.props.user) {
			case false:
				return (
					<li className="control-list-item"><a href="/auth/google">Login with google</a></li>
				)
			default:
				return (
					<li className="control-list-item"><a href="/api/logout">Log out</a></li>
				)
		}
	}

	render() {
		return (
			<nav className="">
				<div className="">
					<div className="logo">
						<h6>NoteMaps</h6>
					</div>
					<ul className="app-controls control-list">{this.renderAppControls()}</ul>
					<ul className="user-controls control-list">{this.renderUserControls()}</ul>
				</div>
			</nav>
		)
	}
}

function mapStateToProps({Nodes, Connections}) {
	return { Nodes, Connections };
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
