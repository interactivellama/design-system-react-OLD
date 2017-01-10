'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _calendar = require('./calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _navigation = require('./navigation');

var _navigation2 = _interopRequireDefault(_navigation);

var _utilities = require('../../../utilities');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DatepickerCalendarWrapper = _react2.default.createClass({
	displayName: 'DatepickerCalendarWrapper',

	propTypes: {
		/**
   * Label for button to go to the next month
   */
		assistiveTextNextMonth: _react.PropTypes.string.isRequired,
		/**
   * Label for button to go to the previous month
   */
		assistiveTextPreviousMonth: _react.PropTypes.string.isRequired,
		/**
   * Label for today's date
   */
		assistiveTextToday: _react.PropTypes.string,
		/**
   * One letter abbreviations of the days of the week, starting on Sunday.
   */
		abbreviatedWeekDayLabels: _react.PropTypes.array.isRequired,
		/**
   * CSS classes to be added to tag with `slds-datepicker`.
   */
		className: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
		/**
   * HTML id for component
   */
		id: _react.PropTypes.string,
		/**
   * Makes Monday the first day of the week
   */
		isIsoWeekday: _react.PropTypes.bool,
		/**
   * For use of datepicker outside of dropdown.
   */
		isolated: _react.PropTypes.bool,
		/**
   * Names of the months
   */
		monthLabels: _react.PropTypes.array.isRequired,
		/**
   * Triggered when the calendar is supposed to close.
   */
		onRequestClose: _react.PropTypes.func.isRequired,
		/**
   * Triggered when a date on the calendar is clicked.
   */
		onSelectDate: _react.PropTypes.func.isRequired,
		/**
   * The earliest year that can be selected in the year selection dropdown.
   */
		relativeYearFrom: _react.PropTypes.number.isRequired,
		/**
   * The maximum year that can be selected in the year selection dropdown.
   */
		relativeYearTo: _react.PropTypes.number.isRequired,
		/**
   * Currently selected date
   */
		selectedDate: _react2.default.PropTypes.instanceOf(Date),
		/**
   * Component reference / DOM node for selected day.
   */
		selectedDateRef: _react.PropTypes.func,
		/**
   * Label of shortcut to jump to today within the calendar. Also used for assistive text for the current day.
   */
		todayLabel: _react.PropTypes.string.isRequired,
		/**
   * Names of the seven days of the week, starting on Sunday.
   */
		weekDayLabels: _react.PropTypes.array.isRequired
	},

	getDefaultProps: function getDefaultProps() {
		return {
			selectedDate: new Date(),
			value: new Date()
		};
	},
	getInitialState: function getInitialState() {
		return {
			initialDateForCalendarRender: this.props.selectedDate,
			isFocused: false
		};
	},
	handleKeyDown: function handleKeyDown(event) {
		if (event.keyCode && (event.keyCode !== _utilities.KEYS.ESCAPE || event.keyCode !== _utilities.KEYS.SPACE || event.keyCode !== _utilities.KEYS.ENTER || event.keyCode !== _utilities.KEYS.TAB)) {
			_utilities.EventUtil.trapEvent(event);
		}
	},
	handleInitialDateForCalendarRenderChange: function handleInitialDateForCalendarRenderChange(initialDateForCalendarRender) {
		this.setState({ initialDateForCalendarRender: initialDateForCalendarRender });
	},
	handleRequestClose: function handleRequestClose() {
		if (this.props.onRequestClose) {
			this.props.onRequestClose();
		}
	},
	handleFocus: function handleFocus() {
		this.setState({ isFocused: true });
	},
	handleBlur: function handleBlur() {
		this.setState({ isFocused: false });
	},
	render: function render() {
		return _react2.default.createElement(
			'div',
			{
				className: (0, _classnames2.default)({
					'slds-datepicker': this.props.isolated
				}, this.props.className),
				'aria-hidden': 'false',
				'data-selection': 'single',
				onKeyDown: this.handleKeyDown,
				onFocus: this.handleFocus,
				onBlur: this.handleBlur,
				onClick: this.handleBGClick
			},
			_react2.default.createElement(_navigation2.default, {
				assistiveTextNextMonth: this.props.assistiveTextNextMonth,
				assistiveTextPreviousMonth: this.props.assistiveTextPreviousMonth,
				id: this.props.id,
				initialDateForCalendarRender: this.state.initialDateForCalendarRender,
				monthLabels: this.props.monthLabels,
				onChangeMonth: this.handleInitialDateForCalendarRenderChange,
				relativeYearFrom: this.props.relativeYearFrom,
				relativeYearTo: this.props.relativeYearTo
			}),
			_react2.default.createElement(_calendar2.default, {
				abbreviatedWeekDayLabels: this.props.abbreviatedWeekDayLabels,
				id: this.props.id,
				initialDateForCalendarRender: this.state.initialDateForCalendarRender,
				isIsoWeekday: this.props.isIsoWeekday,
				onChangeMonth: this.handleInitialDateForCalendarRenderChange,
				onRequestClose: this.handleRequestClose,
				onSelectDate: this.props.onSelectDate,
				selectedDate: this.props.selectedDate,
				selectedDateRef: this.props.selectedDateRef,
				todayLabel: this.props.todayLabel,
				weekDayLabels: this.props.weekDayLabels
			}),
			_react2.default.createElement(
				'span',
				{ id: 'bn_prev-label', className: 'slds-assistive-text' },
				this.props.assistiveTextNextMonth
			),
			_react2.default.createElement(
				'span',
				{ id: 'bn_next-label', className: 'slds-assistive-text' },
				this.props.assistiveTextPreviousMonth
			)
		);
	}
});

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

module.exports = DatepickerCalendarWrapper;