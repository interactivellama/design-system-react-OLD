/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '../utilities/dialog';
import CalendarWrapper from './private/calendar-wrapper';
import InnerInput from '../../components/forms/input/private/inner-input';
import InputIcon from '../icon/input-icon';
import Pill from '../../components/day-picker/private/pill';

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
import mapKeyEventCallbacks from '../../utilities/key-callbacks';

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
	onCalendarChange: PropTypes.func,
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
	onRequestRemoveDay: PropTypes.func,
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

	variant: PropTypes.oneOf(['daysInMonth', 'weeksAndDays'])
};

const defaultProps = {
	align: 'left',
	assistiveText: {},
	initialFocusDayInMonth: 1,
	labels: {
		abbreviatedWeekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		cancel: 'cancel',
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
		abbreviatedOrdinalWeeks: ['1st', '2nd', '3rd', '4th'],
		// Last is supported by iCal RRULE, but is not included here
		ordinalWeeks: ['First', 'Second', 'Third', 'Fourth'],
		placeholder: 'Pick day(s)',
		selectDaysInMonth: 'Select day(s) of the month:',
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
		inputValue.replace(labels.lastDay.toLowerCase(), '-1'),
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
		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleInputSubmit = this.handleInputSubmit.bind(this);
		this.handleKeyDownDown = this.handleKeyDownDown.bind(this);
		this.handleRequestClose = this.handleRequestClose.bind(this);
		this.openDialog = this.openDialog.bind(this);
		this.getInlineMenu = this.getInlineMenu.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleOpen = this.handleOpen.bind(this);
		this.getDialog = this.getDialog.bind(this);

		this.state = {
			isOpen: false,
			selectedDaysInMonthFromCalendar: [],
			selectedWeeksAndDayFromCalendar: []
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
			this.setState({
				isOpen: true,
				selectedDaysInMonthFromCalendar: this.props.selectedDaysInMonth,
				selectedWeeksAndDayFromCalendar: this.props.selectedDaysAndWeeks
			});
		}
	}

	handleSelectDay = (event, data) => {
		const newDaysInMonth = data.selected
			? this.state.selectedDaysInMonthFromCalendar.filter((item) => item.day !== data.day)
			: this.state.selectedDaysInMonthFromCalendar.concat(data);
		this.setState({ selectedDaysInMonthFromCalendar: newDaysInMonth });
	};

	handleCalendarSubmit = () => {
		this.handleRequestClose();

		const selectedDaysInMonth = this.state.selectedDaysInMonthFromCalendar;
		if (this.props.onRequestClose) {
			this.props.onRequestClose();
		}
		if (this.props.onCalendarSubmit) {
			this.props.onCalendarSubmit(null, {
				selectedDaysInMonth
			});
		}
	};

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

	handleKeyDown (event, { events }) {
		// Helper function that takes an object literal of callbacks that are triggered with a key event
		mapKeyEventCallbacks(event, {
			callbacks: {
				[KEYS.ENTER]: { callback: this.handleInputSubmit },
				[KEYS.DOWN]: { callback: this.handleKeyDownDown }
			}
		});
	}

	handleKeyDownDown (event) {
		// Don't open if user is selecting text
		if (!event.shiftKey) {
			this.openDialog();
		}
	}

	handleInputSubmit (event) {
		// test if valid number
		if (this.props.onInputSubmit
			&& !isNaN(event.target.value)
			&& Number(event.target.value) >= 1
			&& Number(event.target.value) <= 31) {
			this.props.onInputSubmit(event, {
				selectedDayInMonth: {
					day: Number(event.target.value)
				}
			});
		}
		// clear input
		this.inputRef.value = '';
	}

	renderCalendar ({ labels }) {
		return (
			<CalendarWrapper
				labels={labels}
				id={this.getId()}
				initialFocusDayInMonth={this.props.initialFocusDayInMonth}
				isIsoWeekday={this.props.isIsoWeekday}
				onCalendarFocus={this.props.onCalendarFocus}
				onCalendarSubmit={this.handleCalendarSubmit}
				onCalendarCancel={this.props.onCalendarCancel}
				onRequestClose={this.handleRequestClose}
				onSelectDay={this.handleSelectDay}
				ref={() => {
					// since it's inline, there is no callback except on render
					if (this.props.isInline) {
						this.handleOpen();
					}
				}}
				selectedDaysInMonth={this.props.selectedDaysInMonth}
				selectedDaysInMonthFromCalendar={this.state.selectedDaysInMonthFromCalendar}
				selectedDaysAndWeeks={this.props.selectedDaysAndWeeks}
				selectedDayRef={(component) => { this.selectedDayCell = component; }}
				variant={this.props.variant}
			/>
		);
	}

	render () {
		const props = this.props;

		// Merge objects of strings with their default object
		const assistiveText = assign({}, defaultProps.assistiveText, props.assistiveText);
		const labels = assign({}, defaultProps.labels, props.labels);

		/* eslint-disable jsx-a11y/role-supports-aria-props */
		return (
			<div
				className={classNames(
					'slds-dropdown-trigger',
					'slds-dropdown-trigger--click',
					'ignore-react-onclickoutside', {
						'slds-is-open': this.getIsOpen()
					},
					props.triggerClassName
				)}
			>
				<div className="slds-form-element__control">
					<div className="slds-combobox_container slds-has-inline-listbox">
						<ul id="listbox-unique-id" className="slds-listbox slds-listbox--inline" role="listbox" aria-orientation="horizontal" aria-label="Selected Options:">
							{props.selectedDaysInMonth.length
								? props.selectedDaysInMonth.map((item) =>
									<li
										role="presentation"
										className="slds-listbox__item"
										key={`${this.getId()}-list-item-${item.day}`}
									>
										<Pill
											eventData={{ day: item.day }}
											labels={{
												label: item.day === -1
													? this.props.labels.lastDay
													: String(item.day)
											}}
										/>
									</li>
								)
								: null}
						</ul>
						<div className="slds-combobox">
							<InnerInput
								aria-controls="listbox-unique-id"
								className="slds-combobox__input"
								containerClassName="slds-combobox__form-element"
								disabled={props.disabled}
								iconRight={<InputIcon
									assistiveText={assistiveText.openCalendar}
									aria-haspopup
									aria-expanded={this.getIsOpen()}
									category="utility"
									name="event"
									onClick={this.openDialog}
								/>}
								id={this.getId()}
								placeholder={labels.placeholder}
								onKeyDown={this.handleKeyDown}
								inputRef={(component) => { this.inputRef = component; }}
								
								onClick={() => {
									this.openDialog();
								}}
							/>
						</div>
					</div>
				</div>
				{this.props.isInline
					? this.getInlineMenu({ calendarRenderer: this.renderCalendar({ labels }) })
					: this.getDialog({ calendarRenderer: this.renderCalendar({ labels }) })}
			</div>
		);
	}
}
/* eslint-enable jsx-a11y/role-supports-aria-props */

DayPicker.displayName = DAY_PICKER;
DayPicker.propTypes = propTypes;
DayPicker.defaultProps = defaultProps;

export default DayPicker;
