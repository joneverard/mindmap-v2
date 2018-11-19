import React, { Component } from "react";

class MapCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // keep track of whether you are editting a map title or not.
      // when you click away from this... anywhere on screen you need to cancel it...
      edit: false,
      title: this.props.map.title
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.renderTitle = this.renderTitle.bind(this); // is this needed if not making any reference to the object?
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onInputChange(e) {
    this.setState({ title: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.editMap(this.props.map._id, this.state.title);
    this.props.toggleEdit(null);
    console.log(e);
  }

  renderTitle() {
    if (this.props.edit) {
      return (
        <form onSubmit={this.handleSubmit} className="map-card-edit-form">
          <input onChange={this.onInputChange} value={this.state.title} />
        </form>
      );
    } else {
      return <p>{this.state.title}</p>;
    }
  }

  render() {
    const { map } = this.props;
    return (
      <div
        className={this.props.selected ? "map-card map-card-selected" : "map-card"}
        key={map._id}
        onClick={() => {
          this.props.toggleEdit(null);
          this.props.openMap(map._id);
        }}
        onMouseEnter={() => {
          this.props.hoverMap(map._id);
        }}
        onMouseLeave={() => {
          this.props.hoverMap(0);
        }}
      >
        {this.renderTitle()}
        {this.props.hover ? (
          <div className="map-card-btns">
            <div
              className="icon-btn"
              onClick={e => {
                e.stopPropagation();
                this.props.toggleEdit(map._id);
              }}
            >
              <i className="fa fa-pencil right" aria-hidden="true" />
            </div>
            <div
              className="icon-btn"
              onClick={e => {
                e.stopPropagation();
                this.props.toggleConfirm(map._id);
              }}
            >
              <i className="fa fa-trash right" aria-hidden="true" />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
// should wrap the <i> elements in a div, then apply styling and call backs to the div.
// this means there is a larger area for the user to click on. currently it is too small.
export default MapCard;
