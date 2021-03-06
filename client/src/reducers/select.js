import { SELECT, DELETE_NODE, EDIT_NODE } from '../actions';

export default function SelectReducer(state={}, action) {
    switch (action.type) {
        case SELECT:
            // console.log('select being hit')
            // console.log(action.payload, state);
            return action.payload.id;
            
        // case UPDATE_POS:
        //     var selected = {...state};
        //     selected.position = {
        //         x: action.payload.position.x,
        //         y: action.payload.position.y
        //     }
        //     selected.anchor = {
        //         x: action.payload.anchor.x,
        //         y: action.payload.anchor.y
        //     }
        //     return selected;
        // case EDIT_NODE:
        // // FIX ME properly
        // // edit node just takes in an id...
        //     console.log(action.payload);
        //     if (action.payload) {
        //         return action.payload;
        //     } else {
        //         return state;
        //     }



        case DELETE_NODE:
            return null;

        default:
            return state;
    }
}

// repurposing this reducer to contain the state for connecting any two nodes.
// keeps track if a 'connect' action is active, and


// notes... I think this reducer is causing problems. having this violates the single source of truth philosophy of redux.
// a selected node is getting it's information from two different places. the nodes reducer and the selected reducer.
// making steps towards removing this file and having all information present on the node object will (hopefully) resolve some issues.

// noted: onzooming the anchor position of a selected node seems to be misplaced. that is why zoom code is present above.