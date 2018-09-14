import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
// import './style/App.css';
import {BrowserView, MobileView, isBrowser, isMobile} from 'react-device-detect';
import Ribbon from './ribbon';
import MindMap from '../containers/mindmap';
import Header from './Header';
import SideMenu from '../containers/SideMenu';
import Benefits from './Benefits';

import QuickStart from './QuickStart'
import { throttle } from '../utilities';

import signinSrcSmall from '../assets/google_sign_in_small.png';
import signinSrcBig from '../assets/google_sign_in.png';
// this is where to build the app...

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {width: 250, height: 250, quickStart: false};
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
		this.saveState = throttle((e) => {
			this.props.saveMap(
				this.props.Nodes,
				this.props.Connections,
				this.props.header.active
			)
		}, 2000);
	}

	componentDidMount() {
		this.props.fetchUser().then(res => {
			if (res.data.visits < 1) {
				this.setState({quickStart: true});
				console.log('changed quickStart to true.');
			}
		})

		window.addEventListener('resize', this.updateWindowDimensions);
		this.setState({ width: window.innerWidth, height: window.innerHeight });
		window.addEventListener('click', this.saveState);
		window.addEventListener('keypress', this.saveState);
	}

	componentWillUnmount() {
		window.removeEventListener('click');
		window.removeEventListener('keypress');
	}


	// saveState(e) {
	// 	let timeoutId;
	// 	if (timeoutId) clearTimeout(timeoutId);
	// 	timeoutId = setTimeout(() => {
	// 		console.log('do stuff here.')
	// 	}, 5000);
	// }

	updateWindowDimensions() {
		// this is where this functionality belongs. the window prop should be passed down to the components that need it.
		// instead of having this same function defined about 7 times separately in so many different components.
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

	renderApp() {
		if (this.props.header.active) {
			return [<Ribbon key={1} window={this.state}/>, <MindMap key={2} />];
		} else {
			return (
				<div className="app-landing">Something went wrong. Please try again later.</div>
			);
		}
	}

	renderMain() {
		// need to replace this with a nice log in button if the user is not logged in.
		// should include different buttons for differing log ins.
		switch (this.props.user) {
			case false:
			// need to bring in the benefits component here. to be displayed above the log in button.
			//		<p className="welcome-msg">Welcome to notemaps! Please log in to continue.</p>
				return (
					<div className="app-landing">
						<Benefits />
						<a href="/auth/google" className="sign-in-btn">
							<img src={this.state.width > 1000 ? signinSrcBig : signinSrcSmall} alt="google sign in"/>
						</a>
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
			<div className="App" style={{width: this.state.width, height: this.state.height}}>
				<BrowserView device={isBrowser} viewClassName="full-height full-width">
					<Header user={this.props.user} desktop />
					{!this.state.quickStart ? <SideMenu display={this.props.user && this.props.header.sideMenu}/> : null}
					{this.state.quickStart ? <QuickStart skip={() => this.setState({quickStart: false})} /> : this.renderMain()}
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

function mapStateToProps({ Nodes, Connections, user, header }) {
	return { Nodes, Connections, user, header };
}

export default connect(mapStateToProps, actions)(App);
