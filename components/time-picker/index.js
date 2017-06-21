define(['module', 'react', 'prop-types', 'lodash.isdate', './check-props', '../icon/input-icon', '../menu-dropdown', './private/dropdown-trigger', '../../utilities/constants'], function (module, _react, _propTypes, _lodash, _checkProps, _inputIcon, _menuDropdown, _dropdownTrigger, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _checkProps2 = _interopRequireDefault(_checkProps);

	var _inputIcon2 = _interopRequireDefault(_inputIcon);

	var _menuDropdown2 = _interopRequireDefault(_menuDropdown);

	var _dropdownTrigger2 = _interopRequireDefault(_dropdownTrigger);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
 *  Component description.
 */


	// ### Dropdown


	// ### isDate
	/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
	/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

	// # Timepicker Component

	// ## Dependencies

	// ### React
	var Timepicker = _react2.default.createClass({
		// ### Display Name
		// Always use the canonical component name as the React display name.
		displayName: _constants.TIME_PICKER,

		// ### Prop Types
		propTypes: {
			constrainToScrollParent: _propTypes2.default.bool,
			/**
    * Disables the input and prevents editing the contents.
    */
			disabled: _propTypes2.default.bool,
			/**
    * Time formatting function
    */
			formatter: _propTypes2.default.func,
			inheritTargetWidth: _propTypes2.default.bool,
			/**
    * Renders menu within the wrapping trigger as a sibling of the button. By default, you will have an absolutely positioned container at an elevated z-index.
    */
			isInline: _propTypes2.default.bool,
			/**
    * This label appears above the input.
    */
			label: _propTypes2.default.string,
			/**
    * Custom element that overrides the default Menu Item component.
    */
			listItemRenderer: _propTypes2.default.func,
			/**
    * Receives the props `(dateValue, stringValue)`
    */
			onDateChange: _propTypes2.default.func,
			/**
    * Parsing date string into Date
    */
			parser: _propTypes2.default.func,
			/**
    * Text that will appear in an empty input.
    */
			placeholder: _propTypes2.default.string,
			/**
    * If true, adds asterisk next to input label to indicate it is a required field.
    */
			required: _propTypes2.default.bool,
			stepInMinutes: _propTypes2.default.number,
			strValue: _propTypes2.default.string,
			/**
    * Date
    */
			value: _propTypes2.default.instanceOf(Date)
		},

		getDefaultProps: function getDefaultProps() {
			return {
				formatter: function formatter(date) {
					if (date) {
						return date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
					}

					return null;
				},
				parser: function parser(timeStr) {
					var date = new Date();
					var dateStr = date.toLocaleString(navigator.language, { year: 'numeric', month: 'numeric', day: 'numeric' });
					return new Date(dateStr + ' ' + timeStr);
				},

				placeholder: 'Pick Time',
				value: null,
				stepInMinutes: 30
			};
		},
		getInitialState: function getInitialState() {
			return {
				value: this.props.value,
				strValue: this.props.strValue,
				options: this.getOptions()
			};
		},
		componentWillMount: function componentWillMount() {
			// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
			(0, _checkProps2.default)(_constants.TIME_PICKER, this.props);
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if (nextProps.value && this.props.value) {
				var currentTime = this.props.value.getTime();
				var nextTime = nextProps.value.getTime();

				if (currentTime !== nextTime) {
					this.setState({
						value: nextProps.value,
						strValue: this.props.formatter(nextProps.value)
					});
				}
			}
		},
		getOptions: function getOptions() {
			var baseDate = new Date();
			var options = [];

			baseDate.setHours(0);
			baseDate.setMinutes(0);
			baseDate.setSeconds(0);
			baseDate.setMilliseconds(0);

			var curDate = new Date(baseDate);

			while (baseDate.getDate() === curDate.getDate()) {
				var formatted = this.props.formatter(curDate);

				options.push({
					label: formatted,
					value: new Date(curDate)
				});

				curDate.setMinutes(curDate.getMinutes() + this.props.stepInMinutes);
			}

			return options;
		},
		parseDate: function parseDate(strValue) {
			var newDate = this.props.parser(strValue);

			if ((0, _lodash2.default)(newDate)) {
				if (!isNaN(newDate.getTime())) {
					return newDate;
				}
			}

			return new Date();
		},
		render: function render() {
			var isInline = void 0;
			/* eslint-disable react/prop-types */
			if (this.props.isInline) {
				isInline = true;
			} else if (this.props.modal !== undefined) {
				isInline = !this.props.modal;
			}
			/* eslint-enable react/prop-types */

			return _react2.default.createElement(
				_menuDropdown2.default,
				{
					checkmark: false,
					constrainToScrollParent: this.props.constrainToScrollParent,
					disabled: this.props.disabled,
					inheritTargetWidth: this.props.inheritTargetWidth,
					label: this.props.label,
					listItemRenderer: this.props.listItemRenderer
					// inline style override
					, menuStyle: {
						maxHeight: '20em',
						overflowX: 'hidden',
						minWidth: '100%'
					},
					isInline: isInline,
					onSelect: this.handleSelect,
					options: this.state.options
				},
				_react2.default.createElement(_dropdownTrigger2.default, {
					iconRight: _react2.default.createElement(_inputIcon2.default, {
						category: 'utility',
						name: 'clock'
					}),
					onChange: this.handleInputChange,
					placeholder: this.props.placeholder,
					required: this.props.required,
					type: 'text',
					value: this.state.strValue
				})
			);
		},
		handleChange: function handleChange(date, strValue) {
			this.setState({
				value: date,
				strValue: strValue
			});

			if (this.props.onDateChange) {
				this.props.onDateChange(date, strValue);
			}
		},
		handleSelect: function handleSelect(val) {
			if (val && val.value) {
				this.handleChange(val.value, val.label);
			}
		},
		handleInputChange: function handleInputChange(event) {
			var strValue = event.target.value;

			this.setState({
				strValue: strValue
			});

			if (this.props.onDateChange) {
				var parsedDate = this.props.parser(strValue);
				this.props.onDateChange(parsedDate, strValue);
			}
		}
	});

	// ## Constants


	// This component's `checkProps` which issues warnings to developers about properties
	// when in development mode (similar to React's built in development tools)


	module.exports = Timepicker;
});