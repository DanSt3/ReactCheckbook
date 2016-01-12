/** @jsx React.DOM */
var React = require("react");
var ReactDOM = require("react-dom");


var Modal = React.createClass({

    getInitialState: function() {
        return {"shown": false};
    },

    eatClicks: function(event) {
        // Don't let clicks propagate back to other elements!
        event.stopPropagation();
    },

    showModal: function() {
        this.setState({"shown": true});
    },

    hideModal: function() {
        this.setState({"shown": false});
    },

    render: function() {
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
});

module.exports = Modal;