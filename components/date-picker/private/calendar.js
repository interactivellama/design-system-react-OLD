'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _week = require('./week');

var _week2 = _interopRequireDefault(_week);

var _utilities = require('../../../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DatepickerCalendar = _react2.default.createClass({
	displayName: 'SLDSDatepickerCalendar',

	propTypes: {
		/**
   * Three letter abbreviations of the days of the week, starting on Sunday.
   */
		abbreviatedWeekDayLabels: _react.PropTypes.array.isRequired,
		/**
     * Date used to create calendar that is displayed. This is typically the initial day focused when using the keyboard navigation. Focus will be set to this date if available.
     */
		initialDateForCalendarRender: _react.PropTypes.instanceOf(Date).isRequired,
		/**
   * Makes Monday the first day of the week
   */
		isIsoWeekday: _react.PropTypes.bool,
		/**
   * Displayed calendar has changed or re-rendered
   */
		onChangeMonth: _react.PropTypes.func.isRequired,
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
   * Names of the seven days of the week, starting on Sunday.
   */
		weekDayLabels: _react.PropTypes.array.isRequired
	},

	getInitialState: function getInitialState() {
		return {
			focusedDate: _utilities.DateUtil.firstDayOfMonth(this.props.initialDateForCalendarRender),
			calendarHasFocus: true,
			todayFocus: false
		};
	},
	componentDidUpdate: function componentDidUpdate(prevProps) {
		this.setFocusedDate(prevProps);
	},
	setFocusedDate: function setFocusedDate(prevProps) {
		// Set prop that sets focus in child component once it is rendered. This occurs when the month DOM has changed. This will trigger a re-render, but no DOM change will occur, just a DOM focus.
		if (!_utilities.DateUtil.isEqual(this.props.initialDateForCalendarRender, prevProps.initialDateForCalendarRender)) {
			this.setState({ focusedDate: this.props.initialDateForCalendarRender });
		}
	},
	handleSelectDate: function handleSelectDate(event, _ref) {
		var date = _ref.date;

		this.setState({ selected: date });
		this.props.onSelectDate(event, { date: date });
	},
	handleRequestClose: function handleRequestClose() {
		if (this.props.onRequestClose) {
			this.props.onRequestClose();
		}
	},
	handlePreviousDay: function handlePreviousDay(date) {
		var prevDate = _utilities.DateUtil.addDays(date, -1);
		if (!_utilities.DateUtil.isSameMonth(prevDate, date)) {
			this.props.onChangeMonth(prevDate);
		} else {
			this.setState({ focusedDate: prevDate });
		}
	},
	handleNextDay: function handleNextDay(date) {
		var nextDate = _utilities.DateUtil.addDays(date, 1);
		if (!_utilities.DateUtil.isSameMonth(nextDate, date)) {
			this.props.onChangeMonth(nextDate);
		} else {
			this.setState({ focusedDate: nextDate });
		}
	},
	handlePreviousWeek: function handlePreviousWeek(date) {
		var prevDate = _utilities.DateUtil.addDays(date, -7);
		if (!_utilities.DateUtil.isSameMonth(prevDate, date)) {
			this.props.onChangeMonth(prevDate);
		} else {
			this.setState({ focusedDate: prevDate });
		}
	},
	handleNextWeek: function handleNextWeek(date) {
		var nextDate = _utilities.DateUtil.addDays(date, 7);
		if (!_utilities.DateUtil.isSameMonth(nextDate, date)) {
			this.props.onChangeMonth(nextDate);
		} else {
			this.setState({ focusedDate: nextDate });
		}
	},
	handleTodayFocus: function handleTodayFocus() {
		this.state.todayFocus = true;
	},
	handleTodayBlur: function handleTodayBlur() {
		this.state.todayFocus = false;
	},
	handleKeyDown: function handleKeyDown(event) {
		if (event.keyCode) {
			if (event.keyCode === _utilities.KEYS.TAB) {
				if (!event.shiftKey) {
					_utilities.EventUtil.trapEvent(event);
					if (this.props.onRequestClose) {
						this.props.onRequestClose();
					}
				}
			}
		}
	},
	render: function render() {
		var _this = this;

		var sunday = _react2.default.createElement(
			'th',
			{ ref: 'Sunday' },
			_react2.default.createElement(
				'abbr',
				{ title: this.props.weekDayLabels[0] },
				this.props.abbreviatedWeekDayLabels[0]
			)
		);

		return _react2.default.createElement(
			'div',
			{
				className: 'Calendar'
			},
			_react2.default.createElement(
				'table',
				{ className: 'datepicker__month', role: 'grid', 'aria-labelledby': this.props.id + '-month' },
				_react2.default.createElement(
					'thead',
					null,
					_react2.default.createElement(
						'tr',
						{ ref: 'weekdays' },
						this.props.isIsoWeekday ? null : sunday,
						_react2.default.createElement(
							'th',
							{ ref: 'Monday', scope: 'col' },
							_react2.default.createElement(
								'abbr',
								{ title: this.props.weekDayLabels[1] },
								this.props.abbreviatedWeekDayLabels[1]
							)
						),
						_react2.default.createElement(
							'th',
							{ ref: 'Tuesday', scope: 'col' },
							_react2.default.createElement(
								'abbr',
								{ title: this.props.weekDayLabels[2] },
								this.props.abbreviatedWeekDayLabels[2]
							)
						),
						_react2.default.createElement(
							'th',
							{ ref: 'Wednesday', scope: 'col' },
							_react2.default.createElement(
								'abbr',
								{ title: this.props.weekDayLabels[3] },
								this.props.abbreviatedWeekDayLabels[3]
							)
						),
						_react2.default.createElement(
							'th',
							{ ref: 'Thursday', scope: 'col' },
							_react2.default.createElement(
								'abbr',
								{ title: this.props.weekDayLabels[4] },
								this.props.abbreviatedWeekDayLabels[4]
							)
						),
						_react2.default.createElement(
							'th',
							{ ref: 'Friday', scope: 'col' },
							_react2.default.createElement(
								'abbr',
								{ title: this.props.weekDayLabels[5] },
								this.props.abbreviatedWeekDayLabels[5]
							)
						),
						_react2.default.createElement(
							'th',
							{ ref: 'Saturday', scope: 'col' },
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
									// onFocus={this.handleTodayFocus}
									, onBlur: this.handleTodayBlur,
									tabIndex: '0',
									onKeyDown: this.handleKeyDown,
									className: 'slds-show--inline-block slds-p-bottom--x-small',
									onClick: function onClick(event) {
										_this.handleSelectDate(event, { date: new Date() });
									}
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

		var firstDayOfMonth = _utilities.DateUtil.firstDayOfMonth(this.props.initialDateForCalendarRender);

		var firstDayOfWeek = void 0;
		if (firstDayOfMonth.getDay() > firstDayOfWeekOffset) {
			var prevWeek = _utilities.DateUtil.addWeeks(firstDayOfMonth, -1);
			firstDayOfWeek = _utilities.DateUtil.nearestWeekDay(prevWeek, firstDayOfWeekOffset);
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
				firstDayOfWeek: firstDayOfWeek,
				key: firstDayOfWeek.toString(),
				focusedDate: this.state.focusedDate,
				initialDateForCalendarRender: this.props.initialDateForCalendarRender,
				onKeyboardNavigateToPreviousDay: this.handlePreviousDay,
				onKeyboardNavigateToNextDay: this.handleNextDay,
				onKeyboardNavigateToPreviousWeek: this.handlePreviousWeek,
				onKeyboardNavigateToNextWeek: this.handleNextWeek,
				onRequestClose: this.handleRequestClose,
				onSelectDate: this.handleSelectDate,
				selectedDate: this.props.selectedDate,
				selectedDateRef: this.props.selectedDateRef,
				todayLabel: this.props.todayLabel
			}));

			// create new weeks
			firstDayOfWeek = _utilities.DateUtil.addWeeks(firstDayOfWeek, 1);
			done = count++ > 2 && monthIndex !== firstDayOfWeek.getMonth();
			monthIndex = firstDayOfWeek.getMonth();
		}
		var extraWeeks = 0;
		while (weeks.length < 6) {
			extraWeeks = extraWeeks + 1;
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

module.exports = DatepickerCalendar;