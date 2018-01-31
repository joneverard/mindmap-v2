import { CONNECT_NODES } from '../actions';

export default function connectNodeReducer(state={}, action) {
    switch (action.type) {
        case CONNECT_NODES:
            return {node: action.payload.node, active: action.payload.active}
        default:
            return state;
    }
}