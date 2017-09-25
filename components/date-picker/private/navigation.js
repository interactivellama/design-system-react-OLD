define(['exports', 'react', 'prop-types', './year-picklist', '../../button', '../../../utilities/date'], function (exports, _react, _propTypes, _yearPicklist, _button, _date) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _yearPicklist2 = _interopRequireDefault(_yearPicklist);

	var _button2 = _interopRequireDefault(_button);

	var _date2 = _interopRequireDefault(_date);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var DatepickerMonthNavigation = _react2.default.createClass({
		displayName: 'SLDSDatepickerMonthNavigation',

		propTypes: {
			/**
    * Label for button to go to the next month
    */
			assistiveTextNextMonth: _propTypes2.default.string.isRequired,
			/**
    * Label for button to go to the previous month
    */
			assistiveTextPreviousMonth: _propTypes2.default.string.isRequired,
			/**
    * HTML id for component
    */
			id: _propTypes2.default.string,
			/**
      * Date used to create calendar that is displayed. This is typically the initial day focused when using the keyboard navigation. Focus will be set to this date if available.
      */
			initialDateForCalendarRender: _propTypes2.default.instanceOf(Date).isRequired,
			/**
    * Displayed calendar has changed or re-rendered
    */
			onChangeMonth: _propTypes2.default.func.isRequired,
			/**
    * Names of the months
    */
			monthLabels: _propTypes2.default.array.isRequired,
			/**
    * For keyboard navigation. In order to trap focus within the dialog, the first DOM node with a tab index should be listened to.
    */
			onPreviousMonthKeyDown: _propTypes2.default.func,
			/**
    * Callback that passes in the DOM reference of the `<button>` DOM node within this component. Primary use is to allow `focus` to be called. You should still test if the node exists, since rendering is asynchronous.
    */
			previousMonthRef: _propTypes2.default.func.isRequired,
			/**
    * Offset of year from current year that can be selected in the year selection dropdown. (2017 - 5 = 2012).
    */
			relativeYearFrom: _propTypes2.default.number,
			/**
    * Offset of year from current year that can be selected in the year selection dropdown. (2017 + 5 = 2012).
    */
			relativeYearTo: _propTypes2.default.number
		},

		handleClick: function handleClick(event) {
			event.preventDefault();
			event.stopPropagation();
		},
		previousMonthClicked: function previousMonthClicked() {
			this.props.onChangeMonth(undefined, _date2.default.addMonths(this.props.initialDateForCalendarRender, -1));
		},
		nextMonthClicked: function nextMonthClicked() {
			this.props.onChangeMonth(undefined, _date2.default.addMonths(this.props.initialDateForCalendarRender, 1));
		},
		handleYearSelect: function handleYearSelect(initialDateForCalendarRender) {
			this.props.onChangeMonth(undefined, initialDateForCalendarRender);
		},
		getMonthLabel: function getMonthLabel() {
			return this.props.monthLabels[new Date(this.props.initialDateForCalendarRender).getMonth()];
		},
		getYearLabel: function getYearLabel() {
			return new Date(this.props.initialDateForCalendarRender).getFullYear();
		},
		render: function render() {
			var _this = this;

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
							onKeyDown: this.props.onPreviousMonthKeyDown,
							onClick: this.previousMonthClicked,
							buttonRef: function buttonRef(component) {
								_this.props.previousMonthRef(component);
							},
							variant: 'icon',
							type: 'button'
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
							variant: 'icon',
							type: 'button'
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
	}); /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
	/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

	exports.default = DatepickerMonthNavigation;
});