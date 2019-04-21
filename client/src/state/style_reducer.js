import { ZOOM } from '../actions';

const defaultState = {
    fontSize: '100%',
    padding: 5,
    borderRadius: 15
}

export default function styleReducer(state=defaultState, action) {
    switch (action.type) {
        case ZOOM:
            var style = {...state};
            // // console.log(style);
            // console.log(style.fontSize)
            // var size = Number(style.fontSize.split('%')[0]);
            // size += action.payload.scale*10;
            // // += action.payload.scale*3;
            // console.log(size);
            // style.fontSize = `${size}%`;
            // style.padding += action.payload.scale;
            // style.borderRadius += action.payload.scale*3;
            // console.log(style);
            return style;
        default:
            return state;
    }
}