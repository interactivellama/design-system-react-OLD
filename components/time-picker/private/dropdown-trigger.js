define(['exports', 'react', '../../forms/input', '../../../utilities/key-code', '../../../utilities/constants'], function (exports, _react, _input, _keyCode, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _input2 = _interopRequireDefault(_input);

	var _keyCode2 = _interopRequireDefault(_keyCode);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var _extends = Object.assign || function (target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];

			for (var key in source) {
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					target[key] = source[key];
				}
			}
		}

		return target;
	};

	function _objectWithoutProperties(obj, keys) {
		var target = {};

		for (var i in obj) {
			if (keys.indexOf(i) >= 0) continue;
			if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
			target[i] = obj[i];
		}

		return target;
	}

	/**
 *  Component description.
 */
	var TimepickerDropdownTrigger = _react2.default.createClass({
		// ### Display Name
		// Always use the canonical component name (set in the core) as the React
		// display name.
		displayName: _constants.MENU_DROPDOWN_TRIGGER,

		// ### Prop Types
		propTypes: {
			/**
   * Icon for right side of trigger
   */
			iconRight: _react.PropTypes.node,
			/**
   * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering input.
   */
			id: _react.PropTypes.string,
			/**
    * This label appears above the input.
    */
			label: _react.PropTypes.string,
			/**
    * The dropdown menu.
    */
			menu: _react.PropTypes.node,
			/**
    * Is only called when `openOn` is set to `hover` and when the triggering input loses focus.
    */
			onBlur: _react.PropTypes.func,
			/**
    * This prop is passed onto the triggering `Input`. Triggered when the trigger input is clicked.
    */
			onClick: _react.PropTypes.func,
			/**
    * Is only called when `openOn` is set to `hover` and when the triggering input gains focus.
    */
			onFocus: _react.PropTypes.func,
			/**
    * Called when a key pressed.
    */
			onKeyDown: _react.PropTypes.func,
			/**
    * Called when mouse clicks down on the trigger input.
    */
			onMouseDown: _react.PropTypes.func,
			/**
    * The ref of the actual triggering input.
    */
			triggerRef: _react.PropTypes.func,
			/**
    * Date
    */
			value: _react.PropTypes.string
		},

		render: function render() {
			var _props = this.props,
			    iconRight = _props.iconRight,
			    menu = _props.menu,
			    onBlur = _props.onBlur,
			    onFocus = _props.onFocus,
			    onKeyDown = _props.onKeyDown,
			    onMouseDown = _props.onMouseDown,
			    triggerRef = _props.triggerRef,
			    props = _objectWithoutProperties(_props, ['iconRight', 'menu', 'onBlur', 'onFocus', 'onKeyDown', 'onMouseDown', 'triggerRef']);

			return _react2.default.createElement(
				'div',
				{
					onBlur: onBlur,
					onFocus: onFocus,
					onKeyDown: this.handleKeyDown,
					onMouseDown: onMouseDown
				},
				_react2.default.createElement(
					_input2.default,
					_extends({ iconRight: iconRight }, props, { inputRef: triggerRef }),
					menu
				)
			);
		},
		handleKeyDown: function handleKeyDown(event) {
			if (this.props.onKeyDown && event.keyCode) {
				if (event.keyCode === _keyCode2.default.ENTER || event.keyCode === _keyCode2.default.DOWN || event.keyCode === _keyCode2.default.UP || event.keyCode === _keyCode2.default.ESCAPE) {
					this.props.onKeyDown(event);
				}
			}
		}
	});

	exports.default = TimepickerDropdownTrigger;
});