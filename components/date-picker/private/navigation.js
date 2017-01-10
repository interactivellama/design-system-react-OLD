'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _yearPicklist = require('./year-picklist');

var _yearPicklist2 = _interopRequireDefault(_yearPicklist);

var _button = require('../../button');

var _button2 = _interopRequireDefault(_button);

var _utilities = require('../../../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

var DatepickerMonthNavigation = _react2.default.createClass({
	displayName: 'SLDSDatepickerMonthNavigation',

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
   * HTML id for component
   */
		id: _react.PropTypes.string,
		/**
     * Date used to create calendar that is displayed. This is typically the initial day focused when using the keyboard navigation. Focus will be set to this date if available.
     */
		initialDateForCalendarRender: _react.PropTypes.instanceOf(Date).isRequired,
		/**
   * Displayed calendar has changed or re-rendered
   */
		onChangeMonth: _react.PropTypes.func.isRequired,
		/**
   * Names of the months
   */
		monthLabels: _react.PropTypes.array.isRequired,
		/**
   * Offset of year from current year that can be selected in the year selection dropdown. (2017 - 5 = 2012).
   */
		relativeYearFrom: _react.PropTypes.number,
		/**
   * Offset of year from current year that can be selected in the year selection dropdown. (2017 + 5 = 2012).
   */
		relativeYearTo: _react.PropTypes.number
	},

	handleClick: function handleClick(event) {
		event.preventDefault();
		event.stopPropagation();
	},
	previousMonthClicked: function previousMonthClicked() {
		this.props.onChangeMonth(_utilities.DateUtil.addMonths(this.props.initialDateForCalendarRender, -1));
	},
	nextMonthClicked: function nextMonthClicked() {
		this.props.onChangeMonth(_utilities.DateUtil.addMonths(this.props.initialDateForCalendarRender, 1));
	},
	handleYearSelect: function handleYearSelect(initialDateForCalendarRender) {
		this.props.onChangeMonth(initialDateForCalendarRender);
	},
	getMonthLabel: function getMonthLabel() {
		return this.props.monthLabels[new Date(this.props.initialDateForCalendarRender).getMonth()];
	},
	getYearLabel: function getYearLabel() {
		return new Date(this.props.initialDateForCalendarRender).getFullYear();
	},
	render: function render() {
		return _react2.default.createElement(
			'div',
			{ className: 'slds-datepicker__filter slds-grid' },
			_react2.default.createElement(
				'div',
				{ className: 'slds-datepicker__filter--month slds-grid slds-grid--align-spread slds-grow' },
				_react2.default.createElement(
					'div',
					{ className: 'slds-align-middle' },
					_react2.default.createElement(_button2.default, {
						assistiveText: this.props.assistiveTextPreviousMonth,
						iconCategory: 'utility',
						iconName: 'left',
						iconVariant: 'container',
						onKeyDown: this.handleKeyDown,
						onClick: this.previousMonthClicked,
						ref: 'prevMonth',
						variant: 'icon'
					})
				),
				_react2.default.createElement(
					'h2',
					{
						id: this.props.id + '-month',
						className: 'slds-align-middle',
						'aria-live': 'assertive',
						'aria-atomic': true
					},
					this.getMonthLabel(),
					' ',
					_react2.default.createElement(
						'span',
						{ className: 'slds-assistive-text' },
						this.getYearLabel()
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'slds-align-middle' },
					_react2.default.createElement(_button2.default, {
						assistiveText: this.props.assistiveTextNextMonth,
						iconCategory: 'utility',
						iconName: 'right',
						iconVariant: 'container',
						onClick: this.nextMonthClicked,
						ref: 'nextMonth',
						variant: 'icon'
					})
				)
			),
			_react2.default.createElement(_yearPicklist2.default, {
				id: this.props.id,
				initialDateForCalendarRender: this.props.initialDateForCalendarRender,
				onChangeMonth: this.handleYearSelect,
				relativeYearFrom: this.props.relativeYearFrom,
				relativeYearTo: this.props.relativeYearTo
			})
		);
	}
});

module.exports = DatepickerMonthNavigation;