import { DRAG, CREATE_CONN, DELETE_NODE, ZOOM, PAN, DELETE_CONNECTION } from '../actions';


export default function ConnectionsReducer(state=[], action) {
    var data;
    switch (action.type) {
        case DRAG:
            data = [...state].map(function(connection) {
                if (connection.end.id === action.payload.id) {
                    connection.end.position.x = action.payload.anchor.x
                    connection.end.position.y = action.payload.anchor.y
                }
                if (connection.start.id === action.payload.id) {
                    connection.start.position.x = action.payload.anchor.x
                    connection.start.position.y = action.payload.anchor.y
                }
                return connection
            });
            return data;

        case CREATE_CONN:
            if (action.payload.start) {
                var newConn = {
                    start: {
                        id: action.payload.start.id,
                        position: {x: action.payload.start.anchor.x, y: action.payload.start.anchor.y}
                    },
                    end: {
                        id: action.payload.end.id,
                        position: {x: action.payload.end.anchor.x, y: action.payload.end.anchor.y}
                    },
                    id: action.payload.id
                }
                return [...state, newConn];
            } else {
                return state
            }
        case DELETE_NODE:
            data = [...state];
            var filteredStart = data.filter(function(conn) {
                return (conn.start.id !== action.payload);
            });
            var filteredEnd = filteredStart.filter(function(conn) {
                return (conn.end.id !== action.payload);
            });
            return filteredEnd;

        case ZOOM:
            data = [...state].map(function(connection) {
                var vector = {
                    start: [connection.start.position.x-action.payload.origin.x,
                            connection.start.position.y-action.payload.origin.y],
                    end: [connection.end.position.x-action.payload.origin.x,
                          connection.end.position.y-action.payload.origin.y]
                }
                connection.start.position.x += action.payload.scale*vector.start[0]
                connection.start.position.y += action.payload.scale*vector.start[1]
                connection.end.position.x += action.payload.scale*vector.end[0]
                connection.end.position.y += action.payload.scale*vector.end[1]
                return connection;
            });
            return data;

        case PAN:
            data = [...state].map(function(connection) {
                connection.start.position = addVector(connection.start.position, action.payload.delta);
                connection.end.position = addVector(connection.end.position, action.payload.delta);
                return connection;
            });
            return data;

        case DELETE_CONNECTION:
            return [...state].filter(conn => (action.payload !== conn.id));


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
