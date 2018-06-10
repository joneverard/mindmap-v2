import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../actions';

import AppControls from '../components/AppControls';
import ConfirmBox from '../components/confirm_box';

class SideMenu extends Component {
	constructor(props) {
		super(props);
		this.state = { title: '', hover: 0, showConfirm: false };
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.renderMaps = this.renderMaps.bind(this);
		this.confirmDelete = this.confirmDelete.bind(this);
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	componentDidMount() {
		this.setState({ width: window.innerWidth, height: window.innerHeight });
		// console.log(this.props.header);
		this.props.fetchMaps();
		// trigger api call to fetch the maps. currently handled by the header.
		// in general, most (all) of the actions in the header component should be moved here.
		window.addEventListener('resize', this.updateWindowDimensions);
    this.updateWindowDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

	updateWindowDimensions() {
		// should really extract this up to the app level.
		this.setState({ width: window.innerWidth, height: window.innerHeight });
	}

	handleInputChange(title) {
		this.setState({title});
	}

	handleSubmit(e) {
		e.preventDefault();
		// console.log(e);
		this.props.createMap(this.state.title);
		this.setState({ createNew: false, title: '' });
	}

	toggleConfirm(mapId) {
		this.setState({ selectedMap: mapId, showConfirm: true });
	}

	confirmDelete() {
		// call action creator
		this.props.deleteMap(this.state.selectedMap);
		this.setState({ selectedMap: 0, showConfirm: false });
	}

  renderMaps() {
  		// need to wire up the open map api call properly.
  		// 
    return this.props.header.maps.map(map => {
      return (
        <div
          className="map-card"
          key={map._id}
          onClick={() => {
            this.props.openMap(map._id);
          }}
          onMouseEnter={(e) => {this.setState({hover: map._id})}}
          onMouseLeave={(e) => {this.setState({hover: 0})}}>
          <p>{map.title}</p>
          {this.state.hover === map._id ? 
            <i
              onClick={(e) => {e.stopPropagation(); this.toggleConfirm(map._id)}} 
              className="fa fa-trash right" 
              aria-hidden="true"></i> : null }
        </div>
      );
    });
  }


	render() {
		//this.props.header.sideMenu
		var { height, width } = this.state;
		return (
			<div
				className={
					this.props.display
						? 'side-menu side-menu-active'
						: 'side-menu'
				}>
				<AppControls
					handleSubmit={this.handleSubmit}
					onInputChange={this.handleInputChange}
					title={this.state.title}
				/>
				<div className="map-list">
					{this.renderMaps()}
				</div>
				<ConfirmBox
					display={this.state.showConfirm}
					windowSize={{ height, width }}
					confirm={this.confirmDelete}
					cancel={() => {
						this.setState({ showConfirm: false, selectedMap: 0 });
					}}
				/>
			</div>
		);
	}
}

function mapStateToProps({ user, header }) {
	return { user, header };
}

export default connect(mapStateToProps, actions)(SideMenu);
