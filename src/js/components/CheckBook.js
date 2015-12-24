/** @jsx React.DOM */
var React = require("react");
var ReactDOM = require("react-dom");

var CheckView = require("./CheckView.js");
var CheckNavigation = require("./CheckNavigation.js");
var CheckRegister = require("./CheckRegister.js");


var CheckBook = React.createClass({

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
		};
	},

	render: function() {
		return (
			<div className="checkbook">
				<div className="checkbook-topframe">
					<CheckView company={this.state.company} account={this.state.account} targetAccounts={this.state.targetAccounts} defaultCheckNum="1"/>
					<CheckNavigation />
				</div>
				<div className="break"></div>
				<CheckRegister checks={this.state.checks} targetAccounts={this.state.targetAccounts}/>
			</div>
		)
	}

});

module.exports = CheckBook;
