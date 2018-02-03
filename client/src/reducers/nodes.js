import { getCartesianCoords } from '../utilities';
import { ContentState } from 'draft-js';
import {
    CREATE,
    UPDATE_POS,
    DELETE_NODE,
    UPDATE_ANCHOR,
    EDIT_NODE,
    SELECT,
    SAVE_NODE,
    ZOOM,
    PAN,
    TOGGLE_DISPLAY
} from '../actions';

var initialState = []
initialState.push(
    {
        title: 'this is an initial node',
        type: 'A',
        color: 'white',
        position: {x: 350, y: 350},
        anchor: {x: 350, y: 350},
        display: false,
        content: ContentState.createFromText('Hello this is a piece of content.'),
        selected: false,
        edit: false,
        id: 12345678910
    }
);


export default function NodesReducer(state=initialState, action) {
    // console.log(state);
    var data;
    switch (action.type) {
        case CREATE:
            // console.log(action.payload.selected);
            if (action.payload.selected) {
                var newNode = {...action.payload};
                // calculate node position based on selected node (origin) specified radius and random angle.
                newNode.position = getCartesianCoords(action.payload.selected.position, 100, Math.random()*Math.PI*2);
                return [...state, newNode];
            } else {
                return [...state, action.payload];
            }

            // need to go through the nodes array, and calculate the position to place the new node...
            // within a radius of the 'selected' node, if selected.

        case SAVE_NODE:
            data = [...state].map(function(node) {
                if (node.id === action.payload.nodeId) {
                    node.title = action.payload.title;
                    node.content = action.payload.content;
                }
                return node;
            });
            return data;

        case SELECT:
            data = [...state].map(function(node) {
                if (node && action.payload ) {
                    if (node.id !== action.payload.id) {
                        node.edit = false;
                        node.selected = false;
                    } else if (node.id === action.payload.id) {
                        node.selected = true;
                    }
                };
                return node;
            });
            return data;

        case TOGGLE_DISPLAY:
            data = [...state].map(function(node) {
                if (node.id === action.payload) {
                    node.display = !node.display;
                }
                return node;
            });
            return data;

        case UPDATE_POS:
            data = [...state].map(function (node) {
                if (node.id === action.payload.id) {
                    node.position = action.payload.position
                }
                return node;
            })
            // console.log('data', data);
            return data;

        case EDIT_NODE:
            data = [...state].map(function(node) {
                if (node.id === action.payload) {
                    node.edit = true;
                } else {
                    node.edit = false; // only one at a time please!
                }
                return node;
            });
            return data;

        case DELETE_NODE:
            var array = [...state];
            var filtered = array.filter(function(node) { return node.id !== action.payload })
            // console.log(filtered);
            return filtered;

        case UPDATE_ANCHOR:
            data = [...state].map(function(node) {
                if (node.id === action.payload.id) {
                    node.anchor = action.payload.anchor;
                }
                return node;
            })
            return data;

        case ZOOM:
            // need to calculate the unit vector for each node. then scale along that vector.
            data = [...state].map(function(node) {
                var vector = [node.anchor.x-action.payload.origin.x, node.anchor.y-action.payload.origin.y];
                // var magnitude = Math.sqrt(Math.pow(vector[0],2)+Math.pow(vector[1],2));
                var unitVector = [vector[0], vector[1]];
                node.position.x += action.payload.scale*unitVector[0];
                node.position.y += action.payload.scale*unitVector[1];
                node.anchor.x += action.payload.scale*unitVector[0];
                node.anchor.y += action.payload.scale*unitVector[1];
                return node
            });
            return data

        case PAN:
            data = [...state].map(function(node) {
                node.position.x += action.payload.delta.x;
                node.position.y += action.payload.delta.y;
                node.anchor.x += action.payload.delta.x;
                node.anchor.y += action.payload.delta.y;
                return node;
            });
            return data;

        default:
            return state;
    }
}

// below code is for trying to get predictable places for newly created nodes. struggling to get it working.
// decided to opt for a simpler "random" positioning, within a radius.
                // [...state].forEach((node) => {
                //     if (action.payload.selected.id !== node.id) {
                //         locations.push(getCylindricalCoords(action.payload.selected.position, node.position).angle);
                //     }
                // });
                // locations.sort();
                // var difference = [];
                // for (var i=0; i<=locations.length; i++) {
                //     if (locations[i+1]) {
                //         difference.push({magnitude: (locations[i+1] - locations[i]), start: locations[i+1], end: locations[i]});
                //     } else {
                //         difference.push(
                //             {magnitude: 2*Math.pi-(locations[i] - locations[0]), start: locations[0], end: locations[i]}
                //         );
                //     }
                // }
                // difference.sort(function(a,b) {return (a.magnitude > b.magnitude) ? 1 : ((b.magnitude > a.magnitude) ? -1 : 0);} );
                // console.log('difference',difference);