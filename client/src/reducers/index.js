import { combineReducers } from 'redux';
import NodesReducer from './nodes';
import SelectReducer from './select';
import ConnectionReducer from './connections';
import styleReducer from './style_reducer';
import connectNodeReducer from './connect_pair';
import confirmReducer from './confirm_reducer';
import userReducer from './authReducer';
import headerReducer from './headerReducer';

const rootReducer = combineReducers({
    Nodes: NodesReducer,
    Selected: SelectReducer,
    Connections: ConnectionReducer,
    style: styleReducer,
    connect: connectNodeReducer,
    confirmBox: confirmReducer,
    user: userReducer,
    header: headerReducer
})

export default rootReducer;