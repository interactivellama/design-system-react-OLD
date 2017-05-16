/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */


import React from 'react';
import PropTypes from 'prop-types';

import Day from './month-day';

// import DateUtil from '../../../utilities/date';

import { shape } from 'airbnb-prop-types';

const DayPickerCalendar = React.createClass({
	displayName: 'SLDSDaypickerCalendar',

	propTypes: {
		/**
		 * HTML id for component
		 */
		id: PropTypes.string.isRequired,
		initialFocusDayInMonth: PropTypes.number,
		/**
		 * Makes Monday the first day of the week
		 */
		isIsoWeekday: PropTypes.bool,
		/**
		 * **Text labels for internationalization**
		 * This object is merged with the default props object on every render.
		 * * `abbreviatedWeekDays`: Three letter abbreviations of the days of the week, starting on Sunday. _Tested with snapshot testing._
		 * * `months`: Names of the months. _Tested with snapshot testing._
		 * * `label`: This label appears above the input.
		 * * `placeholder`: Placeholder text for input. _Tested with snapshot testing._
		 * * `today`: Label of shortcut to jump to today within the calendar. This is also used for assistive text on today's date. _Tested with snapshot testing._
		 * * `weekDays`: Full names of the seven days of the week, starting on Sunday. _Tested with snapshot testing._
		 */
		labels: shape({
			abbreviatedWeekDays: PropTypes.array,
			label: PropTypes.string,
			months: PropTypes.array,
			placeholder: PropTypes.string,
			selectDaysInMonth: PropTypes.sting,
			today: PropTypes.string,
			weekDays: PropTypes.array
		}),
		/**
		 * Triggered when the keyboard moves focus off the calendar.
		 */
		onCalendarBlur: PropTypes.func.isRequired,
		/**
		 * Internal callback that will eventually trigger when the keyboard moves focus on the calendar. `{date: [Date object], formattedDate: [string]}`.
		 */
		onRequestInternalFocusDate: PropTypes.func,
		/**
		 * Triggered when the calendar is cancelled.
		 */
		onRequestClose: PropTypes.func,
		/**
		 * Triggered when a date on the calendar is clicked.
		 */
		onSelectDay: PropTypes.func.isRequired,
		/**
		 * Currently selected days
		 */
		selectedDaysInMonth: PropTypes.arrayOf(PropTypes.object),
		selectedDaysAndWeeks: PropTypes.arrayOf(PropTypes.object),
		/**
		 * Component reference / DOM node for selected day.
		 */
		selectedDateRef: PropTypes.func,
		/**
		 * For keyboard navigation. Listens for key presses on the last focusable DOM Node, so that dialog focus can be trapped.
		 */
		onLastFocusableNodeKeyDown: PropTypes.func
	},

	getInitialState () {
		return {
			focusedDay: this.props.initialFocusDayInMonth,
			calendarHasFocus: true
		};
	},

	handleSelectDay (event, { day, selected }) {
		this.setState({
			selected: day,
			focusedDay: day
		});

		this.props.onSelectDay(event, { day, selected });
	},

	handleRequestClose () {
		if (this.props.onRequestClose) {
			this.props.onRequestClose();
		}
	},

	handleKeyboardNavigateToPreviousDay (event, { day }) {
		let prevDay;
		if (day === -1) {
			prevDay = 31;
		} else {
			prevDay = day - 1;
		}

		if (prevDay > 0) {
			this.setState({ focusedDay: prevDay });
			this.props.onRequestInternalFocusDay(event, { day: prevDay, triggerCallback: true });
		}
	},

	handleKeyboardNavigateToNextDay (event, { day }) {
		let nextDay;
		const lastDay = -1;
		if (day === 31) {
			nextDay = lastDay;
		} else {
			nextDay = day + 1;
		}

		if (nextDay <= 31) {
			this.setState({ focusedDay: nextDay });
			this.props.onRequestInternalFocusDay(event, { date: nextDay, triggerCallback: true });
		}
	},

	handleKeyboardNavigateToPreviousWeek (event, { day }) {
		let prevDay;
		if (day === -1) {
			prevDay = 25;
		} else {
			prevDay = day - 7;
		}

		if (prevDay > 0) {
			this.setState({ focusedDay: prevDay });
			this.props.onRequestInternalFocusDay(event, { date: prevDay, triggerCallback: true });
		}
	},

	handleKeyboardNavigateToNextWeek (event, { day }) {
		let nextDay;
		const lastDay = -1;
		if (day === 25) {
			nextDay = lastDay;
		} else {
			nextDay = day + 7;
		}

		if (nextDay <= 31) {
			this.setState({ focusedDay: nextDay });
			this.props.onRequestInternalFocusDay(event, { date: nextDay, triggerCallback: true });
		}
	},

	renderWeeks (weekNumber) {
		const days = [];
		const maximunDaysInAMonth = 31;
		const maximunWeeksInAMonth = 5;
		let day;

		const events = {
			onCalendarBlur: this.props.onCalendarBlur,
			onKeyboardNavigateToNextDay: this.handleKeyboardNavigateToNextDay,
			onKeyboardNavigateToNextWeek: this.handleKeyboardNavigateToNextWeek,
			onKeyboardNavigateToPreviousDay: this.handleKeyboardNavigateToPreviousDay,
			onKeyboardNavigateToPreviousWeek: this.handleKeyboardNavigateToPreviousWeek,
			onRequestClose: this.props.onRequestClose,
			onRequestInternalFocusDay: this.props.onRequestInternalFocusDay,
			onSelectDay: this.handleSelectDay
		};

		const isSelected = (item) => item.day === day;

		for (let i = 0; i < 7; i++) {
			day = (weekNumber * 7) + (i + 1);
			
			if (day <= maximunDaysInAMonth) {
				days.push(<Day
					calendarHasFocus={this.state.calendarHasFocus}
					day={day}
					events={events}
					focusedDay={this.state.focusedDay}
					key={`${this.props.id}day-${day}`}
					labels={this.props.labels}
					selected={this.props.selectedDaysInMonthFromCalendar.some(isSelected)}
					selectedDayRef={this.props.selectedDayRef}
				/>);
			}
		}

		if (weekNumber === maximunWeeksInAMonth - 1) {
			days.push(<Day
				calendarHasFocus={this.state.calendarHasFocus}
				day={-1}
				events={events}
				focusedDay={this.state.focusedDay}
				key={`${this.props.id}day-last-day`}
				labels={this.props.labels}
				selected={this.props.selectedDaysInMonthFromCalendar.some((item) => item.day === -1)}
				selectedDayRef={this.props.selectedDayRef}
			/>);
		}

		return (<tr
			className="specific-date-picker__date-row"
			key={`${this.props.id}-week-${weekNumber}`}
		>{days}</tr>);
	},

	render () {
		const weeks = [];

		for (let i = 0; i < 5; i++) {
			weeks.push(this.renderWeeks(i));
		}

		return (
			<div
				className="calendar"
			>
				<table className="datepicker__month" role="grid" aria-labelledby={`${this.props.id}-month`}>
					<tbody>
						{weeks}
					</tbody>
				</table>
			</div>
		);
	}
});

export default DayPickerCalendar;
