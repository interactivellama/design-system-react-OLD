'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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


// ### classNames


// ## Constants


/**
*  The Dropdown Button Trigger renders the default trigger button for the dropdown menu. If this component has children, it does not render itself to the DOM. Instead, it renders its child element, `Button`, and all that child's properties. This component may be used as a template to create custom triggers that do not use `Button`.
*/
var GlobalNavigationDropdownTrigger = _react2.default.createClass({
	// ### Display Name
	// Always use the canonical component name (set in the core) as the React
	// display name.
	displayName: _constants.MENU_DROPDOWN_TRIGGER,

	// ### Prop Types
	propTypes: {
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
   * If the button has an icon and a visible label, you can omit the <code>assistiveText</code> prop and use the <code>label</code> prop.
   */
		assistiveText: _react.PropTypes.string.isRequired,
		/**
   * CSS classes to be added to the 'li'.
   */
		className: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
		/**
   * Determines position of separating bar.
   */
		dividerPosition: _react.PropTypes.oneOf(['left', 'right']),
		/**
  * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
  */
		id: _react.PropTypes.string,
		/**
  * Allows the dropdown menu to style itself accordingly when open since CSS hover rules cannot take effect if the menu is not inline.
  */
		isOpen: _react.PropTypes.bool,
		/**
   * Visible label on the dropdown menu trigger button.
   */
		label: _react.PropTypes.string,
		/**
   * The dropdown menu.
   */
		menu: _react.PropTypes.node,
		/**
   * Is only called when `openOn` is set to `hover` and when the triggering li loses focus.
   */
		onBlur: _react.PropTypes.func,
		/**
   * This prop is passed onto the triggering `li`. Triggered when the trigger li is clicked.
   */
		onClick: _react.PropTypes.func,
		/**
   * Is only called when `openOn` is set to `hover` and when the triggering li gains focus.
   */
		onFocus: _react.PropTypes.func,
		/**
   * Called when a key pressed.
   */
		onKeyDown: _react.PropTypes.func,
		/**
   * Called when mouse clicks down on the trigger `li`.
   */
		onMouseDown: _react.PropTypes.func,
		/**
   * Called when mouse hovers over the trigger `li`.
   */
		onMouseEnter: _react.PropTypes.func,
		/**
   * Called when mouse leaves trigger `li` or the menu.
   */
		onMouseLeave: _react.PropTypes.func,
		/**
   * The ref of the actual triggering button.
   */
		triggerRef: _react.PropTypes.func
	},

	// ### Render
	render: function render() {
		var _props = this.props,
		    active = _props.active,
		    activeBackgroundColor = _props.activeBackgroundColor,
		    className = _props.className,
		    dividerPosition = _props.dividerPosition,
		    id = _props.id,
		    isOpen = _props.isOpen,
		    label = _props.label,
		    menu = _props.menu,
		    onBlur = _props.onBlur,
		    onClick = _props.onClick,
		    onFocus = _props.onFocus,
		    onKeyDown = _props.onKeyDown,
		    onMouseDown = _props.onMouseDown,
		    onMouseEnter = _props.onMouseEnter,
		    onMouseLeave = _props.onMouseLeave,
		    triggerRef = _props.triggerRef,
		    rest = _objectWithoutProperties(_props, ['active', 'activeBackgroundColor', 'className', 'dividerPosition', 'id', 'isOpen', 'label', 'menu', 'onBlur', 'onClick', 'onFocus', 'onKeyDown', 'onMouseDown', 'onMouseEnter', 'onMouseLeave', 'triggerRef']);

		var listItemstyle = {};
		// TODO: This should eventually exist in a CSS class. Feature has been filed.
		var hoverBackgroundColor = '#f7f9fb';

		if (active) {
			listItemstyle.backgroundColor = activeBackgroundColor;
			listItemstyle.borderBottomColor = activeBackgroundColor;
		}

		// Per SLDS pattern, set trigger style like hover style, so that hover visuals and menu being open and closed are in same state
		if (isOpen) {
			listItemstyle.backgroundColor = hoverBackgroundColor;
		}

		return _react2.default.createElement(
			'li',
			{
				'aria-haspopup': 'true',
				className: (0, _classnames2.default)('slds-context-bar__item slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger--click', _defineProperty({
					'slds-is-open': isOpen,
					'slds-is-active': active
				}, 'slds-context-bar__item--divider-' + dividerPosition, dividerPosition), className),
				id: id,
				onBlur: onBlur,
				onClick: onClick,
				onFocus: onFocus,
				onKeyDown: onKeyDown,
				onMouseDown: onMouseDown,
				onMouseEnter: onMouseEnter,
				onMouseLeave: onMouseLeave,
				ref: triggerRef,
				style: listItemstyle
			},
			_react2.default.createElement(
				'a',
				{ className: 'slds-context-bar__label-action' },
				label
			),
			_react2.default.createElement(
				'div',
				{ className: 'slds-context-bar__icon-action slds-p-left--none' },
				_react2.default.createElement(_button2.default, _extends({
					assistiveText: this.props.assistiveText
				}, rest, {
					className: 'slds-context-bar__button slds-context-bar-action__trigger',
					'aria-haspopup': 'true',
					iconCategory: 'utility',
					iconName: 'chevrondown',
					iconVariant: 'bare',
					iconSize: 'x-small',
					variant: 'icon'
				}))
			),
			menu
		);
	}
});

module.exports = GlobalNavigationDropdownTrigger;