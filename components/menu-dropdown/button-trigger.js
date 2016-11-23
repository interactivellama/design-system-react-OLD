'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

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

// # Dropdown Trigger Component (Simple Button Flavor) --- SLDS for React

// ### React
// React is an external dependency of the project.


// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."


// ### Children


/**
 *  The Dropdown Button Trigger renders the default trigger button for the dropdown menu. If this component has children, it does not render itself to the DOM. Instead, it renders its child element, `Button`, and all that child's properties. This component may be used as a template to create custom triggers that do not use `Button`.
 */
var Trigger = _react2.default.createClass({
	// ### Display Name
	// Always use the canonical component name (set in the core) as the React
	// display name.
	displayName: _constants.MENU_DROPDOWN_TRIGGER,

	// ### Prop Types
	propTypes: {
		/**
   * Import the module `design-system-react/dropdown/button-trigger` and render a grandchild of the element type `Button`. Any `props` specified on that `Button` will be assigned to the triggering button. Any `id` prop or event hanlders (`onBlur`, `onClick`, etc.) set on the button grandchild will be overwritten by `MenuDropdown` to allow functionality and accessibility.
   * ```
   * <Dropdown>
   *   <Trigger>
   *     <Button iconCategory="utility" iconName="settings" />
   *   </Trigger>
   * </Dropdown>
   * ```
   */
		children: _react.PropTypes.element,
		/**
   * CSS classes to be added to triggering button.
   */
		className: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
		/**
  * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button. This is provided by the `MenuDropdown`. Please use `MenuDropdown` to set.
  */
		id: _react.PropTypes.string,
		/**
   * Renders menu within the wrapping trigger as a sibling of the button. By default, you will have an absolutely positioned container at an elevated z-index.
   */
		isInline: _react.PropTypes.bool,
		/**
   * Informs the trigger on the open/close state of the dropdown menu
   */
		isOpen: _react.PropTypes.bool,
		/**
  * By Default the dropdown menu is inside a `Dialog` component.
  */
		menu: _react.PropTypes.node,
		/**
   * Is only called when `openOn` is set to `hover` and when the triggering button loses focus.
   */
		onBlur: _react.PropTypes.func,
		/**
   * This prop is passed onto the triggering `Button`. Triggered when the trigger button is clicked.
   */
		onClick: _react.PropTypes.func,
		/**
   * Is only called when `openOn` is set to `hover` and when the triggering button gains focus.
   */
		onFocus: _react.PropTypes.func,
		/**
   * Called when a key pressed.
   */
		onKeyDown: _react.PropTypes.func,
		/**
   * Called when mouse clicks down on the trigger button.
   */
		onMouseDown: _react.PropTypes.func,
		/**
   * Called when mouse hovers over the trigger button. This is only called if `this.props.openOn` is set to `hover`.
   */
		onMouseEnter: _react.PropTypes.func,
		/**
   * Called when mouse hover leaves the trigger button. This is only called if `this.props.openOn` is set to `hover`.
   */
		onMouseLeave: _react.PropTypes.func,
		/**
   * Determines if mouse hover or click opens the dropdown menu. The default of `click` is highly recommended to comply with accessibility standards. If you are planning on using hover, please pause a moment and reconsider.
   */
		openOn: _react.PropTypes.oneOf(['hover', 'click', 'hybrid']),
		/**
   * The ref of the actual triggering button.
   */
		triggerRef: _react.PropTypes.func
	},

	// ### Render
	render: function render() {
		// The following are required for use with dropdown. Any other custom props for `Button` should be set with a `Button` child of this component, and are technically just here for backwards compatibility. See `children` prop description for more information.
		var _props = this.props;
		var children = _props.children;
		var className = _props.className;
		var id = _props.id;
		var isInline = _props.isInline;
		var isOpen = _props.isOpen;
		var onBlur = _props.onBlur;
		var menu = _props.menu;
		var onClick = _props.onClick;
		var onFocus = _props.onFocus;
		var onKeyDown = _props.onKeyDown;
		var onMouseDown = _props.onMouseDown;
		var onMouseEnter = _props.onMouseEnter;
		var onMouseLeave = _props.onMouseLeave;
		var openOn = _props.openOn;
		var triggerRef = _props.triggerRef;

		var deprecatedPropsFromMenuDropdown = _objectWithoutProperties(_props, ['children', 'className', 'id', 'isInline', 'isOpen', 'onBlur', 'menu', 'onClick', 'onFocus', 'onKeyDown', 'onMouseDown', 'onMouseEnter', 'onMouseLeave', 'openOn', 'triggerRef']);

		// Trigger manipulation


		var propsFromGrandchildButton = {};
		// if there are no children, render the default button
		if (_react2.default.Children.count(this.props.children) !== 0) {
			_react2.default.Children.forEach(this.props.children, function (child) {
				if (child && child.type.displayName === _button2.default.displayName) {
					propsFromGrandchildButton = child.props;
				}
			});
		}

		// If Trigger has a Button child, then use the explicitly declared child's props layered on top of those passed down by dropdown's props to allow manual override
		return _react2.default.createElement(
			'div',
			{
				className: (0, _classnames2.default)('slds-dropdown-trigger slds-dropdown-trigger--' + openOn, {
					'slds-is-open': isOpen
				}),
				id: id,
				onBlur: onBlur,
				onClick: onClick,
				onKeyDown: onKeyDown,
				onFocus: onFocus,
				onMouseDown: onMouseDown,
				onMouseEnter: onMouseEnter,
				onMouseLeave: onMouseLeave
			},
			_react2.default.createElement(_button2.default, _extends({
				className: className,
				ariaExpanded: isOpen,
				ariaHaspopup: true
			}, deprecatedPropsFromMenuDropdown, propsFromGrandchildButton, {
				ref: triggerRef
			})),
			menu
		);
	}
});

module.exports = Trigger;