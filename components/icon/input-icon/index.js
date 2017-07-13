'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.isfunction');

var _lodash2 = _interopRequireDefault(_lodash);

var _utilityIcon = require('../../utilities/utility-icon');

var _utilityIcon2 = _interopRequireDefault(_utilityIcon);

var _button = require('../../button');

var _button2 = _interopRequireDefault(_button);

var _constants = require('../../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React


// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// A simple javascript utility for conditionally joining classNames together.


// ### isFunction


// ## Children


// ## Constants


/**
 * A wrapper for icons that will be rendered inside of an Input
 *
 * If the `onClick` function prop is provided, the `design-system-react/components/button` component is used.
 * If not, the icon will be an instance of `design-system-react/components/utilities/utility-icon`.
 * Checkout out the appropriate component to see what props can be passed along via the `{...props}` rest operator
 */
var InputIcon = function InputIcon(props) {
	var category = props.category,
	    iconPosition = props.iconPosition,
	    name = props.name,
	    path = props.path,
	    onClick = props.onClick,
	    rest = _objectWithoutProperties(props, ['category', 'iconPosition', 'name', 'path', 'onClick']);

	return (0, _lodash2.default)(onClick) ? _react2.default.createElement(_button2.default, _extends({
		className: (0, _classnames2.default)('slds-input__icon', _defineProperty({}, 'slds-input__icon--' + iconPosition, iconPosition)),
		iconCategory: category,
		iconName: name,
		iconPath: path,
		onClick: onClick,
		variant: 'icon'
	}, rest)) : _react2.default.createElement(_utilityIcon2.default, _extends({
		'aria-hidden': true,
		category: category,
		className: (0, _classnames2.default)('slds-input__icon slds-icon-text-default', _defineProperty({}, 'slds-input__icon--' + iconPosition, iconPosition)),
		name: name,
		path: path
	}, rest));
};

InputIcon.displayName = _constants.ICON_INPUT;

InputIcon.propTypes = {
	/**
  * Icon category from [lightningdesignsystem.com/icons/](https://www.lightningdesignsystem.com/icons/)
  */
	category: _propTypes2.default.string,
	/**
  * This is only needed if an input contains two icons, the Input component handles this prop for you.
  */
	iconPosition: _propTypes2.default.oneOf(['left', 'right']),
	/**
  * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
  */
	name: _propTypes2.default.string,
	/**
   * Path to the icon. This will override any global icon settings.
   */
	path: _propTypes2.default.string,
	/**
  * This event fires when the icon is clicked.
  */
	onClick: _propTypes2.default.func
};

InputIcon.defaultProps = {
	category: 'utility'
};

module.exports = InputIcon;