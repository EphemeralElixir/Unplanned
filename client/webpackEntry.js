import React from 'react'
import { render } from 'react-dom'
import configureStore from './redux/store.js';
import { Provider } from 'react-redux';

import App from './components/App.jsx'
import './components/Gmap.jsx';

let initialState = {
	users: {
		1234: {
	    name: 'Sepehr',
	    bio: 'This is Sepehr',
	    lat: 37.782917,
	    lng: -122.406350
    },
    4523: {
      name: 'Leo',
      bio: 'This is Leo',
      lat: 37.784617,
      lng: -122.416645
    }
	}
};

let store = configureStore(initialState);

// start it up by loading the App component on the dom
render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
);
