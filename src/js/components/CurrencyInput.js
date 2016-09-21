import React, { Component } from "react";
import ReactDOM from "react-dom";


export default class CurrencyInput extends Component {

    constructor() {
        super();

        // Manually bind the event handlers to this object, as ES6 classes won't automatically do this yet
        this.onChange = this.onChange.bind(this);
    }

    onFocus(event) {
        // Strip out any separators and currency signs on entry
    }

    onChange(event) {
        // Save the current selection in this input field, in case we need set it back
        var selection  = {
            start: event.target.selectionStart,
            end: event.target.selectionEnd
        };

        var inputIsValid = false;
        var matchedValue = "";

        // If the new value is not an empty string
        if (event.target.value !== "") {

            // Use a RegEx to remove anything but digits, up to one decimal points, and the sign
            var currencyRegex = /^-?((\.\d*)|(\d+(\.\d*)?))$/g;
            var newValue = event.target.value.match(currencyRegex);

            // If a match was found, then we have a basic validation.  We need to do other validation checks next
            if (newValue && newValue.length == 1) {
                matchedValue = newValue[0];
                // If there is just one decimal point, make sure there aren't too many digits past
                // the decimal point
                var decimalIndex = matchedValue.indexOf(".");
                var numberOfDecimalPlaces = (decimalIndex != -1) ? matchedValue.length - decimalIndex - 1 : 0;

                // If there is a negative sign, make sure it is allowed
                var negativeSignFound = (matchedValue.indexOf("-") != -1) ? true : false;

                // Check to make sure the value isn't too big
                var quantity = Math.abs(parseFloat(matchedValue));

                // If everything is still good, then the new entry is valid
                if ((numberOfDecimalPlaces <= this.props.maxDecimalPlaces) &&
                    (!negativeSignFound || this.props.allowNegatives) &&
                    (quantity <= this.props.maxValue)) {
                    inputIsValid = true;
                }
            }
        } else {
            // Else the input field is now an empty string (that is, the field is empty), and that is always valid
            inputIsValid = true;
            matchedValue = "";      // (Redundant, but safe!)
        }

        if (inputIsValid) {
            this.props.onChange(matchedValue);
        }
        else {
            // else the changed entry is not valid, so leave whatever is in the field there
            // user's keystroke produced an invalid value.

            // There is an issue with React that resets the selection (cursor) when a change is rejected.  Work around
            // this by manually setting the selection back.  Clear the state and set the selection once that's done.
            // (solution from http://stackoverflow.com/questions/22410767/insert-at-cursor-in-react)
            this.setState({}, function () {
                ReactDOM.findDOMNode(this).setSelectionRange(selection.start - 1, selection.end - 1);
            });
        }

        event.preventDefault();
    }

    onBlur(event) {
        // Add in any separators needed plus fill places past the decimal point with zeros
    }

    render() {
        var counter = 12;
        /* We could make this tag "type=number", but not all browsers support showing commas and
         decimal points in number inputs yet - plus you'll get the "up/down" scroll buttons, which
         I don't want either. */
        return (
            <input type="text" className="check-amount" id="check-amount" value={this.props.value}
                    onChange={this.onChange}/>
        )
    }

};


// Define propTypes and defaultProps as static members in ES6 so they can't be changed (immutable)
CurrencyInput.propTypes =  {
    allowNegatives: React.PropTypes.bool,
    maxDecimalPlaces: React.PropTypes.number,
    maxValue: React.PropTypes.number
};

CurrencyInput.defaultProps = {
    allowNegatives: true,
    maxDecimalPlaces: 2,
    maxValue: 999999999999.99
}




