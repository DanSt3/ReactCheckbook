/** @jsx React.DOM */
var React = require("react");
var ReactDOM = require("react-dom");

var CheckRegister = React.createClass({

	toDollarFormat: function(amount) {
		return amount.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	},

	render: function() {

		var that = this;

		var rowCounter = 1;
	    var checkRows = this.props.checks.map(function(check) {
            var evenRow = (rowCounter++ % 2) == 0;
			return (
				<tr className={"check-register-data-row" + ((evenRow) ? " check-register-row-shaded" : "")} key={check.id}>
					<td className="check-register-checknum">{check.checkNumber}</td>
					<td className="check-register-date">{check.date}</td>
					<td className="check-register-payee">{check.payee}</td>
					<td className="check-register-amount">${that.toDollarFormat(check.amount)}</td>
                    <td className="check-register-target-acct">{(that.props.targetAccounts[check.targetID-1]).name}</td>
					<td className="check-register-memo">{check.memo}</td>
				</tr>
			);
		});

		return (
			<table className="check-register-table">
				<thead>
					<tr className="check-register-header-row check-register-row-shaded">
						<th className="check-register-checknum">Number</th>
						<th className="check-register-date">Date</th>
						<th className="check-register-payee">Payee</th>
						<th className="check-register-amount">Amount</th>
						<th className="check-register-target-acct">Account</th>
						<th className="check-register-memo">Memo</th>
					</tr>
				</thead>
				<tbody>
					{checkRows}
				</tbody>
			</table>
		)
	}

});

module.exports = CheckRegister;
