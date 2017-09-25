'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _lodash = require('lodash.assign');

var _lodash2 = _interopRequireDefault(_lodash);

var _airbnbPropTypes = require('airbnb-prop-types');

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Radio Button Group design pattern](https://lightningdesignsystem.com/components/radio-button-group/) in React.
// Based on SLDS v2.5.0

var propTypes = {
	/**
  * Children are expected to be Radio components.
  */
	children: _propTypes2.default.node.isRequired,
	/**
 * Custom CSS classes added to `slds-radio_button-group` node.
 */
	className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
	/**
  * **Text labels for internationalization**
  * This object is merged with the default props object on every render.
  * * `error`: Message to display when any of Checkboxes are in an error state.
  * * `label`: This label appears above the button group.
  */
	labels: (0, _airbnbPropTypes.shape)({
		error: _propTypes2.default.string,
		label: _propTypes2.default.string
	}),
	/**
  * This event fires when the radio selection changes.
  */
	onChange: _propTypes2.default.func,
	/**
  * Disable all radio inputs.
  */
	disabled: _propTypes2.default.bool,
	/**
  * Adds an indicator that this field is required.
  */
	required: _propTypes2.default.bool,
	/**
  * The name of this radio group.
  */
	name: _propTypes2.default.string,
	/**
  * The ID of the error message, for linking to radio inputs with aria-describedby.
  */
	errorId: _propTypes2.default.string
};

var defaultProps = { labels: {} };

/**
 * A styled select list that can have a single entry checked at any one time.
 * The RadioButtonGroup component wraps Radio components.
 */

var RadioButtonGroup = function (_React$Component) {
	_inherits(RadioButtonGroup, _React$Component);

	function RadioButtonGroup(props) {
		_classCallCheck(this, RadioButtonGroup);

		// Merge objects of strings with their default object
		var _this = _possibleConstructorReturn(this, (RadioButtonGroup.__proto__ || Object.getPrototypeOf(RadioButtonGroup)).call(this, props));

		_this.labels = _this.props.labels ? (0, _lodash2.default)({}, defaultProps.labels, _this.props.labels) : defaultProps.labels;

		_this.generatedName = _shortid2.default.generate();
		_this.generatedErrorId = _this.labels.error ? _shortid2.default.generate() : null;
		return _this;
	}

	_createClass(RadioButtonGroup, [{
		key: 'getName',
		value: function getName() {
			return this.props.name || this.generatedName;
		}
	}, {
		key: 'getErrorId',
		value: function getErrorId() {
			return this.props.errorId || this.generatedErrorId;
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var children = _react2.default.Children.map(this.props.children, function (child) {
				return _react2.default.cloneElement(child, {
					name: _this2.getName(),
					onChange: _this2.props.onChange,
					'aria-describedby': _this2.getErrorId(),
					disabled: _this2.props.disabled
				});
			});

			return _react2.default.createElement(
				'fieldset',
				{
					className: (0, _classnames2.default)('slds-form-element', {
						'slds-has-error': this.labels.error
					})
				},
				_react2.default.createElement(
					'legend',
					{ className: 'slds-form-element__legend slds-form-element__label' },
					this.props.required ? _react2.default.createElement(
						'abbr',
						{ className: 'slds-required', title: 'required' },
						'*'
					) : null,
					this.labels.label
				),
				_react2.default.createElement(
					'div',
					{ className: (0, _classnames2.default)('slds-form-element__control', this.props.className) },
					_react2.default.createElement(
						'div',
						{ className: 'slds-radio_button-group' },
						children
					),
					this.labels.error ? _react2.default.createElement(
						'div',
						{ id: this.getErrorId(), className: 'slds-form-element__help' },
						this.labels.error
					) : null
				)
			);
		}
	}]);

	return RadioButtonGroup;
}(_react2.default.Component);

RadioButtonGroup.displayName = _constants.RADIO_BUTTON_GROUP;
RadioButtonGroup.propTypes = propTypes;
RadioButtonGroup.defaultProps = defaultProps;

module.exports = RadioButtonGroup;