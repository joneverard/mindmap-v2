import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
// import './style/App.css';
import {BrowserView, MobileView, isBrowser, isMobile} from 'react-device-detect';
import Ribbon from './ribbon';
import MindMap from '../containers/mindmap';
import Header from './Header';
import SideMenu from '../containers/SideMenu';
// this is where to build the app...

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	renderApp() {
		if (!this.props.header.active) {
			return (
				<div className="app-landing">Open or create a map to get started!</div>
			);
		} else {
			return [<Ribbon key={1} />, <MindMap key={2} />];
		}
	}

	renderMain() {
		switch (this.props.user) {
			case false:
				return (
					<div className="app-landing">
						Welcome to notemaps! Please log in to continue
					</div>
				);
			default:
				return this.renderApp();
		}
	}

	render() {
		// need to include a catch for mobile devices. avoid the bad UX of a horribly broken app.
		// needs LOTS of attention to be fixed.
		return (
			<div className="App">
				<BrowserView device={isBrowser}>
					<Header user={this.props.user} desktop />
					<SideMenu />
					{this.renderMain()}
				</BrowserView>
				<MobileView device={isMobile}>
					<Header user={this.props.user} mobile />
					<div className="app-landing">
						Welcome to NoteMaps! Please access this app on a desktop to continue. Our mobile version is coming soon.
					</div>
				</MobileView>
			</div>
		);
	}
}

function mapStateToProps({ user, header }) {
	return { user, header };
}

export default connect(mapStateToProps, actions)(App);
