/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '../utilities/dialog';
import CalendarWrapper from './private/calendar-wrapper';
import InputIcon from '../icon/input-icon';
import Input from '../forms/input';

import assign from 'lodash.assign';

import { shape } from 'airbnb-prop-types';

// ### isBoolean
import isBoolean from 'lodash.isboolean';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classNames from 'classnames';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

import EventUtil from '../../utilities/event';
import KEYS from '../../utilities/key-code';

import { DAY_PICKER } from '../../utilities/constants';

const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * `nextMonth`: Label for button to go to the next month _Tested with snapshot testing._
	 * * `openCalendar`: Call to action label for calendar dialog trigger _Tested with snapshot testing._
	 * * `previousMonth`: Label for button to go to the previous month _Tested with snapshot testing._
	 */
	assistiveText: shape({
		openCalendar: PropTypes.string
	}),
	/**
	 * Aligns the right or left side of the menu with the respective side of the trigger. _Tested with snapshot testing._
	 */
	align: PropTypes.oneOf(['left', 'right']),
	/**
	 * Pass in an `<Input />` component to customize it. Event handlers for the input (if needed) should be added here and not to this component. `<Input onKeyDown... />`.` _Tested with Mocha framework._
	 */
	children: PropTypes.node,
	/**
	 * CSS classes to be added to tag with `slds-datepicker`. If you are looking for the outer DOM node (slds-dropdown-trigger), please review `triggerClassName`. _Tested with snapshot testing._
	 */
	className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
	/**
	 * If true, constrains the menu to the scroll parent. Has no effect if `isInline` is `true`. _Not tested._
	 */
	constrainToScrollParent: PropTypes.bool,
	/**
	 * Disable input and calendar. _Tested with Mocha framework._
	 */
	disabled: PropTypes.bool,
	/**
	 *
	 */
	daysAndWeeks: PropTypes.arrayOf(PropTypes.object),
	// daysInMonth: { day: 1 }
	// daysAndWeeks: { day: SUN, week: 1 }
	/**
	 *
	 */
	daysInMonth: PropTypes.arrayOf(PropTypes.object),
	/* PropTypes.shape({
		week: PropTypes.number,
		day: PropTypes.string
	}), */
	/**
	 *
	 */
	dayDisabled: PropTypes.func,
	/**
	 * Date formatting function. _Tested with snapshot testing._
	 */
	formatter: PropTypes.func,
	/* Prevents the dropdown from changing position based on the viewport/window. If set to true your dropdowns can extend outside the viewport _and_ overflow outside of a scrolling parent. If this happens, you might want to consider making the dropdowns contents scrollable to fit the menu on the screen. _Not tested._
	*/
	hasStaticAlignment: PropTypes.bool,
	/**
	 * HTML id for component _Tested with snapshot testing._
	 */
	id: PropTypes.string,
	/**
	 * Renders menu within the wrapping trigger as a sibling of the input. By default, you will have an absolutely positioned container at an elevated z-index.
	 */
	isInline: PropTypes.bool,
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
	 * Forces the dropdown to be open or closed. See controlled/uncontrolled callback/prop pattern for more on suggested use view [Concepts and Best Practices](https://github.com/salesforce-ux/design-system-react/blob/master/CONTRIBUTING.md#concepts-and-best-practices)
	 */
	isOpen: PropTypes.bool,
	/**
	 * Makes Monday the first day of the week. _Tested with snapshot testing._
	 */
	isIsoWeekday: PropTypes.bool,
	/**
	 * Triggered when the user wants to focus on a new day with the keyboard. If the target node is a day it will return the keyboard event a data object with the shape: `{date: [Date object]}`. Event will be `null` when new month is re-rendered.  _Tested with Mocha framework._
	 */
	onCalendarFocus: PropTypes.func,
	/**
	 * Triggered when the date changes. `onChange` can be used for form validation if needed. It receives an event and a data object in the shape: `{date: [Date object], formattedDate: [string], timezoneOffset: [number]}`. `data.date` is Coordinated Universal Time (UTC), but the days of the calendar are in local time of the user. The `timezoneOffset` is the difference, in minutes, between UTC and the local time. Please note that this means that the offset is positive if the local timezone is behind UTC and negative if it is ahead. `timezoneOffset` is in minutes, for hours divide by `60`. _Tested with Mocha framework._
	 */
	onChange: PropTypes.func,
	/**
	 * Triggered when the calendar is closed. _Tested with Mocha framework._
	 */
	onClose: PropTypes.func,
	/**
	 * Triggered when the calendar has opened. _Tested with Mocha framework._
	 */
	onOpen: PropTypes.func,
	/**
	 * Function called when the calendar dialog would like hide. This will turn the calendar dialog into into a controlled component. Please use with `isOpen`. _Tested with Mocha framework._
	 */
	onRequestClose: PropTypes.func,
	/**
	 * Function called when the calendar dialog would like show. This will turn the calendar dialog into into a controlled component. Please use with `isOpen`. _Tested with Mocha framework._
	 */
	onRequestOpen: PropTypes.func,
	/**
	 * Absolutely positioned DOM nodes, such as a datepicker dialog, may need their own React DOM tree root. They may need their alignment "flipped" if extended beyond the window or outside the bounds of an overflow-hidden scrolling modal. This library's portal mounts are added as a child node of `body`. This prop will be triggered instead of the default `ReactDOM.mount()` when this dialog is mounted. This prop is useful for testing and simliar to a "callback ref." Two arguments,`reactElement` and `domContainerNode` are passed in. Consider the following code that bypasses the internal mount and uses an Enzyme wrapper to mount the React root tree to the DOM.
	 *
	 * ```
	 * <Datepicker
			isOpen
			portalMount={(reactElement, domContainerNode) => {
				portalWrapper = Enzyme.mount(reactElement, { attachTo: domContainerNode });
			}}
			onOpen={() => {
				expect(portalWrapper.find(`#my-heading`)).to.exist;
				done();
			}}
		/>
		```
	 * _Tested with Mocha framework._
	 */
	portalMount: PropTypes.func,
	/*
	 * Some languages have reversed word order for "First Monday".
	 */
	reverseOrdinalDayNames: PropTypes.bool,
	/**
	 * CSS classes to be added to tag with `slds-datepicker-trigger`. This is typically a wrapping `div` around the input. _Tested with snapshot testing._
	 */
	triggerClassName: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),

	variant: PropTypes.oneOf(['daysInMonth'])
};

const defaultProps = {
	align: 'left',
	assistiveText: {},
	formatter ({ days, labels, variant }) {
		let inputValue;
		if (variant === 'daysInMonth') {
			const items = days.map((item) => `${item.day}`);
			inputValue = items.length ? items.sort((a, b) => a - b).join(', ') : '';
		} else {
			const items = days.map((item) => `${item.week}${item.day}`);
			inputValue = items.length ? items.join(', ') : '';
		}
		return inputValue;
	},
	initialFocusDayInMonth: 1,
	labels: {
		abbreviatedWeekDay: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		closeAndSave: 'Done',
		lastDay: 'Last Day',
		months: [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		],
		abbreviatedOrdinalWeek: ['1st', '2nd', '3rd', '4th'],
		// Last is supported by iCal RRULE, but is not included here
		ordinalWeek: ['First', 'Second', 'Third', 'Fourth'],
		placeholder: '1, 2, 3...Last Day',
		selectDates: 'Select one or more days of the month:',
		weekDays: [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday'
		]
	},
	parser: ({ inputValue, labels }) =>
		inputValue.replace(labels.lastDay.toLowerCase(), '-1')
		.split(',')
		.map((day) => ({ day })),
	selectedDaysAndWeeks: [],
	selectedDaysInMonth: []
};

/**
 * A day picker is an input form element. You can select a single day from a popup or inline calendar. The date picker supplied by this library comes with an input by default, but other components could be passed in as children--however, pairing with other components is untested.
 *
 * This component is wrapped in a [higher order component to listen for clicks outside itself](https://github.com/kentor/react-click-outside) and thus requires use of `ReactDOM`.
 *
 * This component may use a portalMount (a disconnected React subtree mount) within an absolutely positioned DOM node created with [Drop](http://github.hubspot.com/drop/).
 */
class DayPicker extends React.Component {
	constructor (props) {
		super(props);

		this.getId = this.getId.bind(this);
		this.getIsOpen = this.getIsOpen.bind(this);
		this.handleCalendarChange = this.handleCalendarChange.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.handleRequestClose = this.handleRequestClose.bind(this);
		this.openDialog = this.openDialog.bind(this);
		this.getInlineMenu = this.getInlineMenu.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleOpen = this.handleOpen.bind(this);
		this.getDialog = this.getDialog.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);

		this.state = {
			isOpen: false
		};
	}

	componentWillMount () {
		this.generatedId = shortid.generate();
	}

	getId () {
		return this.props.id || this.generatedId;
	}
	
	getIsOpen () {
		return !!(isBoolean(this.props.isOpen) ? this.props.isOpen : this.state.isOpen);
	}

	handleCalendarChange (event, { day, selected }) {
		if (this.props.onChange) {
			this.props.onChange(event, {
				day,
				selected
			});
		}
	}

	handleClickOutside () {
		this.handleRequestClose();
	}

	handleRequestClose () {
		if (this.props.onRequestClose) {
			this.props.onRequestClose();
		}

		if (this.getIsOpen()) {
			this.setState({ isOpen: false });
		}

		if (this.inputRef) {
			this.inputRef.focus();
		}
	}

	openDialog () {
		if (this.props.onRequestOpen) {
			this.props.onRequestOpen();
		} else {
			this.setState({ isOpen: true });
		}
	}

	handleClose () {
		if (this.props.onClose) {
			this.props.onClose();
		}
	}

	handleOpen () {
		if (this.props.onOpen) {
			this.props.onOpen();
		}

		if (this.selectedDayCell) {
			this.selectedDayCell.focus();
		}
	}

	getInlineMenu ({ calendarRenderer }) {
		return !this.props.disabled && this.getIsOpen()
		? <div
			className={classNames('slds-datepicker',
				'slds-dropdown',
				`slds-dropdown--${this.props.align}`,
			this.props.className)}
		>
			{calendarRenderer}
		</div>
		: null;
	}

	getDialog ({ calendarRenderer }) {
		return !this.props.disabled && this.getIsOpen()
			? <Dialog
				contentsClassName="slds-datepicker slds-dropdown"
				constrainToScrollParent={this.props.constrainToScrollParent}
				horizontalAlign={this.props.align}
				flippable={!this.props.hasStaticAlignment}
				onClose={this.handleClose}
				onOpen={this.handleOpen}
				portalMount={this.props.portalMount}
				targetElement={this.inputRef}
			>
				{calendarRenderer}
			</Dialog>
			: null;
	}

	handleInputChange (event) {
		const daysInMonth = this.props.parser({
			inputValue: event.target.value,
			labels: this.props.labels
		}) || null;

		if (this.props.onChange) {
			this.props.onChange(event, {
				daysInMonth
			});
		}
	}

	handleKeyDown (event) {
		// Don't open if user is selecting text
		if (event.keyCode
				&& !event.shiftKey
				&& (event.keyCode === KEYS.DOWN || event.keyCode === KEYS.UP)) {
			EventUtil.trapEvent(event);
			this.setState({ isOpen: true });
		}
	}

	renderCalendar ({ labels }) {

		return (
			<CalendarWrapper
				labels={labels}
				id={this.getId()}
				initialFocusDayInMonth={this.props.initialFocusDayInMonth}
				isIsoWeekday={this.props.isIsoWeekday}
				onCalendarFocus={this.props.onCalendarFocus}
				onRequestClose={this.handleRequestClose}
				onSelectDay={this.handleCalendarChange}
				ref={() => {
					// since it's inline, there is no callback except on render
					if (this.props.isInline) {
						this.handleOpen();
					}
				}}
				selectedDaysInMonth={this.props.selectedDaysInMonth}
				selectedDaysAndWeeks={this.props.selectedDaysAndWeeks}
				selectedDayRef={(component) => { this.selectedDayCell = component; }}
				variant={this.props.variant}
			/>
		);
	}

	render () {
		// Merge objects of strings with their default object
		const labels = assign({}, defaultProps.labels, this.props.labels);
		const assistiveText = assign({}, defaultProps.assistiveText, this.props.assistiveText);

		const clonedInputProps = {
			disabled: (this.props.children && !!this.props.children.props.disabled) || this.props.disabled,
			iconRight: (this.props.children && !!this.props.children.props.iconRight) || (<InputIcon
				// Remove || for assistiveText at next breaking change
				assistiveText={assistiveText.openCalendar}
				aria-haspopup
				aria-expanded={this.getIsOpen()}
				category="utility"
				name="event"
				onClick={this.openDialog}
			/>),
			id: this.getId(),
			inputRef: (component) => { this.inputRef = component; },
			label: labels.label,
			onBlur: (this.props.children && this.props.children.props.onBlur) || this.props.onBlur, // eslint-disable-line react/prop-types
			onChange: this.handleInputChange,
			onClick: () => {
				this.openDialog();
				if (this.props.children && this.props.children.props.onClick) {
					this.props.children.props.onClick();
				}
			},
			onFocus: (this.props.children && this.props.children.props.onFocus) || this.props.onFocus, // eslint-disable-line react/prop-types
			onKeyDown: (this.props.children && this.props.children.props.onKeyDown) || this.handleKeyDown,
			placeholder: (this.props.children && this.props.children.props.placeholder)
				|| labels.placeholder,
			required: (this.props.children && this.props.children.props.required) || this.props.required, // eslint-disable-line react/prop-types
			value: (this.props.children && this.props.children.props.value)
				|| this.props.formatter({
					days: this.props.variant === 'daysInMonth' ? this.props.selectedDaysInMonth : this.props.selectedDaysAndWeeks,
					labels,
					variant: this.props.variant }

				)
		};

		const clonedInput = this.props.children ? React.cloneElement(this.props.children, {
			...clonedInputProps
		})
		: (<Input
			{...clonedInputProps}
		/>);

		return (
			<div
				className={classNames(
					'slds-dropdown-trigger',
					'slds-dropdown-trigger--click',
					'ignore-react-onclickoutside', {
						'slds-is-open': this.getIsOpen()
					},
					this.props.triggerClassName
				)}
			>
				{clonedInput}
				{this.props.isInline
					? this.getInlineMenu({ calendarRenderer: this.renderCalendar({ labels }) })
					: this.getDialog({ calendarRenderer: this.renderCalendar({ labels }) })}
			</div>
		);
	}
}

DayPicker.displayName = DAY_PICKER;
DayPicker.propTypes = propTypes;
DayPicker.defaultProps = defaultProps;

export default DayPicker;
