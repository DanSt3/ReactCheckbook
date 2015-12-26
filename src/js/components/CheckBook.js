/** @jsx React.DOM */
var React = require("react");
var ReactDOM = require("react-dom");
var update = require("react-addons-update");


var CheckView = require("./CheckView.js");
var CheckNavigation = require("./CheckNavigation.js");
var CheckRegister = require("./CheckRegister.js");


var CheckBook = React.createClass({

	navActions: null,

	getInitialState: function() {
		return {
			company: {
				name: "Sky Magic Productions",
				owner: "Dan Steinberg",
				address: "1234 Main Street",
				city: "Palo Alto",
				state: "CA",
				zip: "12345-1111"
			},
            account: {
                name: "Really Big Bank",
                address: "9876 Elm Street",
                city: "San Francisco",
                state: "CA",
                zip: "23456-1234"
            },
			targetAccounts: [
				{id: "1", name: "Advertising"},
				{id: "2", name: "Bank Charges"},
				{id: "3", name: "Commissions & Fees"},
				{id: "4", name: "Disposal Fees"},
				{id: "5", name: "Dues & Subscriptions"},
				{id: "6", name: "Insurance"},
				{id: "7", name: "Meals & Entertainment"},
				{id: "8", name: "Office Supplies"},
			],
			checks: [
				{id: 1, date: "11/28/2015", checkNumber: "1", payee: "Starbucks", amount: 32.15, memo: "Coffee for the team", targetID: 7},
				{id: 2, date: "12/01/2015", checkNumber: "2", payee: "Google", amount: 1095.18, memo: "AdWords ads for November", targetID: 1},
				{id: 3, date: "12/01/2015", checkNumber: "3", payee: "Really Big Bank", amount: 45.00, memo: "Checking Fees", targetID: 2},
				{id: 4, date: "12/10/2015", checkNumber: "4", payee: "Staples", amount: 47.22, memo: "Copier Paper", targetID: 8},
			],
			selectedCheck: {},
			workingCheck: {}
		};
	},

	onNewCheck: function() {
		// Set an empty check object into both the selected and working checks
		var emptyCheck = {targetID: -1};
		this.setState({"selectedCheck": emptyCheck});
		this.setState({"workingCheck": emptyCheck});
	},

	onNextCheck: function() {
		// Ask the check register for the next check
		// This assumes that check register may have sorted the data, so we can't know what the next check in the
		// register is without asking.
		// We could also implement by sending an event and a callback to the check register
		var nextCheck = this.refs.checkBook.getNextCheck(this.state.selectedCheck.id);
		if (nextCheck) {
			this.onCheckSelectedChanged(nextCheck);
		}
	},

	onPrevCheck: function () {
		// Ask the check register for the previous check
		// This assumes that check register may have sorted the data, so we can't know what the previous check in the
		// register is without asking.
		// We could also implement by sending an event and a callback to the check register
		var prevCheck = this.refs.checkBook.getPreviousCheck(this.state.selectedCheck.id);
		if (prevCheck) {
			this.onCheckSelectedChanged(prevCheck);
		}
	},

	onUndoAll: function() {
		// Copy the selected check (which is unmodified) into the working copy
		var updatedWorkingCheck = update(this.state.selectedCheck, {});

		// Tell the world that the working copy of the check has changed
		this.setState({"workingCheck": updatedWorkingCheck});
	},

	onSaveCheck: function() {
	},


	onCheckSelectedChanged: function(newSelection) {
		this.setState({selectedCheck: newSelection});
		// Make a copy of the selected check so it can be edited without losing the original data so we can undo the
		// editing changes if the user desires.
		this.setState({"workingCheck": update(newSelection, {})});	// Shallow copy is fine here for now
	},

	onWorkingCheckDataChange: function(propName, newValue) {
		// We're passing in the affected property's name (that is, a string) and value, but for update() we need it to
		// to be in a object.  So make a simple object with just that property and value only
		var propChange = {};
		propChange[propName] = newValue;

		// Now merge the change into the the working copy of the check
		var updatedWorkingCheck = update(this.state.workingCheck, {$merge: propChange});

		// Tell the world that the working copy of the check has changed
		this.setState({"workingCheck": updatedWorkingCheck});
	},

	render: function() {
		// Set up the navActions object on the first time through.  We need to do this here because the functions
		// referenced here aren't defined earlier - even in getDefaultProps()
		if (this.navActions === null) {
			this.navActions = {};
			this.navActions.onNewCheck = this.onNewCheck;
			this.navActions.onNextCheck = this.onNextCheck;
			this.navActions.onPrevCheck = this.onPrevCheck;
			this.navActions.onUndoAll = this.onUndoAll;
			this.navActions.onSaveCheck = this.onSaveCheck;
		}

		return (
			<div className="checkbook">
				<div className="checkbook-topframe">
					<CheckView company={this.state.company} account={this.state.account} targetAccounts={this.state.targetAccounts}
							   check={this.state.workingCheck} defaultCheckNum="5" onCheckDataChange={this.onWorkingCheckDataChange}/>
					<CheckNavigation actions={this.navActions}/>
				</div>
				<div className="break"></div>
				<CheckRegister checks={this.state.checks} targetAccounts={this.state.targetAccounts} ref="checkBook"
							   selectedID={this.state.selectedCheck.id} onCheckSelectedChanged={this.onCheckSelectedChanged}/>
			</div>
		)
	}

});

module.exports = CheckBook;
