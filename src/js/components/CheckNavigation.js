/** @jsx React.DOM */
var React = require("react");
var ReactDOM = require("react-dom");


var CheckNavigation = React.createClass({

    render: function() {

        return (
            <div className="check-navigation">
                <div className="check-navigation-left-buttons">
                    <button id="check-navigation-new">New Check</button>
                    <div className="check-navigation-btn-divider"></div>
                    <button id="check-navigation-next">Next</button>
                    <div className="check-navigation-btn-divider"></div>
                    <button id="check-navigation-previous">Previous</button>
                </div>
                <div  className="check-navigation-right-buttons">
                    <button id="check-navigation-cancel">Cancel Changes</button>
                    <div className="check-navigation-btn-divider"></div>
                    <button id="check-navigation-save">Save Changes</button>
                </div>
            </div>
        )
    }

});

module.exports = CheckNavigation;
