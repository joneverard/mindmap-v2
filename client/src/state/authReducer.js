import { FETCH_USER } from '../actions';

// if the request to check if they are logged in take a long time, then we don't want to assume either way
// as this makes for bad UX.
export default function authReducer(state = null, action) {
	switch (action.type) {
		case FETCH_USER:
			return action.payload || false; 
			// either object or empty string.
			// using || takes the left value if it is truthy, if not then take the right value.
		default:
			return state;
	}
}

// going to include the credits number logic in here too. since we can re-use the code.
