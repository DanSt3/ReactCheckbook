/** @jsx React.DOM */
var React = require("react");
var ReactDOM = require("react-dom");

var CheckView = React.createClass({

    toDollarFormat: function(amount) {
        return amount.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    },

    leadingZeros : function(number, size) {
        var numberString = number.toString();
        while (numberString.length < size) {
            numberString = "0" + numberString;
        }
        return numberString;
    },

    render: function() {

        var company = this.props.company;
        var account = this.props.account;
        var checkNum = this.leadingZeros(this.props.defaultCheckNum, 4);

        var targetAccts = this.props.targetAccounts.map(function(target){
            return <option value={target.id} key={target.id}>{target.name}</option>
        })

        return (
            <div className="check-main">
                <div className="check-name-box">
                    <p className="check-name-first-line">{company.owner}</p>
                    <p>{company.name}</p>
                    <p>{company.address}</p>
                    <p>{company.city}, {company.state}  {company.zip}</p>
                </div>

                <div className="check-number-date-box">
                    <input type="text" className="check-number" id="check-number" defaultValue={checkNum} maxLength="5"/>

                    <div className="check-date-box break">
                        <label htmlFor="check-date">Date</label>
                        <input type="text" className="check-date" id="check-date" />
                    </div>
                </div>

                <div className="break"></div>

                <div className="check-payee-amount-box">
                    <div className="check-payee-box">
                        <label className="check-payee-label" htmlFor="check-payee">Pay to the<br/>order of</label>
                        <input type="text" className="check-payee" id="check-payee" />
                    </div>

                    <div className="check-amount-box">
                        <label className="check-amount-label" htmlFor="check-amount">$</label>
                        <input type="text" className="check-amount" id="check-amount" />
                    </div>

                    <div className="check-amount-text-box break">
                        <input className="check-amount-text" id="check-amount-text" readOnly />
                        <span className="check-amount-text-slash">/</span><span className="check-amount-text-label">100 dollars</span>
                        <div className="check-security-box"></div>
                    </div>
                </div>

                <div className="check-account-box">
                    <p className="check-account-name">{account.name}</p>
                    <p>{account.address}</p>
                    <p>{account.city}, {account.state}  {account.zip}</p>
                </div>

                <div className="check-memo-signature-box">
                    <div className="check-memo-box">
                        <label className="check-memo-label" htmlFor="check-memo">Re</label>
                        <input type="text" className="check-memo" id="check-memo" />
                    </div>

                    <div className="check-signature">
                    </div>
                </div>

                <div className="check-acctnum-target-box break">
                    <div className="check-account-number">
                        C001C A00002A003A 4567C 890A
                    </div>

                    <div className="check-target-box">
                        <label className="check-target-label" htmlFor="check-target">Acct</label>
                        <div className="check-target-select-mac-chrome-hack">
                            {/* This container only needed because Chrome on OS X overrides any select element styling to make
                                it have rounded corners.  So we put a rectangular div of the same color behind the select. */}
                            <select className="check-target" id="check-target">
                                {targetAccts}
                            </select>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

});

module.exports = CheckView;
