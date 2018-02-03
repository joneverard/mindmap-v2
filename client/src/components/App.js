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

	renderMain() {
		switch(this.props.user) {
			case false:
				return (
					<div>Welcome to notemaps!</div>
				)
			default:
				return [
					<Ribbon key={1} />,
					<MindMap key={2} />
				]
		}
	}

  render() {
    return (
      <div className="App">
      	<Header user={this.props.user}/>
      	{this.renderMain()}
      </div>
    );
  }
}

function mapStateToProps({ user }) {
	return { user };
}

export default connect(mapStateToProps, actions)(App);
