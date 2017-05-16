/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */


import React, { PropTypes } from 'react';

import mapKeyEventCallbacks from '../../../utilities/key-callbacks';
import KEYS from '../../../utilities/key-code';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classNames from 'classnames';

const handleClick = (event, { day, onSelectDay, selected }) => {
	onSelectDay(event, { day, selected });
};

const handleKeyDown = (event, {
	events,
	day,
	selected
}) => {
	// Helper function that takes an object literal of callbacks that are triggered with a key event
	mapKeyEventCallbacks(event, {
		callbacks: {
			[KEYS.SPACE]: { callback: events.onSelectDay, data: { day, selected } },
			[KEYS.ENTER]: { callback: events.onSelectDay, data: { day, selected } },
			[KEYS.LEFT]: { callback: events.onKeyboardNavigateToPreviousDay, data: { day } },
			[KEYS.RIGHT]: { callback: events.onKeyboardNavigateToNextDay, data: { day } },
			[KEYS.UP]: { callback: events.onKeyboardNavigateToPreviousWeek, data: { day } },
			[KEYS.DOWN]: { callback: events.onKeyboardNavigateToNextWeek, data: { day } }
		},
		shiftCallbacks: {
			[KEYS.TAB]: { callback: events.onCalendarBlur, data: { direction: 'previous' } }
		}
	});
};

const DaypickerCalendarMonthDay = (props) => {
	return (
		<td
			aria-selected={props.selected}
			className={classNames({
				'slds-is-selected': props.selected,
				'slds-daypicker--last-day': props.day === -1
			}) || null}
			colSpan={props.day === -1 ? '2' : '1'}
			onClick={(event) => {
				handleClick(event, {
					day: props.day,
					onSelectDay: props.events.onSelectDay,
					selected: !!props.selected
				});
			}}
			onKeyDown={(event) => {
				handleKeyDown(event, {
					day: props.day,
					events: props.events,
					selected: props.selected
				});
			}}
			ref={(component) => {
				// if (props.selected) {
				// 	props.selectedDayRef(component);
				// }

				if (props.calendarHasFocus
					&& props.focusedDay === props.day) {
					props.events.onRequestInternalFocusDay(undefined, {
						day: props.day,
						ref: component
					});
				}
			}}
			role="gridcell"
			tabIndex={props.calendarHasFocus ? -1 : 0}
		>
			<span
				className={classNames(
					'slds-day', {
						'slds-daypicker--last-day': props.day === -1
					}
				)}
			>
				{props.day === -1 ? props.labels.lastDay : props.day}
			</span>
		</td>
	);
};

DaypickerCalendarMonthDay.displayName = 'SLDSDatepickerCalendarDay';

DaypickerCalendarMonthDay.propTypes = {
	/**
	 * If elements within the calendar have focus. This is helpful for keyboard event trapping.
	 */
	calendarHasFocus: PropTypes.bool.isRequired,
	/**
	 * Date of day
	 */
	day: PropTypes.number.isRequired,
	/**
	 * onCalendarBlur: Triggered when the keyboard moves focus off the calendar.
	 * onKeyboardNavigateToNextDay: For keyboard navigation. Changes the focus to the next day on the calendar. Triggered when right arrow button is pressed.
	 * onKeyboardNavigateToNextWeek: For keyboard navigation. Changes the focus to the same day in the next week on the calendar. Triggered when down arrow button is pressed.
	 * onKeyboardNavigateToPreviousDay: For keyboard navigation. Changes the focus to the previous day on the calendar. Triggered when left arrow button is pressed.
   * onKeyboardNavigateToPreviousWeek: For keyboard navigation. Changes the focus to the same day in the previous week on the calendar. Triggered when up arrow button is pressed.
	 * onRequestClose: Triggered when the calendar is cancelled.
   * onSelectDay: Triggered when a date on the calendar is clicked.
   */
	events: PropTypes.shape({
		onCalendarBlur: PropTypes.func.isRequired,
		onKeyboardNavigateToNextDay: PropTypes.func.isRequired,
		onKeyboardNavigateToNextWeek: PropTypes.func.isRequired,
		onKeyboardNavigateToPreviousDay: PropTypes.func.isRequired,
		onKeyboardNavigateToPreviousWeek: PropTypes.func.isRequired,
		onRequestClose: PropTypes.func,
		onSelectDay: PropTypes.func.isRequired
	}),
	/**
	 * Currently selected date. This should be present in the input field.
	 */
	selected: PropTypes.bool,
	/**
	 * Component reference / DOM node for selected day.
	 */
	selectedDayRef: PropTypes.func.isRequired
};

export default DaypickerCalendarMonthDay;
