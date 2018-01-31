import React, { Component } from 'react';


class Connection extends Component {
    constructor(props) {
        super(props);
        this.state = {lineWidth: 2, colour: "#3F3F3F"};
        this.setState = this.setState.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleMouseEnter(e) {
        this.setState({lineWidth: 6, colour: "#0081a8"})
    }

    handleMouseLeave(e) {
        this.setState({lineWidth: 2, colour: "#3F3F3F"})
    }

    render() {
        return (
            <g className="connection" onClick={(e) => {setTimeout(this.props.handleClick, 1, this.props.id)}}>
                <SVGLine
                    conn={this.props.conn}
                    lineWidth={this.state.lineWidth}
                    colour={this.state.colour}
                    mouseEnter={this.handleMouseEnter}
                    mouseLeave={this.handleMouseLeave}
                    opacity={1}
                    />
                <SVGLine
                    conn={this.props.conn}
                    lineWidth={25}
                    colour="#fff"
                    mouseEnter={this.handleMouseEnter}
                    mouseLeave={this.handleMouseLeave}
                    opacity={0}
                    />
            </g>
        )
    }
}

export function SVGLine(props) {
    return (
        <line
            onMouseEnter={(e) => {props.mouseEnter()}}
            onMouseLeave={(e) => {props.mouseLeave()}}
            x1={props.conn.start.position.x}
            x2={props.conn.end.position.x}
            y1={props.conn.start.position.y}
            y2={props.conn.end.position.y}
            strokeWidth={props.lineWidth}
            stroke={props.colour}
            opacity={props.opacity}
            />
    )
}

export default Connection;