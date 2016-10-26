define(['module', 'react', 'classnames', '../icon/button-icon', '../popover-tooltip/trigger', 'lodash.omit', '../../utilities/constants'], function (module, _react, _classnames, _buttonIcon, _trigger, _lodash, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _buttonIcon2 = _interopRequireDefault(_buttonIcon);

	var _trigger2 = _interopRequireDefault(_trigger);

	var _lodash2 = _interopRequireDefault(_lodash);

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

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	var _get = function get(object, property, receiver) {
		if (object === null) object = Function.prototype;
		var desc = Object.getOwnPropertyDescriptor(object, property);

		if (desc === undefined) {
			var parent = Object.getPrototypeOf(object);

			if (parent === null) {
				return undefined;
			} else {
				return get(parent, property, receiver);
			}
		} else if ("value" in desc) {
			return desc.value;
		} else {
			var getter = desc.get;

			if (getter === undefined) {
				return undefined;
			}

			return getter.call(receiver);
		}
	};

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var displayName = _constants.BUTTON;
	var propTypes = {
		/**
   * Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means.
   * If the button has an icon and a visible label, you can omit the <code>assistiveText</code> prop and use the <code>label</code> prop.
   */
		assistiveText: _react.PropTypes.string,
		/**
   * CSS classes to be added to button.
   */
		className: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
		/**
   * Disables the button and adds disabled styling.
   */
		disabled: _react.PropTypes.bool,
		/**
   * Associates an icon button with another element on the page by changes the color of the SVG. Please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#hint">Lightning Design System Buttons > Hint</a>.
   */
		hint: _react.PropTypes.bool,
		/**
   * Name of the icon category. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon categories.
   */
		iconCategory: _react.PropTypes.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']),
		/**
   * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
   */
		iconName: _react.PropTypes.string,
		/**
   * If omitted, icon position is centered.
   */
		iconPosition: _react.PropTypes.oneOf(['left', 'right']),
		/**
   * Determines the size of the icon.
   */
		iconSize: _react.PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
		/**
   * For icon variants, please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#icon">Lightning Design System Icons</a>.
   */
		iconVariant: _react.PropTypes.oneOf(['bare', 'container', 'border', 'border-filled', 'more', 'global-header']),
		/**
   * For icon variants, please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#icon">Lightning Design System Icons</a>.
   */
		id: _react.PropTypes.string,
		/**
  	* If true, button/icon is white. Meant for buttons or utility icons on dark backgrounds.
   */
		inverse: _react.PropTypes.bool,
		/**
   * Visible label on the button. If the button is an icon button with no label, you must use the <code>assistiveText</code> prop.
   */
		label: _react.PropTypes.string,
		/**
   * Triggered when the button is clicked.
   */
		onClick: _react.PropTypes.func,
		/**
   * If true, button scales to 100% width on small form factors.
   */
		responsive: _react.PropTypes.bool,
		/**
   * Write <code>"-1"</code> if you don't want the user to tab to the button.
   */
		tabIndex: _react.PropTypes.string,
		/**
   * It creates a tooltip with the content of the `node` provided.
   */
		tooltip: _react.PropTypes.node,
		/**
   * HTML title attribute
   */
		title: _react.PropTypes.string,
		variant: _react2.default.PropTypes.oneOf(['base', 'neutral', 'brand', 'destructive', 'icon'])
	};
	var defaultProps = {
		disabled: false,
		hint: false,
		iconSize: 'medium',
		iconCategory: 'utility',
		responsive: false,
		variant: 'neutral'
	};

	/**
  * The Button component is the Lightning Design System Button component. The Button should be used for label buttons, icon buttons, or buttons that have both labels and icons.
  * Either a <code>label</code> or <code>assistiveText</code> is required; see the Prop Details table below.
  * For buttons that maintain selected/unselected states, use the <a href="#/button-stateful">ButtonStateful</a> component.
  */

	var Button = function (_TooltipTrigger) {
		_inherits(Button, _TooltipTrigger);

		function Button(props) {
			_classCallCheck(this, Button);

			var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));

			_this.state = { active: false };
			_this.handleClick = _this.handleClick.bind(_this);
			return _this;
		}

		_createClass(Button, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				_get(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), 'componentDidMount', this).call(this);
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				_get(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), 'componentWillUnmount', this).call(this);
			}
		}, {
			key: 'handleClick',
			value: function handleClick(event) {
				// Note that you can't read properties directly from the Synthetic event but you can read them by calling the specific property (ie. event.target, event.type, etc).
				// http://stackoverflow.com/questions/22123055/react-keyboard-event-handlers-all-null
				if (this.props.onClick) this.props.onClick(event);
				this.setState({ active: !this.state.active });
			}
		}, {
			key: 'getClassName',
			value: function getClassName() {
				var _classNames;

				var isIcon = this.props.variant === 'icon';

				var iconVariant = this.props.iconVariant;
				var iconMore = iconVariant === 'more';
				var iconBorder = iconVariant === 'border';
				var iconGlobalHeader = iconVariant === 'global-header';

				var showButtonVariant = this.props.variant !== 'base' && !iconVariant && !this.props.inverse;
				var plainInverseBtn = this.props.inverse && !isIcon;
				var plainInverseIcon = this.props.inverse && isIcon && !iconMore && !iconBorder;
				var moreInverseIcon = this.props.inverse && iconMore;
				var borderInverseIcon = this.props.inverse && iconBorder;

				// After hijacking `iconVariant` to let `Button` know it's in the header, we reset to container style for the actual button CSS.
				if (iconVariant === 'global-header') {
					iconVariant = 'container';
				}

				return (0, _classnames2.default)('slds-button', (_classNames = {}, _defineProperty(_classNames, 'slds-button--' + this.props.variant, showButtonVariant), _defineProperty(_classNames, 'slds-button--inverse', plainInverseBtn), _defineProperty(_classNames, 'slds-button--icon-inverse', plainInverseIcon || moreInverseIcon), _defineProperty(_classNames, 'slds-button--icon-border-inverse slds-align-middle slds-line-height--reset', borderInverseIcon), _defineProperty(_classNames, 'slds-button--icon-' + iconVariant, iconVariant && !borderInverseIcon), _defineProperty(_classNames, 'slds-global-header__button--icon', iconGlobalHeader), _defineProperty(_classNames, 'slds-button--icon-' + this.props.iconSize, iconVariant && this.props.iconSize !== 'medium'), _classNames), this.props.className);
			}
		}, {
			key: 'renderIcon',
			value: function renderIcon(name) {
				var iconSize = this.props.iconSize === '' || this.props.iconVariant ? null : this.props.iconSize;
				return _react2.default.createElement(_buttonIcon2.default, {
					category: this.props.category,
					className: (0, _classnames2.default)({
						'slds-global-header__icon': this.props.iconVariant === 'global-header'
					}, this.props.iconClassName),
					hint: this.props.hint,
					inverse: this.props.inverse,
					name: name,
					position: this.props.iconPosition,
					size: iconSize
				});
			}
		}, {
			key: 'renderLabel',
			value: function renderLabel() {
				var iconOnly = this.props.variant === 'icon';

				return iconOnly && this.props.assistiveText ? _react2.default.createElement(
					'span',
					{ className: 'slds-assistive-text' },
					this.props.assistiveText
				) : _react2.default.createElement(
					'span',
					null,
					this.props.label
				);
			}
		}, {
			key: 'render',
			value: function render() {
				var props = (0, _lodash2.default)(this.props, ['assistiveText', 'className', 'hint', 'iconCategory', 'iconName', 'iconPosition', 'iconSize', 'iconVariant', 'inverse', 'label', 'onClick', 'responsive', 'tooltip', 'variant']);

				return _react2.default.createElement(
					'button',
					_extends({
						className: this.getClassName()
					}, props, {
						onClick: this.handleClick
					}),
					this.props.iconPosition === 'right' ? this.renderLabel() : null,
					this.props.iconName ? this.renderIcon(this.props.iconName) : null,
					this.props.iconVariant === 'more' ? _react2.default.createElement(_buttonIcon2.default, { category: 'utility', name: 'down', size: 'x-small' }) : null,
					this.props.iconPosition === 'left' || !this.props.iconPosition ? this.renderLabel() : null,
					this.props.children,
					this.getTooltip()
				);
			}
		}]);

		return Button;
	}(_trigger2.default);

	Button.displayName = displayName;
	Button.propTypes = propTypes;
	Button.defaultProps = defaultProps;

	module.exports = Button;
});