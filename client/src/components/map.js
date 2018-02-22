import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { select } from 'd3';
import {
  selectNode,
  editNode,
  zoomMap,
  panMap,
  connectNode,
  deleteConnection
} from '../actions';
import Connection from './connection';
import FloatingOptions from './floating_options';
import { getHalfWayPoint } from '../utilities';

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: '0',
      height: '0',
      mouse: { x: 0, y: 0 },
      display: false,
      selectedId: 12345
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.renderLine = this.renderLine.bind(this);
    this.handleConnClick = this.handleConnClick.bind(this);
    this.deleteSelection = this.deleteSelection.bind(this);
  }

  componentWillMount() {
    this.props.handleResize();
  }

  componentDidMount() {
    // this can be changed to be D3 independent. then D3 can be taken out of the bundle size.
    // this.updateWindowDimensions();
    this.props.handleResize();
    // window.addEventListener('resize', this.updateWindowDimensions);
    window.addEventListener('resize', this.props.handleResize);
    var svg = select('svg');
    svg.attr('height', this.props.height).attr('width', this.props.width);
    svg
      .append('g')
      .attr('class', 'links')
      .attr('stroke', '#3F3F3F');
    ReactDOM.findDOMNode(this.svg).addEventListener('mouseUp', (e) => this.props.mouseUp(e));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  componentDidUpdate() {
    this.renderLine();
  }

  cancelSelection(e) {
    this.props.selectNode(null);
    this.props.editNode(null);
    this.props.connectNode(null, null);
    this.handleConnClick(false);
  }

  handlePan(e, start) {
    this.setState({ startPos: { x: e.clientX, y: e.clientY }, pan: start });
  }

  handleMove(e) {
    this.props.handleMove(e);
    if (this.state.pan) {
      var newPos = { x: e.clientX, y: e.clientY };
      this.props.panMap(this.state.startPos, newPos);
      this.setState({ startPos: newPos });
    }
  }

  handleConnClick(id) {
    if (id) {
      this.setState({ display: true });
    } else {
      this.setState({ display: false });
    }
    this.setState({ selectedId: id });
  }

  renderLine(conn) {
    if (conn) {
      return (
        <Connection
          conn={conn}
          key={conn.id}
          id={conn.id}
          handleClick={this.handleConnClick}
        />
      );
    }
  }

  deleteSelection(e) {
    this.props.deleteConnection(this.state.selectedId);
    this.cancelSelection(null);
  }

  render() {
    var selectedConn = [...this.props.connections].filter(
      connection => connection.id === this.state.selectedId
    )[0];
    return (
      <div>
        <svg
          height={this.props.height}
          width={this.props.width}
          onWheel={this.props.handleWheel}
          onClick={e => this.cancelSelection(e)}
          onMouseMove={e => {
            this.handleMove(e);
          }}
          ref={svg => {this.svg = svg}}
          onMouseDown={(e) => {this.handlePan(e, true)}}
          onMouseUp={(e) => {this.handlePan(e, false); this.props.mouseUp()}}
        >
          {this.props.connections.map(this.renderLine)}
        </svg>
        <FloatingOptions
          show={this.state.display}
          selected={this.state.selected}
          position={getHalfWayPoint(selectedConn)}
          delete={this.deleteSelection}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    connections: state.Connections
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { selectNode, editNode, zoomMap, panMap, connectNode, deleteConnection },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MapView);


// below is old d3 based code. still need to remove d3 entirely. currently SVG component
// renderMap() {
//     var mapConnections = select('g')
//             .selectAll('line')
//             .data(this.props.connections, function(d) {
//                 return d
//             })
//             .attr('x1', function(d) {
//                 return d.start.position.x;
//             })
//             .attr('y1', function(d) {
//                 return d.start.position.y;
//             })
//             .attr('x2', function(d) {
//                 return d.end.position.x;
//             })
//             .attr('y2', function(d) {
//                 return d.end.position.y;
//             })
//             .attr('id', function(d) {
//                 return Math.random()*1000000;
//             })

//         mapConnections
//             .exit()
//             .remove();

//         mapConnections
//             .enter()
//             .append('line')
//                 .attr('x1', function(d) {
//                     return d.start.position.x;
//                 })
//                 .attr('y1', function(d) {
//                     return d.start.position.y;
//                 })
//                 .attr('x2', function(d) {
//                     return d.end.position.x;
//                 })
//                 .attr('y2', function(d) {
//                     return d.end.position.y;
//                 })
//                 .attr('id', function(d) {
//                     return Math.random()*1000000
//                 })
//                 .attr('stroke-width', 2)
//                 .merge(mapConnections);
// };
