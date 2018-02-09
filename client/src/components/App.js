import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
// import './style/App.css';
import Ribbon from './ribbon';
import MindMap from '../containers/mindmap';
import Header from './Header';
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
		return (
			<div className="App">
				<Header user={this.props.user} />
				{this.renderMain()}
			</div>
		);
	}
}

function mapStateToProps({ user, header }) {
	return { user, header };
}

export default connect(mapStateToProps, actions)(App);
