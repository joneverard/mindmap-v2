import { ContentState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import axios from 'axios';

export const CREATE = 'create';
export const SELECT = 'select';
export const UPDATE_POS = 'update';
export const EDIT_NODE = 'edit_node';
export const DRAG = 'drag';
export const CREATE_CONN = 'create_conn';
export const UPDATE_ANCHOR = 'update_anchor';
export const DELETE_NODE = 'delete_node';
export const SAVE_NODE = 'save_node';
export const ZOOM = 'zoom';
export const PAN = 'pan';
export const NODE_ONE = 'node_one';
export const CONNECT_NODES = 'connect_nodes';
export const TOGGLE_DISPLAY = 'toggle_display';
export const DELETE_CONNECTION = 'delete_connection';
export const TRIGGER_DIALOG = 'trigger_dialog';
export const UPDATE_LINES = 'update_lines';
export const UPDATE_RANK = 'update_rank';

export const FETCH_USER = 'fetch_user';
export const SAVE_MAP = 'save_map';
export const FETCH_MAPS = 'fetch_maps';
export const CREATE_MAP = 'create_map';
export const OPEN_MAP = 'open_map';
export const DELETE_MAP = 'delete_map';
// some notes...
// this file is getting a little large. would be better to separate the action creators into files regarding nodes,
// connections, save / edit functions etc.

// this function returns another function. the returned function gets used by redux thunk, and passes in dispatch
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({
    // create and send an action object
    type: FETCH_USER,
    payload: res.data
  });
};

// fetchMap ...
export const openMap = (mapid) => async dispatch => {
  const res = await axios.get(`/api/maps/${mapid}`);
  // console.log(res.data);
  dispatch({
    type: OPEN_MAP,
    payload: res.data
  })
}


export const fetchMaps = () => async dispatch => {
  const res = await axios.get('/api/maps');
  dispatch({
    type: FETCH_MAPS,
    payload: res.data
  });
};

export const createMap = title => async dispatch => {
  const res = await axios.post('/api/maps', { title });
  dispatch({
    type: CREATE_MAP,
    payload: res.data
  });
};

export const saveMap = (nodes, connections, mapid) => async dispatch => {
  // need to convert all of the contentState objects in nodes to a html string.
  // console.log(connections);
  const nodeData = [...nodes].map(node => {
    var ret = {...node};
    ret.content = stateToHTML(node.content);
    return ret;
  });

  const res = await axios.post(`/api/maps/${mapid}`, { nodeData, connections });
  dispatch({
    type: SAVE_MAP,
    payload: res.data
  });
};


export const deleteMap = (mapId) => async dispatch => {
  const res = await axios.delete(`/api/maps/${mapId}`);
  // console.log(res.data);
  dispatch({
    type: DELETE_MAP,
    payload: res.data
  })
}


export function createNode(title, selected) {
  var d = new Date();
  return {
    type: CREATE,
    payload: {
      selected: selected,
      title: title,
      nodeType: 'A',
      color: '#fff',
      id: d.getTime(),
      position: { x: 100, y: 100 },
      anchor: { x: 100, y: 100 },
      display: false,
      content: ContentState.createFromText('')
    }
  };
}

export function selectNode(id) {
  return {
    type: SELECT,
    payload: id
  };
}

export function toggleDisplay(id) {
  return {
    type: TOGGLE_DISPLAY,
    payload: {id}
  };
}

export function updatePosition(nodeId, rect, mouseDelta) {
  return {
    type: UPDATE_POS,
    payload: {
      id: nodeId,
      mouseDelta
    }
  }
}


export function dragLines(nodeid, anchor, mouseDelta) {
  return {
    type: DRAG,
    payload: { id: nodeid, anchor: anchor, mouseDelta }
  };
}

export function updateLines(nodeId, anchor) {
  return {
    type: UPDATE_LINES,
    payload: {id: nodeId, anchor}
  }
}

export function createConnection(start, end) {
  var d = new Date();
  var id = Math.floor(Math.random() * d.getTime());
  return {
    type: CREATE_CONN,
    payload: { start, end, id }
  };
}

export function updateAnchor(nodeid, anchor, mouseDelta) {
  return {
    type: UPDATE_ANCHOR,
    payload: { id: nodeid, anchor: anchor, mouseDelta }
  };
}

export function deleteConnection(id) {
  return {
    type: DELETE_CONNECTION,
    payload: id
  };
}

export function deleteNode(nodeId) {
  return {
    type: DELETE_NODE,
    payload: nodeId
  };
}

export function editNode(nodeId) {
  return {
    type: EDIT_NODE,
    payload: nodeId
  };
}

export function saveNode(nodeId, title, content) {
  return {
    type: SAVE_NODE,
    payload: { nodeId, title, content }
  };
}

export function updateRank(nodeId, rank) {
  return {
    type: UPDATE_RANK,
    payload: {nodeId, rank}
  }
}

export function zoomMap(origin, scale) {
  return {
    type: ZOOM,
    payload: {
      origin,
      scale: scale / 2000
    }
  };
}

export function panMap(origin, newPosition) {
  var delta = {
    x: newPosition.x - origin.x,
    y: newPosition.y - origin.y
  };
  return {
    type: PAN,
    payload: {
      delta
    }
  };
}

export function connectNode(node, active) {
  return {
    type: CONNECT_NODES,
    payload: {
      node,
      active
    }
  };
}

export function triggerDialog(display, context) {
  return {
    type: TRIGGER_DIALOG,
    payload: {
      display,
      context
    }
  };
}
