define(['exports', 'react', 'prop-types', '../utilities/dialog', '../../components/forms/input/private/inner-input', '../icon/input-icon', './private/menu', '../forms/private/label', './private/selected-listbox', 'lodash.assign', 'lodash.find', 'lodash.reject', 'lodash.isequal', 'airbnb-prop-types', 'lodash.isboolean', 'lodash.isfunction', 'classnames', 'shortid', '../../utilities/key-code', '../../utilities/key-callbacks', '../../utilities/constants'], function (exports, _react, _propTypes, _dialog, _innerInput, _inputIcon, _menu, _label, _selectedListbox, _lodash, _lodash3, _lodash5, _lodash7, _airbnbPropTypes, _lodash9, _lodash11, _classnames, _shortid, _keyCode, _keyCallbacks, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _dialog2 = _interopRequireDefault(_dialog);

	var _innerInput2 = _interopRequireDefault(_innerInput);

	var _inputIcon2 = _interopRequireDefault(_inputIcon);

	var _menu2 = _interopRequireDefault(_menu);

	var _label2 = _interopRequireDefault(_label);

	var _selectedListbox2 = _interopRequireDefault(_selectedListbox);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _lodash4 = _interopRequireDefault(_lodash3);

	var _lodash6 = _interopRequireDefault(_lodash5);

	var _lodash8 = _interopRequireDefault(_lodash7);

	var _lodash10 = _interopRequireDefault(_lodash9);

	var _lodash12 = _interopRequireDefault(_lodash11);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _shortid2 = _interopRequireDefault(_shortid);

	var _keyCode2 = _interopRequireDefault(_keyCode);

	var _keyCallbacks2 = _interopRequireDefault(_keyCallbacks);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _toConsumableArray(arr) {
		if (Array.isArray(arr)) {
			for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
				arr2[i] = arr[i];
			}

			return arr2;
		} else {
			return Array.from(arr);
		}
	}

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

	var currentOpenDropdown = void 0;

	var propTypes = {
		/**
   * **Assistive text for accessibility**
   * This object is merged with the default props object on every render.
   * * `label`: This is used as a visually hidden label if, no `labels.label` is provided.
   * * `optionSelectedInMenu`: Added before selected menu items in Read-only variants (Picklists). The default is `Current Selection:`.
   * * `removeSingleSelectedOption`: Used by inline-listbox, single-select variant to remove the selected item (pill). This is a button with focus. The default is `Remove selected option`.
   * * `removePill`: Used by multiple selection Comboboxes to remove a selected item (pill). Focus is on the pill. This is not a button. The default  is `, Press delete or backspace to remove`.
   * * `selectedListboxLabel`: This is a label for the selected listbox. The grouping of pills for multiple selection Comboboxes. The default is `Selected Options:`.
   * _Tested with snapshot testing._
   */
		assistiveText: (0, _airbnbPropTypes.shape)({
			label: _propTypes2.default.string,
			optionSelectedInMenu: _propTypes2.default.string,
			removeSingleSelectedOption: _propTypes2.default.string,
			removePill: _propTypes2.default.string,
			selectedListboxLabel: _propTypes2.default.string
		}),
		/**
   * CSS classes to be added to tag with `.slds-combobox`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
   */
		className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
		/**
   * CSS classes to be added to tag with `.slds-dropdown`. Uses `classNames` [API](https://github.com/JedWatson/classnames). Autocomplete/bass variant menu height should not scroll and should be determined by number items which should be no more than 10.
   */
		classNameMenu: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
		/**
   * Event Callbacks
   * * `onBlur`: Called when `input` removes focus.
   * * `onChange`: Called when keyboard events occur within `input`
   * * `onClose`: Triggered when the menu has closed.
   * * `onFocus`: Called when `input` receives focus.
   * * `onOpen`: Triggered when the menu has opened.
   * * `onRequestClose`: Function called when the menu would like to hide. Please use with `isOpen`.
   * * `onRequestOpen`:  Function called when the menu would like to show. Please use with `isOpen`.
   * * `onRequestRemoveSelectedOption`: Function called when a single selection option is to be removed.
   * * `onSelect`: Function called when a menu item is selected
   * * `onSubmit`: Function called when user presses enter or submits the `input`
   * _Tested with Mocha testing._
   */
		events: (0, _airbnbPropTypes.shape)({
			onBlur: _propTypes2.default.func,
			onChange: _propTypes2.default.func,
			onClose: _propTypes2.default.func,
			onFocus: _propTypes2.default.func,
			onOpen: _propTypes2.default.func,
			onRequestClose: _propTypes2.default.func,
			onRequestOpen: _propTypes2.default.func,
			onRequestRemoveSelectedOption: _propTypes2.default.func,
			onSelect: _propTypes2.default.func,
			onSubmit: _propTypes2.default.func
		}),
		/**
   * HTML id for component. _Tested with snapshot testing._
   */
		id: _propTypes2.default.string,
		/**
   * Renders menu within the wrapping trigger as a sibling of the input. By default, you will have an absolutely positioned container at an elevated z-index. _Tested with snapshot testing._
   */
		isInline: _propTypes2.default.bool,
		/**
   * **Text labels for internationalization**
   * This object is merged with the default props object on every render.
   * * `label`: This label appears above the input.
   * * `multipleOptionsSelected`: This label is used by the readonly variant when multiple options are selected. The default is `${props.selection.length} options selected`. This will override the entire string.
   * * `noOptionsFound`: Custom message that renders when no matches found. The default empty state is just text that says, 'No matches found.'.
   * * `placeholder`: Input placeholder
   * * `placeholderReadOnly`: Placeholder for Picklist-like Combobox
   * * `removePillTitle`: Title on `X` icon
   * _Tested with snapshot testing._
   */
		labels: (0, _airbnbPropTypes.shape)({
			label: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),
			multipleOptionsSelected: _propTypes2.default.string,
			noOptionsFound: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),
			placeholder: _propTypes2.default.string,
			placeholderReadOnly: _propTypes2.default.string,
			removePillTitle: _propTypes2.default.string
		}),
		/**
   * Forces the dropdown to be open or closed. See controlled/uncontrolled callback/prop pattern for more on suggested use view [Concepts and Best Practices](https://github.com/salesforce-ux/design-system-react/blob/master/CONTRIBUTING.md#concepts-and-best-practices) _Tested with snapshot testing._
   */
		isOpen: _propTypes2.default.bool,
		/**
   * Allows multiple selections _Tested with mocha testing._
   */
		multiple: _propTypes2.default.bool,
		/**
   * Item added to the dropdown menu. _Tested with snapshot testing._
   */
		options: _propTypes2.default.array.isRequired,
		/**
   * Determines the height of the menu based on SLDS CSS classes. This only applies to the readonly variant. This is a `number`.
   */
		readOnlyMenuItemVisibleLength: _propTypes2.default.oneOf([5, 7, 10]),
		/**
   * Limits auto-complete input submission to one of the provided options. _Tested with mocha testing._
   */
		predefinedOptionsOnly: _propTypes2.default.bool,
		/**
   * Accepts an array of item objects. For single selection, pass in an array of one object. _Tested with snapshot testing._
   */
		selection: _propTypes2.default.array,
		/**
   * Value of input. This is a controlled component, so you will need to control the input value. _Tested with snapshot testing._
   */
		value: _propTypes2.default.string,
		/**
   * Changes styles of the input. Currently `entity` is not supported. _Tested with snapshot testing._
   */
		variant: _propTypes2.default.oneOf(['base', 'inline-listbox', 'readonly'])
	};

	var defaultProps = {
		assistiveText: {
			optionSelectedInMenu: 'Current Selection:',
			removeSingleSelectedOption: 'Remove selected option',
			removePill: ', Press delete or backspace to remove',
			selectedListboxLabel: 'Selected Options:'
		},
		events: {},
		labels: {
			noOptionsFound: 'No matches found.',
			placeholderReadOnly: 'Select an Option',
			removePillTitle: 'Remove'
		},
		readOnlyMenuItemVisibleLength: 5,
		selection: [],
		variant: 'base'
	};

	/**
  * A widget that provides a user with an input field that is either an autocomplete or readonly, accompanied with a listbox of pre-definfined options.
  */

	var Combobox = function (_React$Component) {
		_inherits(Combobox, _React$Component);

		function Combobox(props) {
			_classCallCheck(this, Combobox);

			var _this = _possibleConstructorReturn(this, (Combobox.__proto__ || Object.getPrototypeOf(Combobox)).call(this, props));

			_initialiseProps.call(_this);

			_this.state = {
				isOpen: false,
				activeOption: undefined,
				activeOptionIndex: -1,
				// seeding initial state with this.props.selection[0]
				activeSelectedOption: _this.props.selection && _this.props.selection[0] || undefined,
				activeSelectedOptionIndex: 0
			};
			return _this;
		}

		/**
  	 * Lifecycle methods
    */

		_createClass(Combobox, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				this.generatedId = _shortid2.default.generate();
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				var _this2 = this;

				// This logic will maintain the active highlight even when the
				// option order changes. One example would be the server pushes
				// data out as the user has the menu open. This logic clears
				// `activeOption` if the active option is no longer in the options
				// list. If it's in the options list, then find the new index and
				// set `activeOptionIndex`
				if (!(0, _lodash8.default)(this.props.options, nextProps.options)) {
					var index = nextProps.options.findIndex(function (item) {
						return (0, _lodash8.default)(item, _this2.state.activeOption);
					});
					if (index !== -1) {
						this.setState({ activeOptionIndex: index });
					} else {
						this.setState({ activeOption: undefined, activeOptionIndex: -1 });
					}
				}

				// there may be issues with tabindex/focus if the app removes an item
				// from selection while the user is using the listbox
				var selectedOptionsRenderIsInitialRender = this.props.selection && this.props.selection.length === 0 && nextProps.selection.length > 0;
				if (selectedOptionsRenderIsInitialRender) {
					this.setState({ activeSelectedOption: nextProps.selection[0], activeSelectedOptionIndex: 0 });
				}
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				if (currentOpenDropdown === this) {
					currentOpenDropdown = undefined;
				}
			}
		}, {
			key: 'getInlineMenu',
			value: function getInlineMenu(_ref) {
				var menuRenderer = _ref.menuRenderer;

				return !this.props.disabled && this.getIsOpen() // eslint-disable-line react/prop-types
				? menuRenderer : null;
			}
		}, {
			key: 'getDialog',
			value: function getDialog(_ref2) {
				var menuRenderer = _ref2.menuRenderer;

				return !this.props.disabled && this.getIsOpen() // eslint-disable-line react/prop-types
				? _react2.default.createElement(
					_dialog2.default,
					{
						constrainToScrollParent: true,
						flippable: true,
						horizontalAlign: 'left',
						inheritTargetWidth: true,
						onClose: this.handleClose,
						onOpen: this.handleOpen,
						targetElement: this.inputRef
					},
					menuRenderer
				) : null;
			}
		}, {
			key: 'render',
			value: function render() {
				var props = this.props;
				// Merge objects of strings with their default object
				var assistiveText = (0, _lodash2.default)({}, defaultProps.assistiveText, props.assistiveText);
				var labels = (0, _lodash2.default)({}, defaultProps.labels, props.labels);

				var subRenderParameters = { assistiveText: assistiveText, labels: labels, props: props };
				var multipleOrSingle = this.props.multiple ? 'multiple' : 'single';
				var subRenders = {
					base: {
						multiple: this.renderBase, // same
						single: this.renderBase
					},
					'inline-listbox': {
						multiple: this.renderInlineMultiple,
						single: this.renderInlineSingle
					},
					readonly: {
						multiple: this.renderReadOnlyMultiple,
						single: this.renderReadOnlySingle
					}
				};
				var variantExists = subRenders[this.props.variant][multipleOrSingle];

				return _react2.default.createElement(
					'div',
					{
						className: 'slds-form-element'
					},
					_react2.default.createElement(_label2.default, {
						assistiveText: props.assistiveText.label,
						htmlFor: this.getId(),
						label: labels.label
					}),
					variantExists ? subRenders[this.props.variant][multipleOrSingle](subRenderParameters) : subRenders.base.multiple(subRenderParameters)
				);
			}
		}]);

		return Combobox;
	}(_react2.default.Component);

	var _initialiseProps = function _initialiseProps() {
		var _this3 = this;

		this.getId = function () {
			return _this3.props.id || _this3.generatedId;
		};

		this.getIsOpen = function () {
			return !!((0, _lodash10.default)(_this3.props.isOpen) ? _this3.props.isOpen : _this3.state.isOpen);
		};

		this.getIsActiveOption = function () {
			return _this3.state.activeOption && _this3.state.activeOptionIndex !== -1;
		};

		this.getNewActiveOptionIndex = function (_ref3) {
			var activeOptionIndex = _ref3.activeOptionIndex,
			    offset = _ref3.offset,
			    options = _ref3.options;

			// used by menu listbox and selected options listbox
			var newIndex = activeOptionIndex + offset;
			var hasNewIndex = options.length > newIndex && newIndex >= 0;
			return hasNewIndex ? newIndex : activeOptionIndex;
		};

		this.isSelected = function (_ref4) {
			var selection = _ref4.selection,
			    option = _ref4.option;
			return !!(0, _lodash4.default)(selection, option);
		};

		this.handleClickOutside = function () {
			_this3.handleRequestClose();
		};

		this.handleRequestClose = function () {
			if (_this3.props.events.onRequestClose) {
				_this3.props.events.onRequestClose();
			}

			if (_this3.getIsOpen()) {
				_this3.setState({ isOpen: false });
			}
		};

		this.openDialog = function () {
			if (_this3.props.events.onRequestOpen) {
				_this3.props.events.onRequestOpen();
			} else {
				_this3.setState({
					isOpen: true
				});
			}
		};

		this.handleClose = function () {
			var isOpen = _this3.getIsOpen();

			if (isOpen) {
				if (currentOpenDropdown === _this3) {
					currentOpenDropdown = undefined;
				}

				_this3.setState({
					activeOption: undefined,
					activeOptionIndex: -1,
					isOpen: false
				});

				if (_this3.props.events.onClose) {
					_this3.props.events.onClose();
				}
			}
		};

		this.handleOpen = function () {
			var isOpen = _this3.getIsOpen();

			if (!isOpen) {
				if (currentOpenDropdown && (0, _lodash12.default)(currentOpenDropdown.handleClose)) {
					currentOpenDropdown.handleClose();
				}

				currentOpenDropdown = _this3;

				_this3.setState({
					isOpen: true
				});

				if (_this3.props.events.onOpen) {
					_this3.props.events.onOpen();
				}
			}
		};

		this.requestOpenMenu = function () {
			var isInlineSingleSelectionAndIsNotSelected = !_this3.props.multiple && _this3.props.selection.length === 0 && _this3.props.variant === 'inline-listbox';

			if (isInlineSingleSelectionAndIsNotSelected || _this3.props.multiple || _this3.props.variant === 'readonly') {
				_this3.openDialog();
			}
		};

		this.renderMenu = function (_ref5) {
			var assistiveText = _ref5.assistiveText,
			    labels = _ref5.labels;

			var menuVariant = {
				base: 'icon-title-subtitle',
				'inline-listbox': 'icon-title-subtitle',
				readonly: 'checkbox'
			};

			return _react2.default.createElement(_menu2.default, {
				assistiveText: assistiveText,
				activeOption: _this3.state.activeOption,
				activeOptionIndex: _this3.state.activeOptionIndex,
				className: _this3.props.classNameMenu,
				inputId: _this3.getId(),
				inputValue: _this3.props.value,
				isSelected: _this3.isSelected,
				itemVisibleLength: _this3.props.variant === 'readonly' ? _this3.props.readOnlyMenuItemVisibleLength : null,
				labels: labels,
				options: _this3.props.options,
				onSelect: _this3.handleSelect,
				clearActiveOption: _this3.clearActiveOption,
				selection: _this3.props.selection,
				variant: menuVariant[_this3.props.variant]
			});
		};

		this.handleKeyDown = function (event) {
			var _callbacks;

			// Helper function that takes an object literal of callbacks that are triggered with a key event
			(0, _keyCallbacks2.default)(event, {
				callbacks: (_callbacks = {}, _defineProperty(_callbacks, _keyCode2.default.DOWN, { callback: _this3.handleKeyDownDown }), _defineProperty(_callbacks, _keyCode2.default.ENTER, { callback: _this3.handleInputSubmit }), _defineProperty(_callbacks, _keyCode2.default.ESCAPE, { callback: _this3.handleClose }), _defineProperty(_callbacks, _keyCode2.default.UP, { callback: _this3.handleKeyDownUp }), _callbacks)
			});
		};

		this.handleNavigateListboxMenu = function (event, _ref6) {
			var direction = _ref6.direction;

			var offsets = { next: 1, previous: -1 };
			// takes current/previous state and returns an object with the new state
			_this3.setState(function (prevState) {
				var newIndex = _this3.getNewActiveOptionIndex({
					activeOptionIndex: prevState.activeOptionIndex,
					offset: offsets[direction],
					options: _this3.props.options
				});

				return {
					activeOption: _this3.props.options[newIndex],
					activeOptionIndex: newIndex
				};
			});
		};

		this.handleSelect = function (event, _ref7) {
			var selection = _ref7.selection,
			    option = _ref7.option;

			var newSelection = void 0;
			var isSelected = _this3.isSelected({ selection: selection, option: option });
			var singleSelectAndSelectedWasNotClicked = !_this3.props.multiple && !isSelected;
			var multiSelectAndSelectedWasNotClicked = _this3.props.multiple && !isSelected;

			if (singleSelectAndSelectedWasNotClicked) {
				newSelection = [option];
			} else if (multiSelectAndSelectedWasNotClicked) {
				newSelection = [].concat(_toConsumableArray(_this3.props.selection), [option]);
			} else {
				newSelection = (0, _lodash6.default)(_this3.props.selection, option);
			}

			if (_this3.props.events.onSelect) {
				_this3.props.events.onSelect(event, { selection: newSelection });
			}

			_this3.handleClose();

			if (_this3.inputRef) {
				_this3.inputRef.focus();
			}
		};

		this.handleKeyDownDown = function (event) {
			// Don't open if user is selecting text
			if (!event.shiftKey) {
				_this3.openDialog();
			}

			_this3.handleNavigateListboxMenu(event, { direction: 'next' });
		};

		this.handleKeyDownUp = function (event) {
			// Don't open if user is selecting text
			if (!event.shiftKey && _this3.state.isOpen) {
				_this3.handleNavigateListboxMenu(event, { direction: 'previous' });
			}
		};

		this.handleInputSubmit = function (event) {
			// use menu options
			if (_this3.getIsActiveOption()) {
				_this3.handleSelect(event, { option: _this3.state.activeOption, selection: _this3.props.selection });
				// use input value, if not limited to predefined options (in the menu)
			} else if (!_this3.props.predefinedOptionsOnly && event.target.value !== '' && _this3.props.events.onSubmit) {
				_this3.props.events.onSubmit(event, {
					value: event.target.value
				});
			}
		};

		this.handleInputChange = function (event) {
			_this3.requestOpenMenu();
			_this3.props.events.onChange(event, { value: event.target.value });
		};

		this.handleInputFocus = function (event) {
			if (_this3.props.events.onFocus) {
				_this3.props.events.onFocus(event);
			}
		};

		this.handleInputBlur = function (event) {
			// If menu is open when the input's onBlur event fires, it will close before the onClick of the menu item can fire.
			setTimeout(function () {
				_this3.handleClose();
			}, 200);

			if (_this3.props.events.onBlur) {
				_this3.props.events.onBlur(event);
			}
		};

		this.handleRemoveSelectedOption = function (event, _ref8) {
			var option = _ref8.option,
			    index = _ref8.index;

			var onlyOnePillAndInputExists = _this3.props.selection.length === 1;
			var isReadOnlyAndTwoPillsExists = _this3.props.selection.length === 2 && _this3.props.variant === 'readonly' && _this3.props.multiple;
			var lastPillWasRemoved = index + 1 === _this3.props.selection.length;

			if ((onlyOnePillAndInputExists || isReadOnlyAndTwoPillsExists) && _this3.inputRef) {
				_this3.inputRef.focus();
			} else if (lastPillWasRemoved) {
				// set focus to previous option and index
				_this3.setState({
					activeSelectedOption: _this3.props.selection[index - 1],
					activeSelectedOptionIndex: index - 1,
					listboxHasFocus: true
				});
			} else {
				// set focus to next option, but same index
				_this3.setState({
					activeSelectedOption: _this3.props.selection[index + 1],
					activeSelectedOptionIndex: index,
					listboxHasFocus: true
				});
			}

			if (_this3.props.events.onRequestRemoveSelectedOption) {
				_this3.props.events.onRequestRemoveSelectedOption(event, {
					selection: (0, _lodash6.default)(_this3.props.selection, option)
				});
			}
		};

		this.handlePillClickListboxOfPills = function (event, _ref9) {
			var option = _ref9.option,
			    index = _ref9.index;

			// this is clicking the span, not the remove button
			_this3.setState({
				activeSelectedOption: option,
				activeSelectedOptionIndex: index,
				listboxHasFocus: true
			});
		};

		this.handleNavigateListboxOfPills = function (event, _ref10) {
			var direction = _ref10.direction;

			var offsets = { next: 1, previous: -1 };
			_this3.setState(function (prevState) {
				var isLastOptionAndRightIsPressed = prevState.activeSelectedOptionIndex + 1 === _this3.props.selection.length && direction === 'next';
				var isFirstOptionAndLeftIsPressed = prevState.activeSelectedOptionIndex === 0 && direction === 'previous';
				var newState = void 0;

				if (isLastOptionAndRightIsPressed) {
					newState = {
						activeSelectedOption: _this3.props.selection[0],
						activeSelectedOptionIndex: 0,
						listboxHasFocus: true
					};
				} else if (isFirstOptionAndLeftIsPressed) {
					newState = {
						activeSelectedOption: _this3.props.selection[_this3.props.selection.length - 1],
						activeSelectedOptionIndex: _this3.props.selection.length - 1,
						listboxHasFocus: true
					};
				} else {
					var newIndex = _this3.getNewActiveOptionIndex({
						activeOptionIndex: prevState.activeSelectedOptionIndex,
						offset: offsets[direction],
						options: _this3.props.selection
					});
					newState = {
						activeSelectedOption: _this3.props.selection[newIndex],
						activeSelectedOptionIndex: newIndex,
						listboxHasFocus: true
					};
				}

				return newState;
			});
		};

		this.handleRequestFocusListboxOfPills = function (event, _ref11) {
			var ref = _ref11.ref;

			if (ref) {
				_this3.activeSelectedOptionRef = ref;
				_this3.activeSelectedOptionRef.focus();
			}
		};

		this.handleBlurPill = function () {
			_this3.setState({ listboxHasFocus: false });
		};

		this.renderBase = function (_ref12) {
			var assistiveText = _ref12.assistiveText,
			    labels = _ref12.labels,
			    props = _ref12.props;
			return _react2.default.createElement(
				'div',
				{ className: 'slds-form-element__control' },
				_react2.default.createElement(
					'div',
					{ className: 'slds-combobox_container' },
					_react2.default.createElement(
						'div',
						{
							className: (0, _classnames2.default)('slds-combobox', 'slds-dropdown-trigger', 'slds-dropdown-trigger_click', 'ignore-react-onclickoutside', {
								'slds-is-open': _this3.getIsOpen()
							}, props.className),
							'aria-expanded': _this3.getIsOpen(),
							'aria-haspopup': 'listbox' // eslint-disable-line jsx-a11y/aria-proptypes
							// used on menu's listbox
							, 'aria-owns': _this3.getId() + '-listbox' // eslint-disable-line jsx-a11y/aria-proptypes
							, role: 'combobox'
						},
						_react2.default.createElement(_innerInput2.default, {
							'aria-autocomplete': 'list',
							'aria-controls': _this3.getId() + '-listbox',
							'aria-activedescendant': _this3.state.activeOption ? _this3.getId() + '-listbox-option-' + _this3.state.activeOption.id : null,
							autoComplete: 'off',
							className: 'slds-combobox__input',
							containerProps: {
								className: 'slds-combobox__form-element',
								role: 'none'
							},
							iconRight: _react2.default.createElement(_inputIcon2.default, {
								category: 'utility',
								name: 'search',
								title: labels.inputIconTitle
							}),
							id: _this3.getId(),
							onFocus: _this3.handleInputFocus,
							onBlur: _this3.handleInputBlur,
							onKeyDown: _this3.handleKeyDown,
							inputRef: function inputRef(component) {
								_this3.inputRef = component;
							},
							onClick: function onClick() {
								_this3.openDialog();
							},
							onChange: _this3.handleInputChange,
							placeholder: labels.placeholder,
							readOnly: !!(props.predefinedOptionsOnly && _this3.state.activeOption),
							role: 'textbox',
							value: props.predefinedOptionsOnly ? _this3.state.activeOption && _this3.state.activeOption.label || props.value : props.value
						}),
						props.isInline ? _this3.getInlineMenu({ menuRenderer: _this3.renderMenu({ assistiveText: assistiveText, labels: labels }) }) : _this3.getDialog({ menuRenderer: _this3.renderMenu({ assistiveText: assistiveText, labels: labels }) })
					)
				),
				_react2.default.createElement(_selectedListbox2.default, {
					activeOption: _this3.state.activeSelectedOption,
					activeOptionIndex: _this3.state.activeSelectedOptionIndex,
					assistiveText: assistiveText,
					events: {
						onBlurPill: _this3.handleBlurPill,
						onClickPill: _this3.handlePillClickListboxOfPills,
						onRequestFocus: _this3.handleRequestFocusListboxOfPills,
						onRequestFocusOnNextPill: _this3.handleNavigateListboxOfPills,
						onRequestFocusOnPreviousPill: _this3.handleNavigateListboxOfPills,
						onRequestRemove: _this3.handleRemoveSelectedOption
					},
					id: _this3.getId(),
					labels: labels,
					selection: props.selection,
					listboxHasFocus: _this3.state.listboxHasFocus
				})
			);
		};

		this.renderInlineSingle = function (_ref13) {
			var assistiveText = _ref13.assistiveText,
			    labels = _ref13.labels,
			    props = _ref13.props;

			var iconLeft = props.selection[0] && props.selection[0].icon ? _react2.default.cloneElement(props.selection[0].icon, {
				containerClassName: 'slds-combobox__input-entity-icon'
			}) : null;

			var value = props.selection[0] && props.selection[0].label ? props.selection[0].label : props.value;

			/* eslint-disable jsx-a11y/role-supports-aria-props */
			return _react2.default.createElement(
				'div',
				{ className: 'slds-form-element__control' },
				_react2.default.createElement(
					'div',
					{
						className: (0, _classnames2.default)('slds-combobox_container', {
							'slds-has-inline-listbox': props.selection.length
						})
					},
					_react2.default.createElement(
						'div',
						{
							className: (0, _classnames2.default)('slds-combobox', 'slds-dropdown-trigger', 'slds-dropdown-trigger_click', 'ignore-react-onclickoutside', {
								'slds-is-open': _this3.getIsOpen()
							}, props.className),
							'aria-expanded': _this3.getIsOpen(),
							'aria-haspopup': 'listbox' // eslint-disable-line jsx-a11y/aria-proptypes
							, role: 'combobox'
						},
						_react2.default.createElement(_innerInput2.default, {
							'aria-autocomplete': 'list',
							'aria-controls': _this3.getId() + '-listbox',
							'aria-activedescendant': _this3.state.activeOption ? _this3.getId() + '-listbox-option-' + _this3.state.activeOption.id : null,
							autoComplete: 'off',
							className: 'slds-combobox__input',
							containerProps: {
								className: 'slds-combobox__form-element',
								role: 'none'
							},
							iconRight: props.selection.length ? _react2.default.createElement(_inputIcon2.default, {
								assistiveText: assistiveText.removeSingleSelectedOption,
								buttonRef: function buttonRef(component) {
									_this3.buttonRef = component;
								},
								category: 'utility',
								iconPosition: 'right',
								name: 'close',
								onClick: function onClick(event) {
									_this3.handleRemoveSelectedOption(event, { option: props.selection[0] });
								}
							}) : _react2.default.createElement(_inputIcon2.default, {
								category: 'utility',
								name: 'search'
							}),
							iconLeft: iconLeft,
							id: _this3.getId(),
							onFocus: _this3.handleInputFocus,
							onBlur: _this3.handleInputBlur,
							onKeyDown: _this3.handleKeyDown,
							inputRef: function inputRef(component) {
								_this3.inputRef = component;
							},
							onClick: function onClick() {
								_this3.requestOpenMenu();
							},
							onChange: function onChange(event) {
								if (!props.selection.length) {
									_this3.handleInputChange(event);
								}
							},
							placeholder: labels.placeholder,
							readOnly: !!(props.predefinedOptionsOnly && _this3.state.activeOption) || !!props.selection.length,
							role: 'textbox',
							value: props.predefinedOptionsOnly ? _this3.state.activeOption && _this3.state.activeOption.label || props.value : value
						}),
						props.isInline ? _this3.getInlineMenu({ menuRenderer: _this3.renderMenu({
								assistiveText: assistiveText,
								labels: labels
							}) }) : _this3.getDialog({ menuRenderer: _this3.renderMenu({ assistiveText: assistiveText,
								labels: labels
							}) })
					)
				)
			);
		};

		this.renderInlineMultiple = function (_ref14) {
			var assistiveText = _ref14.assistiveText,
			    labels = _ref14.labels,
			    props = _ref14.props;
			return _react2.default.createElement(
				'div',
				{ className: 'slds-form-element__control' },
				_react2.default.createElement(
					'div',
					{
						className: (0, _classnames2.default)('slds-combobox_container', {
							'slds-has-inline-listbox': props.selection.length
						})
					},
					props.selection.length ? _react2.default.createElement(_selectedListbox2.default, {
						activeOption: _this3.state.activeSelectedOption,
						activeOptionIndex: _this3.state.activeSelectedOptionIndex,
						assistiveText: assistiveText,
						events: {
							onBlurPill: _this3.handleBlurPill,
							onClickPill: _this3.handlePillClickListboxOfPills,
							onRequestFocus: _this3.handleRequestFocusListboxOfPills,
							onRequestFocusOnNextPill: _this3.handleNavigateListboxOfPills,
							onRequestFocusOnPreviousPill: _this3.handleNavigateListboxOfPills,
							onRequestRemove: _this3.handleRemoveSelectedOption
						},
						id: _this3.getId(),
						labels: labels,
						selection: props.selection,
						listboxHasFocus: _this3.state.listboxHasFocus
					}) : null,
					_react2.default.createElement(
						'div',
						{
							className: (0, _classnames2.default)('slds-combobox', 'slds-dropdown-trigger', 'slds-dropdown-trigger_click', 'ignore-react-onclickoutside', {
								'slds-is-open': _this3.getIsOpen()
							}, props.className),
							'aria-expanded': _this3.getIsOpen(),
							'aria-haspopup': 'listbox' // eslint-disable-line jsx-a11y/aria-proptypes
							, role: 'combobox'
						},
						_react2.default.createElement(_innerInput2.default, {
							'aria-autocomplete': 'list',
							'aria-controls': _this3.getId() + '-listbox',
							'aria-activedescendant': _this3.state.activeOption ? _this3.getId() + '-listbox-option-' + _this3.state.activeOption.id : null,
							autoComplete: 'off',
							className: 'slds-combobox__input',
							containerProps: {
								'aria-expanded': _this3.getIsOpen(),
								'aria-haspopup': 'listbox',
								className: 'slds-combobox__form-element',
								role: 'none'
							},
							iconRight: _react2.default.createElement(_inputIcon2.default, {
								category: 'utility',
								name: 'search',
								title: labels.inputIconTitle
							}),
							id: _this3.getId(),
							onFocus: _this3.handleInputFocus,
							onBlur: _this3.handleInputBlur,
							onKeyDown: _this3.handleKeyDown,
							inputRef: function inputRef(component) {
								_this3.inputRef = component;
							},
							onClick: function onClick() {
								_this3.openDialog();
							},
							onChange: _this3.handleInputChange,
							placeholder: labels.placeholder,
							readOnly: !!(props.predefinedOptionsOnly && _this3.state.activeOption),
							role: 'textbox',
							value: props.predefinedOptionsOnly ? _this3.state.activeOption && _this3.state.activeOption.label || props.value : props.value
						}),
						props.isInline ? _this3.getInlineMenu({ menuRenderer: _this3.renderMenu({ assistiveText: assistiveText, labels: labels }) }) : _this3.getDialog({ menuRenderer: _this3.renderMenu({ assistiveText: assistiveText, labels: labels }) })
					)
				)
			);
		};

		this.renderReadOnlySingle = function (_ref15) {
			var assistiveText = _ref15.assistiveText,
			    labels = _ref15.labels,
			    props = _ref15.props;

			var value = props.selection[0] && props.selection[0].label || '';

			/* eslint-disable jsx-a11y/role-supports-aria-props */
			return _react2.default.createElement(
				'div',
				{ className: 'slds-form-element__control' },
				_react2.default.createElement(
					'div',
					{ className: 'slds-combobox_container' },
					_react2.default.createElement(
						'div',
						{ // aria attributes have been moved to the `div` wrapping `input` to comply with ARIA 1.1.
							className: (0, _classnames2.default)('slds-combobox', 'slds-dropdown-trigger', 'slds-dropdown-trigger_click', 'ignore-react-onclickoutside', {
								'slds-is-open': _this3.getIsOpen()
							}, props.className),
							'aria-expanded': _this3.getIsOpen(),
							'aria-haspopup': 'listbox' // eslint-disable-line jsx-a11y/aria-proptypes
							, role: 'combobox'
						},
						_react2.default.createElement(_innerInput2.default, {
							'aria-autocomplete': 'list',
							'aria-controls': _this3.getId() + '-listbox',
							'aria-activedescendant': _this3.state.activeOption ? _this3.getId() + '-listbox-option-' + _this3.state.activeOption.id : null,
							autoComplete: 'off',
							className: 'slds-combobox__input',
							containerProps: {
								'aria-expanded': _this3.getIsOpen(),
								'aria-haspopup': 'listbox',
								className: 'slds-combobox__form-element',
								role: 'none'
							},
							iconRight: _react2.default.createElement(_inputIcon2.default, {
								category: 'utility',
								name: 'down',
								variant: 'combobox'
							}),
							id: _this3.getId(),
							onFocus: _this3.handleInputFocus,
							onBlur: _this3.handleInputBlur,
							onKeyDown: _this3.handleKeyDown,
							inputRef: function inputRef(component) {
								_this3.inputRef = component;
							},
							onClick: function onClick() {
								_this3.requestOpenMenu();
							},
							onChange: function onChange(event) {
								if (!props.selection.length) {
									_this3.handleInputChange(event);
								}
							},
							placeholder: labels.placeholderReadOnly,
							readOnly: true,
							role: 'textbox',
							value: _this3.state.activeOption && _this3.state.activeOption.label || value
						}),
						props.isInline ? _this3.getInlineMenu({ menuRenderer: _this3.renderMenu({ assistiveText: assistiveText, labels: labels }) }) : _this3.getDialog({ menuRenderer: _this3.renderMenu({ assistiveText: assistiveText, labels: labels }) })
					)
				)
			);
		};

		this.renderReadOnlyMultiple = function (_ref16) {
			var assistiveText = _ref16.assistiveText,
			    labels = _ref16.labels,
			    props = _ref16.props;

			var value = props.selection.length > 1 ? labels.multipleOptionsSelected || props.selection.length + ' options selected' : props.selection[0] && props.selection[0].label || '';

			/* eslint-disable jsx-a11y/role-supports-aria-props */
			return _react2.default.createElement(
				'div',
				{ className: 'slds-form-element__control' },
				_react2.default.createElement(
					'div',
					{ className: 'slds-combobox_container' },
					_react2.default.createElement(
						'div',
						{
							className: (0, _classnames2.default)('slds-combobox', 'slds-dropdown-trigger', 'slds-dropdown-trigger_click', 'ignore-react-onclickoutside', {
								'slds-is-open': _this3.getIsOpen()
							}, props.className),
							'aria-expanded': _this3.getIsOpen(),
							'aria-haspopup': 'listbox' // eslint-disable-line jsx-a11y/aria-proptypes
							, role: 'combobox'
						},
						_react2.default.createElement(_innerInput2.default, {
							'aria-autocomplete': 'list',
							'aria-controls': _this3.getId() + '-listbox',
							'aria-activedescendant': _this3.state.activeOption ? _this3.getId() + '-listbox-option-' + _this3.state.activeOption.id : null,
							autoComplete: 'off',
							className: 'slds-combobox__input',
							containerProps: {
								'aria-expanded': _this3.getIsOpen(),
								'aria-haspopup': 'listbox',
								className: 'slds-combobox__form-element',
								role: 'none'
							},
							iconRight: _react2.default.createElement(_inputIcon2.default, {
								category: 'utility',
								name: 'down',
								variant: 'combobox'
							}),
							id: _this3.getId(),
							onFocus: _this3.handleInputFocus,
							onBlur: _this3.handleInputBlur,
							onKeyDown: _this3.handleKeyDown,
							inputRef: function inputRef(component) {
								_this3.inputRef = component;
							},
							onClick: function onClick() {
								_this3.requestOpenMenu();
							},
							onChange: function onChange(event) {
								if (!props.selection.length) {
									_this3.handleInputChange(event);
								}
							},
							placeholder: labels.placeholderReadOnly,
							readOnly: true,
							role: 'textbox',
							value: value
						}),
						props.isInline ? _this3.getInlineMenu({ menuRenderer: _this3.renderMenu({ assistiveText: assistiveText, labels: labels }) }) : _this3.getDialog({ menuRenderer: _this3.renderMenu({ assistiveText: assistiveText, labels: labels }) })
					)
				),
				_react2.default.createElement(_selectedListbox2.default, {
					activeOption: _this3.state.activeSelectedOption,
					activeOptionIndex: _this3.state.activeSelectedOptionIndex,
					assistiveText: assistiveText,
					events: {
						onBlurPill: _this3.handleBlurPill,
						onClickPill: _this3.handlePillClickListboxOfPills,
						onRequestFocus: _this3.handleRequestFocusListboxOfPills,
						onRequestFocusOnNextPill: _this3.handleNavigateListboxOfPills,
						onRequestFocusOnPreviousPill: _this3.handleNavigateListboxOfPills,
						onRequestRemove: _this3.handleRemoveSelectedOption
					},
					id: _this3.getId(),
					labels: labels,
					selection: props.selection,
					listboxHasFocus: _this3.state.listboxHasFocus,
					variant: _this3.props.variant,
					renderAtSelectionLength: 2
				})
			);
		};
	};

	/* eslint-enable jsx-a11y/role-supports-aria-props */

	Combobox.displayName = _constants.COMBOBOX;
	Combobox.propTypes = propTypes;
	Combobox.defaultProps = defaultProps;

	exports.default = Combobox;
});