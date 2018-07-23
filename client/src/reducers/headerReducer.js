import {
	FETCH_MAPS,
	CREATE_MAP,
	OPEN_MAP,
	DELETE_MAP,
	CLOSE_MSG,
	TOGGLE_MENU,
	TOGGLE_CONNECTION,
	TOGGLE_EDIT_MAP
} from '../actions';

// if the request to check if they are logged in take a long time, then we don't want to assume either way
// as this makes for bad UX.
// this file could almost be renamed the App Meta state. as this is where a lot of the state is stored
// for parts of the app which are required for additional functionality. such as pop up menus and temporary state.
// unfortunately this kinda just ends up being the dumping ground for stuff that doesn't really fit anywhere else.
// shouldn't just be using this as a dumping ground for functionality that doesn't belong anywhere.
// makes for hard to read and hard to maintain code.

export default function headerReducer(
	state = {
		maps: [],
		active: false,
		sideMenu: true,
		connection: false
	},
	action
) {
	const { sideMenu, connection, maps, active, edit } = { ...state };
	switch (action.type) {
		case TOGGLE_MENU:
			return {
				maps: [...state.maps],
				active: state.active,
				sideMenu: !sideMenu,
				connection,
				edit
			};

		case FETCH_MAPS:
			return { maps: action.payload, active: false, sideMenu, connection, edit };

		case CREATE_MAP:
			// console.log(action.payload);
			if (action.payload.msg) {
				return {
					maps: [...state.maps],
					active: false,
					msg: action.payload.msg,
					sideMenu,
					connection
				};
			} else {
				return {
					maps: [...state.maps, action.payload.map],
					active: action.payload.map._id,
					msg: '',
					sideMenu,
					connection
				};
			}

		case TOGGLE_EDIT_MAP:
			return {
				maps: [...state.maps],
				active,
				sideMenu,
				connection,
				edit: action.payload
			}

		case CLOSE_MSG:
			return {
				maps: [...state.maps],
				active: state.active,
				msg: '',
				sideMenu,
				connection
			};

		case OPEN_MAP:
			return { ...state, active: action.payload._id, sideMenu, connection };

		case DELETE_MAP:
			// console.log(state.active);
			var _active;
			if (action.payload.mapId === state.active) {
				_active = false;
			} else {
				_active = state.active;
			}
			return { maps: action.payload.data, active: _active, sideMenu, connection };

		case TOGGLE_CONNECTION:
			return {
				maps,
				active,
				sideMenu,
				connection: action.payload
			};

		default:
			return state;
	}
}
