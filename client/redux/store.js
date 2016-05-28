import { createStore } from 'redux';
import reducer from './reducer';
// add middleware

export default function configureStore(initalState = {users: {}}) {
	return createStore(reducer, initalState);
}