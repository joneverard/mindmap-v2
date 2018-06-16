import {
    DRAG,
    CREATE_CONN,
    DELETE_NODE,
    ZOOM,
    PAN,
    DELETE_CONNECTION,
    CREATE_MAP,
    OPEN_MAP,
    UPDATE_LINES
} from '../actions';

export default function ConnectionsReducer(state = [], action) {
    // console.log(state);
    var data;
    switch (action.type) {
        case CREATE_MAP:
            console.log(action.payload);
            return action.payload.map.connections || [];

        case OPEN_MAP:
            // why did i place it under position...?
            // return action.payload.connections.map(conn => {
            //     return {
            //         start: {position: {x: conn.start.x, y: conn.start.y}},
            //         end: {position: {x: conn.end.x, y: conn.end.y}}
            //     }
            // });
            return action.payload.connections.map(conn => {
                return {
                    id: conn._id,
                    start: {
                        id: conn.start.nodeId,
                        position: conn.start.position
                    },
                    end: { id: conn.end.nodeId, position: conn.end.position }
                };
            });

        case DRAG:
            // the more i think about this the more i feel that both the nodes and the connections state should be
            // kept as an object with keys. this would likely result in LARGE performance enhancements.
            // since these two arrays can get quite large, you are mapping over a not-insignificant amount of
            // data every time...
            // data = [...state].map(conn => {
            //     if (conn.end.id === action.payload.id) {
            //         conn.end.position.x = action.payload.anchor.x
            //         conn.end.position.y = action.payload.anchor.y
            //     }
            //     if (conn.start.id === action.payload.id) {
            //         conn.start.position.x = action.payload.anchor.x
            //         conn.start.position.y = action.payload.anchor.y
            //     }
            //     return conn
            // });
            data = [...state].map(conn => {
                if (conn.end.id === action.payload.id) {
                    conn.end.position.x += action.payload.mouseDelta.x;
                    conn.end.position.y += action.payload.mouseDelta.y;
                }
                if (conn.start.id === action.payload.id) {
                    conn.start.position.x += action.payload.mouseDelta.x;
                    conn.start.position.y += action.payload.mouseDelta.y;
                }
                return conn;
            });
            return data;

        case UPDATE_LINES:
            data = [...state].map(conn => {
                if (conn.end.id === action.payload.id) {
                    conn.end.position.x = action.payload.anchor.x;
                    conn.end.position.y = action.payload.anchor.y;
                }
                if (conn.start.id === action.payload.id) {
                    conn.start.position.x = action.payload.anchor.x;
                    conn.start.position.y = action.payload.anchor.y;
                }
                return conn;
            });
            return data;

        case CREATE_CONN:
            if (action.payload.start) {
                var newConn = {
                    start: {
                        id: action.payload.start.id,
                        position: {
                            x: action.payload.start.anchor.x,
                            y: action.payload.start.anchor.y
                        }
                    },
                    end: {
                        id: action.payload.end.id,
                        position: {
                            x: action.payload.end.anchor.x,
                            y: action.payload.end.anchor.y
                        }
                    },
                    id: action.payload.id
                };
                return [...state, newConn];
            } else {
                return state;
            }
        case DELETE_NODE:
            data = [...state];
            var filteredStart = data.filter(function(conn) {
                return conn.start.id !== action.payload;
            });
            var filteredEnd = filteredStart.filter(function(conn) {
                return conn.end.id !== action.payload;
            });
            return filteredEnd;

        case ZOOM:
            data = [...state].map(function(connection) {
                var vector = {
                    start: [
                        connection.start.position.x - action.payload.origin.x,
                        connection.start.position.y - action.payload.origin.y
                    ],
                    end: [
                        connection.end.position.x - action.payload.origin.x,
                        connection.end.position.y - action.payload.origin.y
                    ]
                };
                connection.start.position.x +=
                    action.payload.scale * vector.start[0];
                connection.start.position.y +=
                    action.payload.scale * vector.start[1];
                connection.end.position.x +=
                    action.payload.scale * vector.end[0];
                connection.end.position.y +=
                    action.payload.scale * vector.end[1];
                return connection;
            });
            return data;

        case PAN:
            data = [...state].map(function(connection) {
                connection.start.position = addVector(
                    connection.start.position,
                    action.payload.delta
                );
                connection.end.position = addVector(
                    connection.end.position,
                    action.payload.delta
                );
                return connection;
            });
            return data;

        case DELETE_CONNECTION:
            return [...state].filter(conn => action.payload !== conn.id);

        default:
            return state;
    }
}

function addVector(position, delta) {
    return {
        x: position.x + delta.x,
        y: position.y + delta.y
    };
}
