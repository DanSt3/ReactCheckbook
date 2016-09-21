import React, { Component } from "react";
import ReactDOM from "react-dom";

import classNames from "classnames";
import Confirm from "./Confirm.js";


export default class CheckRegister extends Component {

	constructor() {
		super();
		this.runningBalance = 0.0;
	}

	toDollarFormat(amount) {
		return amount.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	}

	onClick(checkSelected, rowIndexSelected) {
        this.props.onCheckSelectedChanged(checkSelected);
    }

	onDeleteClick(check, event) {
		// Keep the click event from doing a row select after the delete
		event.stopPropagation();

		// Confirm that the user wants to delete this check - if so, ask the parent to delete it
        this.confirmDlg.showConfirm(this.props.onDeleteCheck.bind(null, check.id));

/*		if (confirm("Are you sure you want to delete this check")) {
			console.log("Delete confirmed!");
			this.props.onDeleteCheck(check.id);
		}*/
	}

    getNextCheck(id) {
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
    }

    getPreviousCheck(id) {
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
    }

	getIsFirstRow(id) {
		// Return true is this is the first row, or if the table is empty
		return ((this.props.checks.length === 0)  || (this.props.checks[0].id === id));
	}

	getIsLastRow(id) {
		// Return true is this is the last row, or if the table is empty
		var lastRowIndex = this.props.checks.length - 1;
		return ((this.props.checks.length === 0)  || (this.props.checks[lastRowIndex].id === id));
	}

	render() {

		var that = this;
        this.runningBalance = this.props.account.openingBalance;

	    var checkRows = this.props.checks.map(function(check, rowIndex) {
            that.runningBalance -= check.amount;
            var newBalance = that.runningBalance;

            // Counter for alternate row shading - remember that row indices start at 0
			var evenRow = ((rowIndex + 1) % 2) == 0;

			// Determine the class for the each row, based on whether it is selected or is the alternate row or neither
			// (Using the "classNames" add-on to make things easier)
            var selectedID = that.props.selectedID;
			var rowClassNames =  classNames("data-row", {
				"row-shaded": evenRow,
				"row-selected": ((check) && (check.id === selectedID))
			});

			return (
				<tr className={rowClassNames} key={check.id} onClick={that.onClick.bind(that, check, rowIndex)}>
					<td className="center-text">{check.checkNumber}</td>
					<td className="center-text">{check.date}</td>
					<td className="left-text">{check.payee}</td>
					<td className="right-text">${that.toDollarFormat(check.amount)}</td>
                    <td className="left-text">{(that.props.targetAccounts[check.targetID]).name}</td>
					<td className="left-text">{check.memo}</td>
                    <td className="right-text">${that.toDollarFormat(newBalance)}</td>
					<td className="center-text">
						<button className="delete-btn" onClick={that.onDeleteClick.bind(that, check)}>X</button>
					</td>
				</tr>
			);
		});

		return (
			<div>
				<table className="check-register">
					<thead>
						<tr className="header-row">
							<th>Number</th>
							<th>Date</th>
							<th>Payee</th>
							<th>Amount</th>
							<th>Account</th>
							<th>Memo</th>
                            <th>Balance</th>
							<th>Delete?</th>
						</tr>
					</thead>
					<tbody>
						{checkRows}
					</tbody>
				</table>
				<Confirm ref={ (confirmDlg) => this.confirmDlg = confirmDlg } bannerText="Confirmation" msgText="Are you sure you want to delete this row?" />
			</div>
		)
	}

};


