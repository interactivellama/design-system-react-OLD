'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilities = require('../../../utilities');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /*
                                                                                                                                                                                                                  Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                  Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                  Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                  Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                  Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                  */

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."


var DatepickerCalendarDay = _react2.default.createClass({
	displayName: 'SLDSDatepickerCalendarDay',

	propTypes: {
		/**
   * If elements within the calendar have focus. This is helpful for keyboard event trapping.
   */
		calendarHasFocus: _react.PropTypes.bool.isRequired,
		/**
   * Date of day
   */
		date: _react.PropTypes.instanceOf(Date),
		/**
     * Date used to create calendar that is displayed. This is typically the initial day focused when using the keyboard navigation. Focus will be set to this date if available.
     */
		initialDateForCalendarRender: _react.PropTypes.instanceOf(Date).isRequired,
		/**
   * Set if this day is to focused.
   */
		focused: _react.PropTypes.bool,
		/**
   * For keyboard navigation. Changes the focus to the next day on the calendar. Triggered when right arrow button is pressed.
   */
		onKeyboardNavigateToNextDay: _react.PropTypes.func.isRequired,
		/**
   * For keyboard navigation. Changes the focus to the same day in the next week on the calendar. Triggered when down arrow button is pressed.
   */
		onKeyboardNavigateToNextWeek: _react.PropTypes.func.isRequired,
		/**
   * For keyboard navigation. Changes the focus to the previous day on the calendar. Triggered when left arrow button is pressed.
   */
		onKeyboardNavigateToPreviousDay: _react.PropTypes.func.isRequired,
		/**
   * For keyboard navigation. Changes the focus to the same day in the previous week on the calendar. Triggered when up arrow button is pressed.
   */
		onKeyboardNavigateToPreviousWeek: _react.PropTypes.func.isRequired,
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
   * Label of shortcut to jump to today within the calendar. Also used for assistive text for the current day.
   */
		todayLabel: _react.PropTypes.string.isRequired
	},

	componentDidUpdate: function componentDidUpdate(prevProps) {
		if (this.props.focused && !prevProps.focused) {
			this.setFocusToSelf();
		}
	},
	handleClick: function handleClick(event) {
		this.props.onSelectDate(event, { date: this.props.date });

		if (event.nativeEvent) {
			event.nativeEvent.stopImmediatePropagation();
			event.nativeEvent.preventDefault();
		}
	},
	handleKeyDown: function handleKeyDown(event) {
		var _this = this,
		    _keyDownCallbacks;

		var fromDate = this.props.date;
		var keyDownCallbacks = (_keyDownCallbacks = {}, _defineProperty(_keyDownCallbacks, _utilities.KEYS.SPACE, function () {
			_this.props.onSelectDate(event, { date: fromDate });
		}), _defineProperty(_keyDownCallbacks, _utilities.KEYS.ENTER, function () {
			_this.props.onSelectDate(event, { date: fromDate });
		}), _defineProperty(_keyDownCallbacks, _utilities.KEYS.ESCAPE, function () {
			_this.props.onRequestClose();
		}), _defineProperty(_keyDownCallbacks, _utilities.KEYS.TAB, function () {
			_this.props.onRequestClose();
		}), _defineProperty(_keyDownCallbacks, _utilities.KEYS.LEFT, function () {
			_this.props.onKeyboardNavigateToPreviousDay(fromDate);
		}), _defineProperty(_keyDownCallbacks, _utilities.KEYS.RIGHT, function () {
			_this.props.onKeyboardNavigateToNextDay(fromDate);
		}), _defineProperty(_keyDownCallbacks, _utilities.KEYS.UP, function () {
			_this.props.onKeyboardNavigateToPreviousWeek(fromDate);
		}), _defineProperty(_keyDownCallbacks, _utilities.KEYS.DOWN, function () {
			_this.props.onKeyboardNavigateToNextWeek(fromDate);
		}), _keyDownCallbacks);

		if (event.keyCode) {
			_utilities.EventUtil.trapEvent(event);
			if (keyDownCallbacks[event.keyCode]) {
				keyDownCallbacks[event.keyCode]();
			}
		}
	},
	setFocusToSelf: function setFocusToSelf() {
		if (this.dayCell && this.props.calendarHasFocus) {
			this.dayCell.focus();
		}
	},
	render: function render() {
		var _this2 = this;

		var isCurrentMonth = _utilities.DateUtil.isSameMonth(this.props.date, this.props.initialDateForCalendarRender);
		var isToday = _utilities.DateUtil.isToday(this.props.date);
		var isSelectedDay = _utilities.DateUtil.isSameDay(this.props.date, this.props.selectedDate);
		var isFirstDayOfMonth = _utilities.DateUtil.isFirstDayOfMonth(this.props.date);

		return _react2.default.createElement(
			'td',
			{
				'aria-disabled': !isCurrentMonth,
				'aria-selected': isSelectedDay,
				className: (0, _classnames2.default)({
					'slds-is-today': isToday,
					'slds-disabled-text': !isCurrentMonth,
					'slds-is-selected': isSelectedDay
				}),
				onClick: this.handleClick,
				onKeyDown: this.handleKeyDown,
				ref: function ref(component) {
					_this2.dayCell = component;
					if (isSelectedDay) {
						_this2.props.selectedDateRef(component);
					}
				},
				role: 'gridcell',
				tabIndex: !this.props.calendarHasFocus && isFirstDayOfMonth && isCurrentMonth ? 0 : -1
			},
			_react2.default.createElement(
				'span',
				{ className: 'slds-day' },
				isToday ? _react2.default.createElement(
					'span',
					{ className: 'slds-assistive-text' },
					this.props.todayLabel,
					': '
				) : null,
				this.props.date.getDate()
			)
		);
	}
});

module.exports = DatepickerCalendarDay;