import React, { Component } from "react";
import ReactDOM from "react-dom";

import Modal from "./Modal.js";


export default class Confirm extends Component {

    constructor() {
        super();
        this.portalElement = null;
        this.modal = null;

        // Manually bind the event handlers to this object, as ES6 classes won't automatically do this yet
        this.hideConfirm = this.hideConfirm.bind(this);
        this.fireAction = this.fireAction.bind(this);
    }

    showConfirm(action) {
        this.setState({"action": action});
        this.modal.showModal();
    }

    hideConfirm() {
        this.modal.hideModal();
    }

    fireAction() {
        if (this.state.action) {
            this.state.action();
        }
        this.hideConfirm();
    }

    render() {
        return null;
    }

    componentDidMount() {
        var p = this.props.portalId && document.getElementById(this.props.portalId);
        if (!p) {
            var p = document.createElement('div');
            if (this.props.portalId) {
                p.id = this.props.portalId;
            }
            document.body.appendChild(p);
        }

        this.portalElement = p;
        this.componentDidUpdate();
    }

    componentWillUnmount() {
        document.body.removeChild(this.portalElement);
    }

    componentDidUpdate() {
        this.modal = ReactDOM.render(
            <Modal>
                <div className="banner">{this.props.bannerText}</div>
                <div className="msg-text">{this.props.msgText}</div>
                <div className="btn-box">
                    <button className="cancel-btn" onClick={this.hideConfirm}>{this.props.cancelMsg}</button>
                    <button className="ok-btn" onClick={this.fireAction}>{this.props.okMsg}</button>
                </div>
            </Modal>,
            this.portalElement
        );
    }

};

// Define propTypes and defaultProps as static members is ES6 so they can't be changed (immutable)
Confirm.defaultProps = {
    "bannerText": "",
    "msgText": "Are you sure you want to do this?",
    "okMsg": "OK",
    "cancelMsg": "Cancel",
};
