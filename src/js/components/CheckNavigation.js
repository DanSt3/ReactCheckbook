import React, { Component } from "react";
import ReactDOM from "react-dom";


export default class CheckNavigation extends Component {

    constructor() {
        super();

        // Manually bind the event handlers to this object, as ES6 classes won't automatically do this yet
        this.onNewClick = this.onNewClick.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
        this.onPrevClick = this.onPrevClick.bind(this);
        this.onUndoAllClick = this.onUndoAllClick.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
    }

    onNewClick() {
        this.props.actions.onNewCheck();
    }

    onNextClick() {
        this.props.actions.onNextCheck();
    }

    onPrevClick() {
        this.props.actions.onPrevCheck();
    }

    onUndoAllClick() {
        this.props.actions.onUndoAll();
    }

    onSaveClick() {
        this.props.actions.onSaveWorkingCheck();
    }

    render() {
        var isCheckSelected = this.props.selectedID > 0;

        return (
            <div className="check-navigation">
                <div className="left-buttons">
                    <button id="check-navigation-new" onClick={this.onNewClick}>New Check</button>
                    <div className="btn-divider"></div>
                    <button id="check-navigation-next" disabled={this.props.isLastRow || !isCheckSelected}
                            onClick={this.onNextClick}>Next</button>
                    <div className="btn-divider"></div>
                    <button id="check-navigation-previous" disabled={this.props.isFirstRow || !isCheckSelected}
                            onClick={this.onPrevClick}>Previous</button>
                </div>
                <div  className="right-buttons">
                    <button id="check-navigation-undo-all" disabled={!this.props.checkDirty}
                            onClick={this.onUndoAllClick}>Undo Changes</button>
                    <div className="btn-divider"></div>
                    <button id="check-navigation-save" onClick={this.onSaveClick}>Save Changes</button>
                </div>
            </div>
        )
    }

};

