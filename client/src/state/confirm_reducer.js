// import React, { Component } from 'react';
import { TRIGGER_DIALOG } from '../actions';

export default function confirmReducer(state={display: false, context: null}, action) {
	switch (action.type) {
		case TRIGGER_DIALOG:
			return {display: action.payload.display, context: action.payload.context};
		default:
			return state;
	}
}