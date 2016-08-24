define(['module', 'react', 'classnames', '../button', '../../utilities/constants'], function (module, _react, _classnames, _button, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _button2 = _interopRequireDefault(_button);

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

	function _defineProperty(obj, key, value) {
		if (key in obj) {
			Object.defineProperty(obj, key, {
				value: value,
				enumerable: true,
				configurable: true,
				writable: true
			});
		} else {
			obj[key] = value;
		}

		return obj;
	}

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
    * Called when mouse clicks down on the trigger li.
    */
			onMouseDown: _react.PropTypes.func,
			/**
    * The ref of the actual triggering button.
    */
			triggerRef: _react.PropTypes.func
		},

		render: function render() {
			var _props = this.props;
			var active = _props.active;
			var activeBackgroundColor = _props.activeBackgroundColor;
			var className = _props.className;
			var dividerPosition = _props.dividerPosition;
			var id = _props.id;
			var label = _props.label;
			var menu = _props.menu;
			var onBlur = _props.onBlur;
			var onClick = _props.onClick;
			var onFocus = _props.onFocus;
			var onKeyDown = _props.onKeyDown;
			var onMouseDown = _props.onMouseDown;
			var triggerRef = _props.triggerRef;

			var rest = _objectWithoutProperties(_props, ['active', 'activeBackgroundColor', 'className', 'dividerPosition', 'id', 'label', 'menu', 'onBlur', 'onClick', 'onFocus', 'onKeyDown', 'onMouseDown', 'triggerRef']);

			var listItemstyle = active ? { backgroundColor: activeBackgroundColor, borderBottomColor: activeBackgroundColor } : null;

			return _react2.default.createElement(
				'li',
				{
					'aria-haspopup': 'true',
					className: (0, _classnames2.default)('slds-context-bar__item slds-context-bar-action slds-dropdown-trigger', _defineProperty({
						'slds-is-active': active
					}, 'slds-context-bar__item--divider-' + dividerPosition, dividerPosition), className),
					id: id,
					onBlur: onBlur,
					onClick: onClick,
					onFocus: onFocus,
					onKeyDown: onKeyDown,
					onMouseDown: onMouseDown,
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
						ref: triggerRef,
						variant: 'icon'
					})),
					menu
				)
			);
		}
	});

	module.exports = GlobalNavigationDropdownTrigger;
});