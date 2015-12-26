/** @jsx React.DOM */
var React = require("react");
var ReactDOM = require("react-dom");


var CheckNavigation = React.createClass({

    onNewClick: function() {
        this.props.actions.onNewCheck();
    },

    onNextClick: function() {
        this.props.actions.onNextCheck();
    },

    onPrevClick: function() {
        this.props.actions.onPrevCheck();
    },

    onUndoAllClick: function() {
        this.props.actions.onUndoAll();
    },

    onSaveClick: function() {
        this.props.actions.onSaveCheck();
    },

    render: function() {

        return (
            <div className="check-navigation">
                <div className="check-navigation-left-buttons">
                    <button id="check-navigation-new" onClick={this.onNewClick}>New Check</button>
                    <div className="check-navigation-btn-divider"></div>
                    <button id="check-navigation-next" onClick={this.onNextClick}>Next</button>
                    <div className="check-navigation-btn-divider"></div>
                    <button id="check-navigation-previous" onClick={this.onPrevClick}>Previous</button>
                </div>
                <div  className="check-navigation-right-buttons">
                    <button id="check-navigation-undo-all" onClick={this.onUndoAllClick}>Undo Changes</button>
                    <div className="check-navigation-btn-divider"></div>
                    <button id="check-navigation-save" onClick={this.onSaveClick}>Save Changes</button>
                </div>
            </div>
        )
    }

});

module.exports = CheckNavigation;
