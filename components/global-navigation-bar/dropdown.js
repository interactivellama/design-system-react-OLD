'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _menuDropdown = require('../menu-dropdown');

var _menuDropdown2 = _interopRequireDefault(_menuDropdown);

var _dropdownTrigger = require('./dropdown-trigger');

var _dropdownTrigger2 = _interopRequireDefault(_dropdownTrigger);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /*
                                                                                                                                                                                                                             Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                             
                                                                                                                                                                                                                             Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                             Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                             Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                             Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                             
                                                                                                                                                                                                                             THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                             */

// # Global Navigation Dropdown Component

// ## Dependencies

// ### React


// ### Dropdown


// ## Constants


/**
 * This component is an implementation of `MenuDropdown` with a custom trigger. All the properties listed below are provided to the `MenuDropdown` component. Any additional properties are provided to the Custom Trigger (that is the `Button` or `li` tag).
 */
var GlobalNavigationBarDropdown = function GlobalNavigationBarDropdown(props) {
	// Separate props we care about in order to pass others along passively to the dropdown component
	var active = props.active,
	    activeBackgroundColor = props.activeBackgroundColor,
	    assistiveText = props.assistiveText,
	    dividerPosition = props.dividerPosition,
	    rest = _objectWithoutProperties(props, ['active', 'activeBackgroundColor', 'assistiveText', 'dividerPosition']);

	return _react2.default.createElement(
		_menuDropdown2.default,
		_extends({
			align: 'right',
			hasStaticAlignment: true
			// only need if using hybrid or hover
			, hoverCloseDelay: 400,
			isInline: true,
			length: props.length
		}, rest),
		_react2.default.createElement(_dropdownTrigger2.default, {
			active: active,
			assistiveText: assistiveText,
			activeBackgroundColor: activeBackgroundColor,
			dividerPosition: dividerPosition
		})
	);
};

// ### Display Name
// Always use the canonical component name (set in the core) as the React
// display name.
GlobalNavigationBarDropdown.displayName = _constants.GLOBAL_NAVIGATION_BAR_DROPDOWN;

// ### Prop Types
GlobalNavigationBarDropdown.propTypes = {
	/**
  * Whether the item is active or not.
  */
	active: _react2.default.PropTypes.bool,
	/**
  * Allows alignment of active item with active application background color.
  */
	activeBackgroundColor: _react.PropTypes.string,
	/**
  * Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means.
  */
	assistiveText: _react.PropTypes.string.isRequired,
	/**
  * Aligns the right or left side of the menu with the respective side of the trigger. This is not intended for use with `nubbinPosition`.
  */
	align: _react.PropTypes.oneOf(['left', 'right']),
	/**
  * Extra classnames to apply to the dropdown menu.
  */
	className: _react.PropTypes.string,
	/**
  * Determines position of separating bar.
  */
	dividerPosition: _react.PropTypes.oneOf(['left', 'right']),
	/**
  * CSS classes to be added to `li` element.
  */
	buttonClassName: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
	/**
 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
 */
	id: _react.PropTypes.string,
	/**
  * Provided to List to indicate number of items visible in the List. Pass `null` to display all items, or a string containing one of the numeric option values listed under [Dropdown Height](https://www.lightningdesignsystem.com/components/menus/#flavor-dropdown-height) at the right (eg. '5').
  */
	length: _react.PropTypes.oneOf([null, '5', '7', '10']),
	/**
  *  Offset adds pixels to the absolutely positioned dropdown menu in the format: ([vertical]px [horizontal]px).
  */
	offset: _react.PropTypes.string,
	/**
  * Triggered when an item in the menu is clicked.
  */
	onSelect: _react.PropTypes.func,
	/**
  * An array of menu item.
  */
	options: _react.PropTypes.array.isRequired
};

// ### Default Props
GlobalNavigationBarDropdown.defaultProps = {
	align: 'right',
	length: null
};

module.exports = GlobalNavigationBarDropdown;