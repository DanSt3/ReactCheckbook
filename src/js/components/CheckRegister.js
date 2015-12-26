/** @jsx React.DOM */
var React = require("react");
var ReactDOM = require("react-dom");
var classNames = require("classnames");

var CheckRegister = React.createClass({

	toDollarFormat: function(amount) {
		return amount.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	},

	onClick(checkSelected) {
        this.props.onCheckSelectedChanged(checkSelected);
    },

    getNextCheck: function (id) {
        var nextCheck = null;

        var checks = this.props.checks;
        if (id && id > 0) {
            // Find the specified check's row
            var row = -1;
            for (var index = 0; index < checks.length; index++) {
                if (checks[index].id == id) {
                    row = index;
                    break;
                }
            }

            // If there is another row after this one, use that
            if (index < (checks.length - 1)) {
                row = row + 1;
            }
            nextCheck = checks[row];
        }

        return nextCheck;
    },

    getPreviousCheck: function (id) {
        var prevCheck = null;

        var checks = this.props.checks;
        if (id && id > 0) {
            // Find the specified check's row
            var row = -1;
            for (var index = 0; index < checks.length; index++) {
                if (checks[index].id == id) {
                    row = index;
                    break;
                }
            }

            // If there is another row before this one, use that
            if (index > 0) {
                row = row - 1;
            }
            prevCheck = checks[row];
        }

        return prevCheck;
    },

	render: function() {

		var that = this;

		var rowCounter = 1;
	    var checkRows = this.props.checks.map(function(check) {
            // Counter for alternate row shading
			var evenRow = (rowCounter++ % 2) == 0;

			// Determine the class for the each row, based on whether it is selected or is the alternate row or neither
			// (Using the "classNames" add-on to make things easier)
            var selectedID = that.props.selectedID;
			var rowClassNames =  classNames("check-register-data-row", {
				"check-register-row-shaded": evenRow,
				"check-register-row-selected" : (selectedID != -1) && (check.id == selectedID)
			});

			return (
				<tr className={rowClassNames} key={check.id} onClick={that.onClick.bind(that, check)}>
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
