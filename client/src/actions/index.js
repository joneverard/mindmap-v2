import { ContentState } from 'draft-js';

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
// some notes...
// this file is getting a little large. would be better to separate the action creators into files regarding nodes,
// connections, save / edit functions etc.



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
            position: {x: 100, y: 100},
            anchor: {x: 100, y: 100},
            display: false,
            content: ContentState.createFromText(' ')
        }
    }
}

export function selectNode(id) {
    return {
        type: SELECT,
        payload: id
    }
}

export function toggleDisplay(id) {
    return {
        type: TOGGLE_DISPLAY,
        payload: id
    }
}

export function updatePosition(nodeid, rect) {
    return {
        type: UPDATE_POS,
        payload: {
            id: nodeid,
            position: {x:rect.x, y:rect.y},
            anchor: {x: rect.x + rect.width/2, y: rect.y + rect.height/2}
        }
    }
}

export function dragLines(nodeid, anchor) {
    return {
        type: DRAG,
        payload: {id: nodeid, anchor: anchor}
    }
}

export function createConnection(start, end) {
    var d = new Date();
    var id = Math.floor(Math.random()*d.getTime());
    return {
        type: CREATE_CONN,
        payload: {start, end, id}
    }
}

export function updateAnchor(nodeid, anchor) {
    return {
        type: UPDATE_ANCHOR,
        payload: {id: nodeid, anchor: anchor}
    }
}

export function deleteConnection(id) {
    return {
        type: DELETE_CONNECTION,
        payload: id
    }
}

export function deleteNode(nodeId) {
    return {
        type: DELETE_NODE,
        payload: nodeId
    }
}

export function editNode(nodeId) {
    return {
        type: EDIT_NODE,
        payload: nodeId
    }
}

export function saveNode(nodeId, title, content) {
    return {
        type: SAVE_NODE,
        payload: {nodeId, title, content}
    }
}

export function zoomMap(origin, scale) {
    return {
        type: ZOOM,
        payload: {
            origin,
            scale: scale/3000
        }
    }
}

export function panMap(origin, newPosition) {
    var delta = {
        x: newPosition.x - origin.x,
        y: newPosition.y - origin.y
    }
    return {
        type: PAN,
        payload: {
            delta
        }
    }
}

export function connectNode(node, active) {
    return {
        type: CONNECT_NODES,
        payload: {
            node,
            active
        }
    }
}

export function triggerDialog(display, context) {
    return {
        type: TRIGGER_DIALOG,
        payload: {
            display,
            context
        }
    }
}