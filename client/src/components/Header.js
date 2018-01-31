import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';

// component to perform meta functions.
// --> create map
// --> switch map
// --> log in / log out
// shoulw display important info like the user that is currently logged in.
// will be present on nearly all views.

class Header extends Component {
	render() {
		return (
			<nav>
				<div className="class-wrapper">
					<div className="left brand-logo">
						NoteMaps
					</div>
					<ul className="right"></ul>
				</div>
			</nav>
		)
	}
}

export default Header;


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
