/** @jsx React.DOM */
var React = require("react");
var ReactDOM = require("react-dom");

var CheckBook = require("./components/CheckBook.js");

ReactDOM.render(
	<CheckBook />,
	document.getElementById("main")
);