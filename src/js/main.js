import React, { Component } from "react"
import ReactDOM from "react-dom"

import CheckBook from "./components/CheckBook.js"


class App extends Component {
	render() {
		return (
			<CheckBook />
		);
	}
};


ReactDOM.render(<App />, document.getElementById('main'));