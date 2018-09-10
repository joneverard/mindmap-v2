import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { select } from 'd3';
import * as actions from '../actions';
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

    // d3
    // why do we need d3 to mount a component?
    var svg = select('svg');
    svg.attr('height', this.props.height).attr('width', this.props.width);
    svg
      .append('g')
      .attr('class', 'links')
      .attr('stroke', '#3F3F3F');

    // should use a ref here.. can it not just be:
    // this.svg.addEventListener('mouseUp', (e) => this.props.mouseUp(e));
    ReactDOM.findDOMNode(this.svg).addEventListener('mouseUp', e =>
      this.props.mouseUp(e)
    );
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
    console.log('hello cancel selection');
    // save node width and height at least.
    // don't think this works..
    // perhaps a for loop through all of the nodes? pretty terrible but might work.
    // failing that get access to the selected node.
    // using selected reducer is depricated.
    // should try and use nodes reducer instead.
    // use SELECT action to add a ref to the node object?
    if (this.props.selected) {
      // need to use the id in this.props.selected to find the correct node object.
      const save_note = this.props.nodes.filter(node => node.id === this.props.selected)[0];
      console.log('save note object', save_note);
      
      if (save_note) {
        let editor = ReactDOM.findDOMNode(save_note.editor_ref);
        this.props.saveNode(save_note.id, save_note.title, save_note.content, {
          width: editor ? editor.clientWidth : null,
          height: editor ? editor.clientHeight : null
        });
      };
      this.props.selectNode(null);

    } else {
      // this.props.saveNode();
      this.props.selectNode(null);
    }

    this.props.editNode(null);
    this.props.connectNode(null, null);
    this.props.toggleConnection(false);
    this.props.toggleEditMap(null);
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
          ref={svg => {
            this.svg = svg;
          }}
          onMouseDown={e => {
            this.handlePan(e, true);
          }}
          onMouseUp={e => {
            this.handlePan(e, false);
            this.props.mouseUp();
          }}>
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

function mapStateToProps({ Connections, Selected, Nodes }) {
  return {
    connections: Connections,
    selected: Selected,
    nodes: Nodes
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(
//     { selectNode, editNode, zoomMap, panMap, connectNode, deleteConnection },
//     dispatch
//   );
// }

export default connect(mapStateToProps, actions)(MapView);

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
