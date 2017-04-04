'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _week = require('./week');

var _week2 = _interopRequireDefault(_week);

var _date = require('../../../utilities/date');

var _date2 = _interopRequireDefault(_date);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DatepickerCalendar = _react2.default.createClass({
	displayName: 'SLDSDatepickerCalendar',

	propTypes: {
		/**
   * Three letter abbreviations of the days of the week, starting on Sunday.
   */
		abbreviatedWeekDayLabels: _react.PropTypes.array.isRequired,
		/**
   * dateDisabled() takes a date as input argument, returns true if given date should be disabled, otherwise returns false.
   */
		dateDisabled: _react.PropTypes.func,
		/**
   * HTML id for component
   */
		id: _react.PropTypes.string.isRequired,
		/**
     * Date used to create calendar that is displayed. This is typically the initial day focused when using the keyboard navigation. Focus will be set to this date if available.
     */
		initialDateForCalendarRender: _react.PropTypes.instanceOf(Date).isRequired,
		/**
   * Makes Monday the first day of the week
   */
		isIsoWeekday: _react.PropTypes.bool,
		/**
   * Triggered when the keyboard moves focus off the calendar.
   */
		onCalendarBlur: _react.PropTypes.func.isRequired,
		/**
   * Displayed calendar has changed or re-rendered
   */
		onChangeMonth: _react.PropTypes.func.isRequired,
		/**
   * Internal callback that will eventually trigger when the keyboard moves focus on the calendar. `{date: [Date object], formattedDate: [string]}`.
   */
		onRequestInternalFocusDate: _react.PropTypes.func,
		/**
   * Triggered when the calendar is cancelled.
   */
		onRequestClose: _react.PropTypes.func.isRequired,
		/**
   * Triggered when a date on the calendar is clicked.
   */
		onSelectDate: _react.PropTypes.func.isRequired,
		/**
   * Currently selected date. This should be present in the input field.
   */
		selectedDate: _react.PropTypes.instanceOf(Date),
		/**
   * Component reference / DOM node for selected day.
   */
		selectedDateRef: _react.PropTypes.func,
		/**
   * Label of shortcut to jump to today within the calendar. This is also used for assistive text on today's date.
   */
		todayLabel: _react.PropTypes.string.isRequired,
		/**
   * For keyboard navigation. Listens for key presses on the last focusable DOM Node, the "Today" link, so that dialog focus can be trapped.
   */
		onLastFocusableNodeKeyDown: _react.PropTypes.func,
		/**
   * Callback that passes in the DOM reference of the Today `a` DOM node within this component. Primary use is to allow `focus` to be called. You should still test if the node exists, since rendering is asynchronous. `buttonRef={(component) => { if(component) console.log(component); }}`
   */
		todayRef: _react.PropTypes.func,
		/**
   * Names of the seven days of the week, starting on Sunday.
   */
		weekDayLabels: _react.PropTypes.array.isRequired
	},

	getInitialState: function getInitialState() {
		return {
			focusedDate: this.props.initialDateForCalendarRender,
			calendarHasFocus: true,
			todayFocus: false
		};
	},
	componentDidUpdate: function componentDidUpdate(prevProps) {
		this.setCalendarRenderSeedDate(prevProps);
	},
	setCalendarRenderSeedDate: function setCalendarRenderSeedDate(prevProps) {
		// Set prop that sets focus in child component once it is rendered. This occurs when the month DOM has changed. This will trigger a re-render, but no DOM change will occur, just a DOM focus.
		if (!_date2.default.isEqual(this.props.initialDateForCalendarRender, prevProps.initialDateForCalendarRender)) {
			this.setState({ focusedDate: this.props.initialDateForCalendarRender });
			this.props.onRequestInternalFocusDate(undefined, { date: this.props.initialDateForCalendarRender, triggerCallback: true });
		}
	},
	handleSelectDate: function handleSelectDate(event, _ref) {
		var date = _ref.date;

		if (!this.props.dateDisabled({ date: date })) {
			this.setState({ selected: date });
			this.props.onSelectDate(event, { date: date });
		}
	},
	handleRequestClose: function handleRequestClose() {
		if (this.props.onRequestClose) {
			this.props.onRequestClose();
		}
	},
	handleKeyboardNavigateToPreviousDay: function handleKeyboardNavigateToPreviousDay(event, _ref2) {
		var date = _ref2.date;

		var prevDate = _date2.default.addDays(date, -1);
		if (!_date2.default.isSameMonth(prevDate, date)) {
			this.props.onChangeMonth(event, prevDate);
		} else {
			this.setState({ focusedDate: prevDate });
			this.props.onRequestInternalFocusDate(event, { date: prevDate, triggerCallback: true });
		}
	},
	handleKeyboardNavigateToNextDay: function handleKeyboardNavigateToNextDay(event, _ref3) {
		var date = _ref3.date;

		var nextDate = _date2.default.addDays(date, 1);
		if (!_date2.default.isSameMonth(nextDate, date)) {
			this.props.onChangeMonth(event, nextDate);
		} else {
			this.setState({ focusedDate: nextDate });
			this.props.onRequestInternalFocusDate(event, { date: nextDate, triggerCallback: true });
		}
	},
	handleKeyboardNavigateToPreviousWeek: function handleKeyboardNavigateToPreviousWeek(event, _ref4) {
		var date = _ref4.date;

		var prevDate = _date2.default.addDays(date, -7);
		if (!_date2.default.isSameMonth(prevDate, date)) {
			this.props.onChangeMonth(event, prevDate);
		} else {
			this.setState({ focusedDate: prevDate });
			this.props.onRequestInternalFocusDate(event, { date: prevDate, triggerCallback: true });
		}
	},
	handleKeyboardNavigateToNextWeek: function handleKeyboardNavigateToNextWeek(event, _ref5) {
		var date = _ref5.date;

		var nextDate = _date2.default.addDays(date, 7);
		if (!_date2.default.isSameMonth(nextDate, date)) {
			this.props.onChangeMonth(event, nextDate);
		} else {
			this.setState({ focusedDate: nextDate });
			this.props.onRequestInternalFocusDate(event, { date: nextDate, triggerCallback: true });
		}
	},
	render: function render() {
		var _this = this;

		var sunday = _react2.default.createElement(
			'th',
			null,
			_react2.default.createElement(
				'abbr',
				{ title: this.props.weekDayLabels[0] },
				this.props.abbreviatedWeekDayLabels[0]
			)
		);

		return _react2.default.createElement(
			'div',
			{
				className: 'calendar'
			},
			_react2.default.createElement(
				'table',
				{ className: 'datepicker__month', role: 'grid', 'aria-labelledby': this.props.id + '-month' },
				_react2.default.createElement(
					'thead',
					null,
					_react2.default.createElement(
						'tr',
						null,
						this.props.isIsoWeekday ? null : sunday,
						_react2.default.createElement(
							'th',
							{ scope: 'col' },
							_react2.default.createElement(
								'abbr',
								{ title: this.props.weekDayLabels[1] },
								this.props.abbreviatedWeekDayLabels[1]
							)
						),
						_react2.default.createElement(
							'th',
							{ scope: 'col' },
							_react2.default.createElement(
								'abbr',
								{ title: this.props.weekDayLabels[2] },
								this.props.abbreviatedWeekDayLabels[2]
							)
						),
						_react2.default.createElement(
							'th',
							{ scope: 'col' },
							_react2.default.createElement(
								'abbr',
								{ title: this.props.weekDayLabels[3] },
								this.props.abbreviatedWeekDayLabels[3]
							)
						),
						_react2.default.createElement(
							'th',
							{ scope: 'col' },
							_react2.default.createElement(
								'abbr',
								{ title: this.props.weekDayLabels[4] },
								this.props.abbreviatedWeekDayLabels[4]
							)
						),
						_react2.default.createElement(
							'th',
							{ scope: 'col' },
							_react2.default.createElement(
								'abbr',
								{ title: this.props.weekDayLabels[5] },
								this.props.abbreviatedWeekDayLabels[5]
							)
						),
						_react2.default.createElement(
							'th',
							{ scope: 'col' },
							_react2.default.createElement(
								'abbr',
								{ title: this.props.weekDayLabels[6] },
								this.props.abbreviatedWeekDayLabels[6]
							)
						),
						this.props.isIsoWeekday && sunday
					)
				),
				_react2.default.createElement(
					'tbody',
					null,
					this.renderWeeks(),
					_react2.default.createElement(
						'tr',
						null,
						_react2.default.createElement(
							'td',
							{
								colSpan: '7',
								role: 'gridcell'
							},
							_react2.default.createElement(
								'a',
								{
									href: 'javascript:void(0)' // eslint-disable-line no-script-url
									, tabIndex: '0',
									className: 'slds-show--inline-block slds-p-bottom--x-small',
									onClick: function onClick(event) {
										_this.handleSelectDate(event, { date: new Date() });
									},
									onKeyDown: this.props.onLastFocusableNodeKeyDown,
									ref: this.props.todayRef
								},
								this.props.todayLabel
							)
						)
					)
				)
			)
		);
	},
	renderWeeks: function renderWeeks() {
		var firstDayOfWeekOffset = this.props.isIsoWeekday ? 1 : 0;

		var firstDayOfMonth = _date2.default.firstDayOfMonth(this.props.initialDateForCalendarRender);

		var firstDayOfWeek = void 0;
		if (firstDayOfMonth.getDay() > firstDayOfWeekOffset) {
			var prevWeek = _date2.default.addWeeks(firstDayOfMonth, -1);
			firstDayOfWeek = _date2.default.nearestWeekDay(prevWeek, firstDayOfWeekOffset);
		} else {
			firstDayOfWeek = firstDayOfMonth;
		}

		var weeks = [];
		var done = false;

		var monthIndex = firstDayOfWeek.getMonth();
		var count = 0;

		while (!done) {
			weeks.push(_react2.default.createElement(_week2.default, {
				calendarHasFocus: this.state.calendarHasFocus,
				dateDisabled: this.props.dateDisabled,
				firstDayOfWeek: firstDayOfWeek,
				key: firstDayOfWeek.toString(),
				focusedDate: this.state.focusedDate,
				initialDateForCalendarRender: this.props.initialDateForCalendarRender,
				onCalendarBlur: this.props.onCalendarBlur,
				onKeyboardNavigateToPreviousDay: this.handleKeyboardNavigateToPreviousDay,
				onKeyboardNavigateToNextDay: this.handleKeyboardNavigateToNextDay,
				onKeyboardNavigateToPreviousWeek: this.handleKeyboardNavigateToPreviousWeek,
				onKeyboardNavigateToNextWeek: this.handleKeyboardNavigateToNextWeek,
				onRequestClose: this.handleRequestClose,
				onRequestInternalFocusDate: this.props.onRequestInternalFocusDate,
				onSelectDate: this.handleSelectDate,
				selectedDate: this.props.selectedDate,
				selectedDateRef: this.props.selectedDateRef,
				todayLabel: this.props.todayLabel
			}));

			// create new weeks
			firstDayOfWeek = _date2.default.addWeeks(firstDayOfWeek, 1);
			done = count++ > 2 && monthIndex !== firstDayOfWeek.getMonth();
			monthIndex = firstDayOfWeek.getMonth();
		}
		var extraWeeks = 0;
		while (weeks.length < 6) {
			extraWeeks += 1;
			weeks.push(_react2.default.createElement(
				'tr',
				{ key: 'extra_' + extraWeeks, className: 'week' },
				_react2.default.createElement(
					'td',
					{ 'aria-disabled': 'true', 'aria-selected': 'false', className: 'slds-disabled-text' },
					_react2.default.createElement(
						'span',
						{ className: 'slds-day ' },
						'\xA0'
					)
				)
			));
		}

		return weeks;
	}
}); /*
    Copyright (c) 2015, salesforce.com, inc. All rights reserved.
    Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
    Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
    Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
    */

exports.default = DatepickerCalendar;