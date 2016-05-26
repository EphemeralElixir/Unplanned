
var React = require('react');
var ReactDOM = require('react-dom');

// requre components
require('./components/App.jsx')

// start it up by loading the App component on the dom
ReactDOM.render(<App />, document.getElementById('app'));