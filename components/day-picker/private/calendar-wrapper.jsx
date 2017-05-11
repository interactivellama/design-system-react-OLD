/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

import MonthDayCalendar from './month-day-calendar';

import EventUtil from '../../../utilities/event';
import KEYS from '../../../utilities/key-code';

import { shape } from 'airbnb-prop-types';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classNames from 'classnames';

class DaypickerCalendarWrapper extends React.Component {
	static displayName = 'SLDSDaypickerCalendarWrapper';

	static propTypes = {
		/**
		 * CSS classes to be added to tag with `slds-datepicker`.
		 */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
		 * HTML id for component
		 */
		id: PropTypes.string,
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
			today: PropTypes.string,
			weekDays: PropTypes.array
		}),
		/**
		 * Triggered when the keyboard moves focus on the calendar. {date: [Date object], formattedDate: [string]}  _Tested with Mocha framework._
		 */
		onCalendarFocus: PropTypes.func,
		/**
		 * Triggered when the calendar is supposed to close.
		 */
		onRequestClose: PropTypes.func.isRequired,
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
		selectedDayRef: PropTypes.func
	};

	static defaultProps = {
		selectedDay: []
	};

	state = {
		isCalendarFocused: true
	};

	handleRequestClose = () => {
		if (this.props.onRequestClose) {
			this.props.onRequestClose();
		}
	};

	handleLastFocusableNodeKeyDown = (event) => {
		if (!event.shiftKey && event.keyCode === KEYS.TAB) {
			EventUtil.trapEvent(event);
			this.setState({ isCalendarFocused: true });
		}
	};

	handleFirstFocusableNodeKeyDown = (event) => {
		if (event.shiftKey && event.keyCode === KEYS.TAB) {
			EventUtil.trapEvent(event);
			this.setState({ isCalendarFocused: true });
		}
	};

	handleCalendarBlur = (event, { direction }) => {
		console.log('blur calendar');
		// if (direction === 'next' && this.previousMonthRef) {
		// 	this.setState({ isCalendarFocused: false });
		// 	if (this.props.onCalendarFocus) {
		// 		this.props.onCalendarFocus(event, { direction, isCalendarFocused: false, ref: this.previousMonthRef });
		// 	}
		// 	this.previousMonthRef.focus();
		// } else if (direction === 'previous' && this.todayRef) {
		// 	this.setState({ isCalendarFocused: false });
		// 	if (this.props.onCalendarFocus) {
		// 		this.props.onCalendarFocus(event, { direction, isCalendarFocused: false, ref: this.todayRef });
		// 	}
		// 	this.todayRef.focus();
		// }
	};

	handleRequestInternalFocusDay = (event, data) => {
		// will be called three times, due to re-render
		if (data.ref && this.state.isCalendarFocused) {
			data.ref.focus();
		}

		// only call on actual DOM event and not on re-render
		if (this.props.onCalendarFocus && data.triggerCallback) {
			const { triggerCallback, ...modifiedData } = data;	// eslint-disable-line no-unused-vars
			this.props.onCalendarFocus(event, modifiedData);
		}
	};

	handleKeyDown = (event) => {
		if (event.keyCode === KEYS.ESCAPE) {
			EventUtil.trapEvent(event);
			this.props.onRequestClose(event);
		}
	};

	render () {
		return (
			<div // eslint-disable-line jsx-a11y/no-static-element-interactions
				className={classNames(this.props.className)}
				aria-hidden="false"
				data-selection="single"
				onKeyDown={this.handleKeyDown}
			>
				{this.props.variant === 'daysInMonth'
				? <MonthDayCalendar
					id={this.props.id}
					isIsoWeekday={this.props.isIsoWeekday}
					labels={this.props.labels}
					initialFocusDayInMonth={this.props.initialFocusDayInMonth}
					onCalendarBlur={this.handleCalendarBlur}
					onRequestClose={this.handleRequestClose}
					onRequestInternalFocusDay={this.handleRequestInternalFocusDay}
					onSelectDay={this.props.onSelectDay}
					selectedDaysInMonth={this.props.selectedDaysInMonth}
					selectedDaysAndWeeks={this.props.selectedDaysAndWeeks}
					selectedDayRef={this.props.selectedDayRef}
					todayRef={(component) => {
						this.todayRef = component;
					}}
					onLastFocusableNodeKeyDown={this.handleLastFocusableNodeKeyDown}
				/>
				: null}
			</div>
		);
	}
}

export default DaypickerCalendarWrapper;
