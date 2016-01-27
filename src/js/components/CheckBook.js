/** @jsx React.DOM */
var React = require("react");
var ReactDOM = require("react-dom");
var update = require("react-addons-update");


var CheckView = require("./CheckView.js");
var CheckNavigation = require("./CheckNavigation.js");
var CheckRegister = require("./CheckRegister.js");


var CheckBook = React.createClass({

	navActions: null,
	checks: {
		nextAvailID: 5,
		data: [
			{id: 1, date: "11/28/2015", checkNumber: "1", payee: "Starbucks", amount: 32.15, memo: "Coffee for the team", targetID: 6},
			{id: 2, date: "12/01/2015", checkNumber: "2", payee: "Google", amount: 1095.18, memo: "AdWords ads for November", targetID: 0},
			{id: 3, date: "12/01/2015", checkNumber: "3", payee: "Really Big Bank", amount: 45.00, memo: "Checking Fees", targetID: 1},
			{id: 4, date: "12/10/2015", checkNumber: "4", payee: "Staples", amount: 47.22, memo: "Copier Paper", targetID: 7}
		]
	},


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
                zip: "23456-1234",
				openingBalance: 3500.0
            },
			targetAccounts: [
				{id: "0", name: "Advertising"},
				{id: "1", name: "Bank Charges"},
				{id: "2", name: "Commissions & Fees"},
				{id: "3", name: "Disposal Fees"},
				{id: "4", name: "Dues & Subscriptions"},
				{id: "5", name: "Insurance"},
				{id: "6", name: "Meals & Entertainment"},
				{id: "7", name: "Office Supplies"},
			],
			selectedCheck: {id: 0, checkNumber: "5", targetID: 0},
			workingCheck: {id: 0, checkNumber: "5",targetID: 0},
			workingCheckDirty: false,
			isFirstRow: true,		// Set first and last rows to true when no check is selected, since "Next" and
									// "Last" buttons won't make any sense
			isLastRow: true
		};
	},

	onNewCheck: function() {
        // Set an empty check object into both the selected and working checks
        var emptyCheck = {id: 0, checkNumber: "5", targetID: 0};
        this.setState({
            "selectedCheck": emptyCheck,
            "workingCheck": emptyCheck,
            "workingCheckDirty": false
        });
    },

	onNextCheck: function() {
		// Ask the check register for the next check
		// This assumes that check register may have sorted the data, so we can't know what the next check in the
		// register is without asking.
		// We could also implement by sending an event and a callback to the check register
		var nextCheck = this.refs.checkRegister.getNextCheck(this.state.selectedCheck.id);
		if (nextCheck) {
			this.onCheckSelectedChanged(nextCheck);
		}
	},

	onPrevCheck: function () {
		// Ask the check register for the previous check
		// This assumes that check register may have sorted the data, so we can't know what the previous check in the
		// register is without asking.
		// We could also implement by sending an event and a callback to the check register
		var prevCheck = this.refs.checkRegister.getPreviousCheck(this.state.selectedCheck.id);
		if (prevCheck) {
			this.onCheckSelectedChanged(prevCheck);
		}
	},

	onUndoAll: function() {
		// Copy the selected check (which is unmodified) into the working copy
		var updatedWorkingCheck = update(this.state.selectedCheck, {});

		// Tell the world that the working copy of the check has changed
		this.setState({
            "workingCheck": updatedWorkingCheck,
            "workingCheckDirty": false
        });
	},

	onSaveWorkingCheck: function() {
		// (This will get moved into the data store object when I create that)

		// See if there is a row with this ID already in the data array
		var checkToSave = this.state.workingCheck;
		var row = -1;
		for (var index = 0; index < this.checks.data.length; index++) {
			if (this.checks.data[index].id == checkToSave.id) {
				row = index;
				break;
			}
		}

		// If this ID already exists, replace the row's data with the edited data
		if (row != -1) {
			this.checks.data[row] = checkToSave;
		} else {
			// Else the ID isn't in the table, so we'll have to add that

			// If the ID is the default ID, give it the next one available ID
			if (checkToSave.id === 0) {
				checkToSave.id = this.checks.nextAvailID++;
			}

			// Add the data as a new row at the end of the table
			this.checks.data.push(checkToSave);
		}

		// Tell the UI that we've changed selection to the new check
		this.onCheckSelectedChanged(checkToSave);
	},

	onDeleteCheck: function(idToDelete) {
		// Find the specified row
		var rowToDelete = -1;
		for (var index = 0; index < this.checks.data.length; index++) {
			if (this.checks.data[index].id == idToDelete) {
				rowToDelete = index;
				break;
			}
		}

		// If the row has been found
		if (rowToDelete !== -1) {
			// If this check is the working check
			if (this.state.workingCheck.id === idToDelete) {
				// Clear the working check
				this.onNewCheck();
			}

			// Remove this row from the data array
			this.checks.data.splice(rowToDelete, 1);

			// Tell the UI to refresh
			this.setState({});
		}
	},

	onCheckSelectedChanged: function(newSelection) {
		// Ask the check register whether this is the first row or the last row
		var isFirstRow = this.refs.checkRegister.getIsFirstRow(newSelection.id);
		var isLastRow = this.refs.checkRegister.getIsLastRow(newSelection.id);

		// Set everything about the changed selection into the state in one call
		this.setState({
			selectedCheck: newSelection,
			"workingCheck": update(newSelection, {}),	// Make a copy of the selected check so it can be edited without
														// losing the original data so we can undo the editing changes
														// if the user desires.  Shallow copy is fine here for now.
			"workingCheckDirty": false,
			"isFirstRow": isFirstRow,
			"isLastRow": isLastRow
		});
	},

	onWorkingCheckDataChange: function(propName, newValue) {
		// We're passing in the affected property's name (that is, a string) and value, but for update() we need it to
		// to be in a object.  So make a simple object with just that property and value only
		var propChange = {};
		propChange[propName] = newValue;

		// Now merge the change into the the working copy of the check
		var updatedWorkingCheck = update(this.state.workingCheck, {$merge: propChange});

		// Tell the world that the working copy of the check has changed
		this.setState({
			"workingCheck": updatedWorkingCheck,
			"workingCheckDirty": true
		});
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
			this.navActions.onSaveWorkingCheck = this.onSaveWorkingCheck;
			this.navActions.onDeleteCheck = this.onDeleteCheck;
		}

		return (
			<div className="checkbook">
				<div className="checkbook-topframe">
					<CheckView company={this.state.company} account={this.state.account} targetAccounts={this.state.targetAccounts}
							   check={this.state.workingCheck} onCheckDataChange={this.onWorkingCheckDataChange}/>
					<CheckNavigation actions={this.navActions} selectedID={this.state.selectedCheck.id}
									 checkDirty={this.state.workingCheckDirty} isFirstRow={this.state.isFirstRow}
									 isLastRow={this.state.isLastRow} />
					<div className="break"></div>
				</div>
				<CheckRegister checks={this.checks.data} targetAccounts={this.state.targetAccounts} account={this.state.account}
					           ref="checkRegister" selectedID={this.state.selectedCheck.id}
							   onCheckSelectedChanged={this.onCheckSelectedChanged}
							   onDeleteCheck={this.navActions.onDeleteCheck}/>
			</div>
		)
	}

});

module.exports = CheckBook;
