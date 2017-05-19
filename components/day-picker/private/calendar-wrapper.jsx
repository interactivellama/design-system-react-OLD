/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

import MonthDayCalendar from './month-day-calendar';
import DaysAndWeeksCalendar from './days-and-weeks-calendar';
import Button from '../../../components/button';

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

	handleCalendarCancel = () => {
		if (this.props.onRequestClose) {
			this.props.onRequestClose();
		}
	};

	// done button - focus trap dialog
	handleLastFocusableNodeKeyDown = (event) => {
		if (!event.shiftKey && event.keyCode === KEYS.TAB) {
			EventUtil.trapEvent(event);
			this.setState({ isCalendarFocused: true });
		}
	};

	// cancel button
	handleFirstFocusableNodeKeyDown = (event) => {
		if (event.shiftKey && event.keyCode === KEYS.TAB) {
			EventUtil.trapEvent(event);
			this.setState({ isCalendarFocused: true });
		}
	};

	// focus trap dialog
	handleCalendarBlur = (event, { direction }) => {
		if (direction === 'previous' && this.closeAndSaveRef) {
			this.setState({ isCalendarFocused: false });
			this.closeAndSaveRef.focus();
		}
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
				className={classNames({
					'specific-date-picker__calendar-wrapper': this.props.variant === 'daysInMonth',
					'day-occurrence-picker__dropdown': this.props.variant === 'daysAndWeeks'
				}, this.props.className)}
				aria-hidden="false"
				data-selection="single"
				onKeyDown={this.handleKeyDown}
			>
				<div className="specific-date-picker__instructions">
					<h2 className="slds-text-body--regular">{this.props.variant === 'daysInMonth'
						? this.props.labels.selectDaysInMonth
						: null}</h2>
				</div>
				{this.props.variant === 'daysInMonth'
				? <MonthDayCalendar
					id={this.props.id}
					isIsoWeekday={this.props.isIsoWeekday}
					labels={this.props.labels}
					initialFocusDayInMonth={this.props.initialFocusDayInMonth}
					onCalendarBlur={this.handleCalendarBlur}
					onCalendarSubmit={this.props.onCalendarSubmit}
					onRequestInternalFocusDay={this.handleRequestInternalFocusDay}
					onSelectDay={this.props.onSelectDay}
					selectedDaysInMonth={this.props.selectedDaysInMonth}
					selectedDaysInMonthFromCalendar={this.props.selectedDaysInMonthFromCalendar}
					selectedDaysAndWeeks={this.props.selectedDaysAndWeeks}
					selectedDayRef={this.props.selectedDayRef}
					onLastFocusableNodeKeyDown={this.handleLastFocusableNodeKeyDown}
				/>
				: <DaysAndWeeksCalendar
					id={this.props.id}
					isIsoWeekday={this.props.isIsoWeekday}
					labels={this.props.labels}
					initialFocusDay={this.props.initialFocusDayInMonth}
					onCalendarBlur={this.handleCalendarBlur}
					onCalendarSubmit={this.props.onCalendarSubmit}
					onRequestInternalFocusDay={this.handleRequestInternalFocusDay}
					onSelectDay={this.props.onSelectDay}
					selectedDays={this.props.selectedDaysInMonth}
					selectedDaysFromCalendar={this.props.selectedDaysInMonthFromCalendar}
					selectedDayRef={this.props.selectedDayRef}
					onLastFocusableNodeKeyDown={this.handleLastFocusableNodeKeyDown}
				/>}

				<div className="specific-date-picker__done-button">
					<Button
						buttonRef={(component) => {
							this.cancelRef = component;
						}}
						label={this.props.labels.cancel}
						onClick={this.handleCalendarCancel}
						onKeyDown={this.handleFirstFocusableNodeKeyDown}
						variant="neutral"
					/>
					<Button
						buttonRef={(component) => {
							this.closeAndSaveRef = component;
						}}
						label={this.props.labels.closeAndSave}
						onClick={this.props.onCalendarSubmit}
						onKeyDown={this.handleLastFocusableNodeKeyDown}
						variant="neutral"
					/>
				</div>
			</div>
		);
	}
}

// 					onRequestClose={this.handleRequestClose}

export default DaypickerCalendarWrapper;
