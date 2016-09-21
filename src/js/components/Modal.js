import React, { Component } from "react";
import ReactDOM from "react-dom";


export default class Modal extends Component {

    constructor() {
        super();
        this.state = {"shown": false};

        // Manually bind the event handlers to this object, as ES6 classes won't automatically do this yet
        this.eatClicks = this.eatClicks.bind(this);
    }

    eatClicks(event) {
        // Don't let clicks propagate back to other elements!
        event.stopPropagation();
    }

    showModal() {
        this.setState({"shown": true});
    }

    hideModal() {
        this.setState({"shown": false});
    }

    render() {
        return (
            (this.state.shown) ?
                <div className="modal-backdrop" onClick={this.eatClicks}>
                    <div className="modal-content" onClick={this.eatClicks}>
                        {this.props.children}
                    </div>
                </div> :
                <div/>
        );
    }

};

