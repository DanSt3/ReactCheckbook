/** @jsx React.DOM */
var React = require("react");
var ReactDOM = require("react-dom");

var Modal = require("./Modal.js");


var Confirm = React.createClass({

    portalElement: null,
    modal: null,

    getDefaultProps: function() {
        return {
            "bannerText": "",
            "msgText": "Are you sure you want to do this?",
            "okMsg": "OK",
            "cancelMsg": "Cancel",
        }
    },

    showConfirm: function(action) {
        this.setState({"action": action});
        this.modal.showModal();
    },

    hideConfirm: function() {
        this.modal.hideModal();
    },

    fireAction: function() {
        if (this.state.action) {
            this.state.action();
        }
        this.hideConfirm();
    },


    render: function() {
        return null;
    },

    componentDidMount: function() {
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
    },

    componentWillUnmount: function() {
        document.body.removeChild(this.portalElement);
    },

    componentDidUpdate: function() {
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
});

module.exports = Confirm;