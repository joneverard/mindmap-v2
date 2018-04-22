import { FETCH_MAPS, CREATE_MAP, OPEN_MAP, DELETE_MAP, CLOSE_MSG, TOGGLE_MENU } from '../actions';

// if the request to check if they are logged in take a long time, then we don't want to assume either way
// as this makes for bad UX.
export default function headerReducer(state = {maps: [], active: false, sideMenu: false}, action) {
	const {sideMenu} = {...state};
	switch (action.type) {
		case TOGGLE_MENU:
			return {maps: [...state.maps], active: state.active, sideMenu: !sideMenu}

		case FETCH_MAPS:
			return {maps: action.payload, active: false, sideMenu};
		case CREATE_MAP:
		// console.log(action.payload);
			if (action.payload.msg) {
				return {maps: [...state.maps], active: false, msg: action.payload.msg, sideMenu}
			} else {
				return {maps: [...state.maps, action.payload.map], active: action.payload.map._id, msg: '', sideMenu};
			}
		case CLOSE_MSG:
			return {maps: [...state.maps], active: state.active, msg: '', sideMenu}
		case OPEN_MAP:
			return {...state, active: action.payload._id, sideMenu};
		case DELETE_MAP: 
			// console.log(state.active);
			var active;
			if (action.payload.mapId === state.active) {
				active = false;
			} else {
				active = state.active;
			}
			return {maps: action.payload.data, active, sideMenu};
		default:
			return state;
	}
}