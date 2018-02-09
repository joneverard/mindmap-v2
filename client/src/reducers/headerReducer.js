import { FETCH_MAPS, CREATE_MAP, OPEN_MAP, DELETE_MAP } from '../actions';

// if the request to check if they are logged in take a long time, then we don't want to assume either way
// as this makes for bad UX.
export default function headerReducer(state = {maps: [], active: false}, action) {
	switch (action.type) {
		case FETCH_MAPS:
			return {maps: action.payload, active: false};
		case CREATE_MAP:
			return {maps: [...state.maps, action.payload.map], active: action.payload.map._id};
		case OPEN_MAP:
			return {...state, active: action.payload._id};
		case DELETE_MAP:
			return {maps: action.payload, active: state.active};
		default:
			return state;
	}
}