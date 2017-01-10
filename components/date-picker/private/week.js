define(['module', 'react', './day', '../../../utilities'], function (module, _react, _day, _utilities) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _day2 = _interopRequireDefault(_day);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var DatepickerWeek = _react2.default.createClass({
		displayName: 'SLDSDatepickerWeek',

		propTypes: {
			/**
    * Label for today's date
    */
			assistiveTextToday: _react.PropTypes.string,
			/**
      * Date used to create calendar that is displayed. This is typically the initial day focused when using the keyboard navigation. Focus will be set to this date if available.
      */
			initialDateForCalendarRender: _react.PropTypes.instanceOf(Date).isRequired,
			/**
      * Is true if calendar day has focus.
      */
			calendarHasFocus: _react.PropTypes.bool,
			/**
      * First day of week.
      */
			firstDayOfWeek: _react.PropTypes.instanceOf(Date).isRequired,
			/**
      * Date that has focus.
      */
			focusedDate: _react.PropTypes.instanceOf(Date).isRequired,
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
			selectedDate: _react.PropTypes.instanceOf(Date).isRequired,
			/**
    * Component reference / DOM node for selected day.
    */
			selectedDateRef: _react.PropTypes.func,
			/**
    * Label of shortcut to jump to today within the calendar. Also used for assistive text for the current day.
    */
			todayLabel: _react.PropTypes.string.isRequired
		},

		render: function render() {
			var days = [];
			var date = this.props.firstDayOfWeek;

			for (var i = 0; i < 7; i++) {
				days.push(_react2.default.createElement(_day2.default, {
					calendarHasFocus: this.props.calendarHasFocus,
					date: date,
					focusedDate: this.props.focusedDate,
					focused: this.props.calendarHasFocus && _utilities.DateUtil.isSameDay(this.props.focusedDate, date),
					initialDateForCalendarRender: this.props.initialDateForCalendarRender,
					key: date.toString(),
					onKeyboardNavigateToNextDay: this.props.onKeyboardNavigateToNextDay,
					onKeyboardNavigateToNextWeek: this.props.onKeyboardNavigateToNextWeek,
					onKeyboardNavigateToPreviousDay: this.props.onKeyboardNavigateToPreviousDay,
					onKeyboardNavigateToPreviousWeek: this.props.onKeyboardNavigateToPreviousWeek,
					onRequestClose: this.props.onRequestClose,
					onSelectDate: this.props.onSelectDate,
					selectedDate: this.props.selectedDate,
					selectedDateRef: this.props.selectedDateRef,
					todayLabel: this.props.todayLabel
				}));
				date = _utilities.DateUtil.addDays(date, 1);
			}

			return _react2.default.createElement(
				'tr',
				{ className: 'week', key: days[0].toString() },
				days
			);
		}
	}); /*
     Copyright (c) 2015, salesforce.com, inc. All rights reserved.
     Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
     Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
     Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
     Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
     THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
     */

	module.exports = DatepickerWeek;
});