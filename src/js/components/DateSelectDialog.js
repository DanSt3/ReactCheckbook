import React, { Component } from "react"
import ReactDOM from "react-dom"
import update from "react-addons-update";

import Modal from "./Modal.js";

export default class DateSelectDialog extends Component {
    
    constructor(props) {
        super();
        this.portalElement = null;
        this.modal = null;
        this.daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        this.locale = window.navigator.userLanguage || window.navigator.language;
        this.state = {
            monthOnDisplay: props.selectedDate
        }
    }

    showDateSelectDialog() {
        this.modal.showModal();
    }

    hideDateSelectDialog() {
        this.modal.hideModal();
    }

    onNextMonth() {

    }

    createDayElement(day, isCurrentMonth) {
        return <td className={(isCurrentMonth) ? 
            "date-selector-day-this-month" : "date-selector-day-other-month"}>{day}</td>
    }

    createDateElements() {
        let dayElements = [];
        for (let day = 29; day <= 31; day++ ) {
            dayElements.push(this.createDayElement(day, false));
        }
        for (let day = 1; day <= 30; day++) {
            dayElements.push(this.createDayElement(day, true));
        }
        for (let day =  1; day <= 2; day++) {
            dayElements.push(this.createDayElement(day, false));
        }
        return dayElements;
    }

    createDateRows() {
        let rowElements = [];
        const dayElements = this.createDateElements();
        let elementIndex = 0;
        while(elementIndex < dayElements.length) {
            let days = [];
            for (let index = 0; index < 7; index++) {
                days.push(dayElements[elementIndex++]);
            }
        rowElements.push(<tr>{days}</tr>);
        }
        return rowElements;
    }

    render() {
        return null;
    }

    componentDidMount() {
        var p = this.props.portalId && document.getElementById(this.props.portalId);
        if (!p) {
            var p = document.createElement('div');
            if (this.props.portalId) {
                p.id = this.props.portalId;
            }
            document.body.appendChild(p);
        }

        this.portalElement = p;
        this.componentDidUpdate();
    }

    componentWillUnmount() {
        document.body.removeChild(this.portalElement);
    }

    componentDidUpdate() {
        alert("componentDidUpadate called");
        const formattedMonth = this.state.monthOnDisplay.toLocaleString(this.locale, { month: "long", year: "numeric" });
        const dayOfWeekElements = this.daysOfWeek.map(dayOfWeek => <th>{dayOfWeek}</th>)
        const dayElements = this.createDateRows();
        this.modal = ReactDOM.render(
            <Modal>
                <div className="date-selector-dialog">
                    <table className="date-selector-table">
                        <thead>
                            <tr>
                                <th className="date-selector-prev-month" colSpan="1" onClick="">&lt;</th>
                                <th className="date-selector-month-label" colSpan="5">{formattedMonth}</th>
                                <th className="date-selector-next-month" colSpan="1">&gt;</th>
                            </tr>
                        <tr>
                            {dayOfWeekElements}
                        </tr>
                    </thead>
                    <tbody>
                        {dayElements}
                    </tbody>
                </table>
                </div>
        </Modal>,
            this.portalElement
        );
    }
            
};


DateSelectDialog.propTypes = {
    ref: React.PropTypes.object,
    selectedDate: React.PropTypes.instanceOf(Date)
};

DateSelectDialog.defaultProps = {
    selectedDate: new Date()
};

    
    