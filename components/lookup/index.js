define(['module', 'exports', 'react', 'react-dom', 'lodash.escaperegexp', './check-props', '../utilities/dialog', '../button', '../icon', '../icon/input-icon', '../forms/input', '../../utilities/EventUtil', '../../utilities/KEYS', './menu', './menu/default-footer', './menu/default-header', './menu/default-section-divider', 'classnames', '../../utilities/constants'], function (module, exports, _react, _reactDom, _lodash, _checkProps, _dialog, _button, _icon, _inputIcon, _input, _EventUtil, _KEYS, _menu, _defaultFooter, _defaultHeader, _defaultSectionDivider, _classnames, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Lookup = undefined;

	var _react2 = _interopRequireDefault(_react);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _checkProps2 = _interopRequireDefault(_checkProps);

	var _dialog2 = _interopRequireDefault(_dialog);

	var _button2 = _interopRequireDefault(_button);

	var _icon2 = _interopRequireDefault(_icon);

	var _inputIcon2 = _interopRequireDefault(_inputIcon);

	var _input2 = _interopRequireDefault(_input);

	var _EventUtil2 = _interopRequireDefault(_EventUtil);

	var _KEYS2 = _interopRequireDefault(_KEYS);

	var _menu2 = _interopRequireDefault(_menu);

	var _defaultFooter2 = _interopRequireDefault(_defaultFooter);

	var _defaultHeader2 = _interopRequireDefault(_defaultHeader);

	var _defaultSectionDivider2 = _interopRequireDefault(_defaultSectionDivider);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
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

	/**
  * A function that takes a term string and an item and returns a truthy value if the item should be kept.
  */
	var defaultFilter = function defaultFilter(term, item) {
		if (!term) return true;
		return item.data && item.data.type === 'section' || item.label.match(new RegExp((0, _lodash2.default)(term), 'ig'));
	};

	/**
  * Lookup is an advanced inline search form. The lookup can parse through single or multi scoped datasets. The parsed dataset can be filtered by single or multi option selects.
  */
	var Lookup = exports.Lookup = _react2.default.createClass({
		displayName: _constants.LOOKUP,

		propTypes: {
			/**
    * If present, the label associated with this `input` is overwritten
    * by this text and is visually not shown.
    */
			assistiveText: _react.PropTypes.string,
			/**
    * Class names to be added to the tag classed with `slds-lookup`.
    */
			className: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
			/**
    * If true, constrains the menu to the scroll parent. Has no effect if `isInline` is `true`.
    */
			constrainToScrollParent: _react.PropTypes.bool,
			/**
    * ID for aria-describedby (e.g. for an error message or a description)
    */
			describedById: _react.PropTypes.string,
			/**
    * This prop is passed onto the `input`. Prevents dropdown menu from opening. Also applies disabled styling to input.
    */
			disabled: _react.PropTypes.bool,
			/**
    * Custom message that renders when no matches found. The default empty state is just text that says, 'No matches found.'.
    */
			emptyMessage: _react.PropTypes.string,
			/**
    * Custom function to filter the Lookup items when typing into input field. The default function is case-insensitive and uses the searchTerm to filter Lookup items on their labels.
    */
			filterWith: _react.PropTypes.func,
			/**
    * If true, the menu is constrained to the window and may be flipped up. Has no effect if `isInline` is `true`.
    */
			flippable: _react.PropTypes.bool,
			/**
    * Custom component for Lookup footer. The default footer allows user to add new item - see <a href='http://www.lightningdesignsystem.com/components/lookups/#base'>Lightning Design System Lookup > Base</a>. To use the default footer, pass in <code>Lookup.DefaultFooter</code>.
    */
			footerRenderer: _react.PropTypes.func,
			/**
    * Custom component for Lookup header. The default header has a search icon and shows the search term - see <a href='http://www.lightningdesignsystem.com/components/lookups/#base'>Lightning Design System Lookup > Base</a>. To use the default header, pass in <code>Lookup.DefaultHeader</code>.
    */
			headerRenderer: _react.PropTypes.func,
			/**
    * Please refer to <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to view categories.
    */
			iconCategory: _react.PropTypes.string,
			/**
    * If true, icon color is white. If false, icon color is the default text color.
    */
			iconInverse: _react.PropTypes.bool,
			/**
    * Name of icon. Please refer to <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to view icon names.
    */
			iconName: _react.PropTypes.string,
			/**
    * Determines whether the input's icon will display that icon on the left or the right.
    */
			iconPosition: _react.PropTypes.oneOf(['left', 'right']),
			/**
    * Renders menu within the wrapping trigger as a sibling of the button. By default, you will have an absolutely positioned container at an elevated z-index.
    */
			isInline: _react.PropTypes.bool,
			/**
    * Form label for input.
    */
			label: _react.PropTypes.string,
			/**
    * Custom component that overrides the default Lookup Item component.
    */
			listItemLabelRenderer: _react.PropTypes.func,
			/**
    * Triggered when input focus is removed.
    */
			onBlur: _react.PropTypes.func,
			/**
    * Triggered when the contents of the input changes.
    */
			onChange: _react.PropTypes.func,
			/**
    * Triggered when an item is selected from the dropdown menu.
    */
			onSelect: _react.PropTypes.func,
			/**
    * Triggered when an item is an item is removed from the input.
    */
			onUnselect: _react.PropTypes.func,
			/**
    * Item added to the dropdown menu.
    */
			options: _react.PropTypes.array.isRequired,
			/**
    * Text that will appear in an empty input.
    */
			placeholder: _react.PropTypes.string,
			/**
    * If true, adds asterisk next to input label to indicate it is a required field.
    */
			required: _react.PropTypes.bool,
			/**
    * Text passed on to header search input of dropdown menu.
    */
			searchTerm: _react.PropTypes.string,
			/**
    * Custom component that overrides the default section divider
    */
			sectionDividerRenderer: _react.PropTypes.func,
			/**
    * Index of current selected item. To clear the selection, pass in -1.
    */
			selectedItem: _react.PropTypes.number
		},

		getDefaultProps: function getDefaultProps() {
			return {
				constrainToScrollParent: true,
				filterWith: defaultFilter,
				iconPosition: 'right',
				searchTerm: ''
			};
		},
		getInitialState: function getInitialState() {
			return {
				currentFocus: null,
				focusIndex: null,
				items: [],
				listLength: this.props.options.length,
				searchTerm: this.normalizeSearchTerm(this.props.searchTerm),
				selectedIndex: this.props.selectedItem
			};
		},
		componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
			var lookup = this.inputRefId();
			if (!isNaN(parseInt(prevState.selectedIndex, 10)) && isNaN(parseInt(this.state.selectedIndex, 10))) {
				if (this.refs[lookup]) {
					_reactDom2.default.findDOMNode(this.refs[lookup]).focus();
				}
			} else if (isNaN(parseInt(prevState.selectedIndex, 10)) && !isNaN(parseInt(this.state.selectedIndex, 10))) {
				var selectedItem = 'pill-' + this.state.selectedIndex;
				if (this.refs[selectedItem]) {
					_reactDom2.default.findDOMNode(this.refs[selectedItem]).focus();
				}
			}
		},
		componentWillReceiveProps: function componentWillReceiveProps(newProps) {
			if (newProps.options) {
				this.modifyItems(newProps.options);
			}
			if (newProps.selectedItem !== this.props.selectedItem) {
				this.setState({ selectedIndex: newProps.selectedItem });
			}
		},
		componentWillMount: function componentWillMount() {
			// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
			(0, _checkProps2.default)(_constants.LOOKUP, this.props);
		},
		componentDidMount: function componentDidMount() {
			this.modifyItems(this.props.options);
		},
		modifyItems: function modifyItems(itemsToModify) {
			var items = itemsToModify.map(function (item, index) {
				return {
					id: 'item-' + index,
					label: item.label,
					data: item
				};
			});

			this.setState({ items: items });
		},
		setFirstIndex: function setFirstIndex() {
			var nextFocusIndex = 0;
			var filteredItem = this.state.items[0];

			if (this.refs.menu && this.refs.menu.getFilteredItemForIndex) {
				filteredItem = this.refs.menu.getFilteredItemForIndex(nextFocusIndex);
			}

			if (filteredItem && filteredItem.data.type === 'section') {
				nextFocusIndex++;
			}

			this.setState({ focusIndex: nextFocusIndex });
		},


		// =================================================
		// Using down/up keys, set Focus on list item and assign it to aria-activedescendant attribute in input.
		// Need to keep track of filtered list length to be able to increment/decrement the focus index so it's contained to the number of available list items.
		increaseIndex: function increaseIndex() {
			var numFocusable = this.getNumFocusableItems();
			var nextFocusIndex = this.state.focusIndex < numFocusable ? this.state.focusIndex + 1 : 0;
			var filteredItem = this.refs.menu.getFilteredItemForIndex(nextFocusIndex);

			if (filteredItem && filteredItem.data.type === 'section') {
				nextFocusIndex++;
			}

			this.setState({ focusIndex: nextFocusIndex });
		},
		decreaseIndex: function decreaseIndex() {
			var numFocusable = this.getNumFocusableItems();
			var prevFocusIndex = this.state.focusIndex > 0 ? this.state.focusIndex - 1 : numFocusable;
			var filteredItem = this.refs.menu.getFilteredItemForIndex(prevFocusIndex);

			if (filteredItem && filteredItem.data.type === 'section') {
				prevFocusIndex = prevFocusIndex === 0 ? numFocusable : prevFocusIndex - 1;
			}

			this.setState({ focusIndex: prevFocusIndex });
		},
		setFocus: function setFocus(id) {
			this.setState({ currentFocus: id });
		},
		getListLength: function getListLength(qty) {
			if (qty !== this.state.listLength) {
				this.setState({ listLength: qty });
			}
		},
		getNumFocusableItems: function getNumFocusableItems() {
			var offset = 0;

			if (this.refs.footer) {
				offset += 1;
			}

			if (this.refs.header) {
				offset += 1;
			}

			return this.state.listLength - 1 + offset;
		},


		// =================================================
		// Select menu item (onClick or on key enter/space)
		selectItem: function selectItem(itemId) {
			if (itemId) {
				var index = itemId.replace('item-', '');
				this.selectItemByIndex(index);
			}
		},
		selectItemByIndex: function selectItemByIndex(index) {
			if (index >= 0 && index < this.state.items.length) {
				this.setState({
					isOpen: false,
					selectedIndex: index,
					searchTerm: ''
				});
				var data = this.state.items[index].data;
				if (this.props.onSelect) {
					this.props.onSelect(data);
				}
			}
		},
		handleDeleteSelected: function handleDeleteSelected() {
			this.setState({
				selectedIndex: null,
				isOpen: true
			});

			this.focusInput();

			if (this.props.onUnselect) {
				this.props.onUnselect();
			}
		},


		// =================================================
		// Event Listeners on Input
		handleClose: function handleClose() {
			this.setState({
				isOpen: false,
				focusIndex: null,
				currentFocus: null
			});
		},
		handleEscape: function handleEscape(event) {
			if (this.state.isOpen && event) {
				_EventUtil2.default.trap(event);
			}
			this.handleClose();
		},
		handleCancel: function handleCancel() {
			this.setState({
				isOpen: false,
				focusIndex: null,
				currentFocus: null
			});
		},
		handleClick: function handleClick() {
			this.setState({ isOpen: true });
		},
		handleBlur: function handleBlur(event) {
			this.handleClose();
			if (this.props.onBlur) {
				var target = event.target || event.currentTarget;
				this.props.onBlur(target.value);
			}
		},
		handleFocus: function handleFocus() {
			this.setState({ isOpen: true });
		},
		handleChange: function handleChange(event) {
			var target = event.target || event.currentTarget;
			this.setState({ searchTerm: this.normalizeSearchTerm(target.value) });
			if (this.props.onChange) {
				this.props.onChange(target.value);
			}
		},
		handleKeyDown: function handleKeyDown(event) {
			if (event.keyCode) {
				// If user hits esc key, close menu
				if (event.keyCode === _KEYS2.default.ESCAPE) {
					this.handleEscape(event);
				} else {
					this.handleClick();
				}

				// If user hits down key, advance aria activedescendant to next item
				if (event.keyCode === _KEYS2.default.DOWN) {
					_EventUtil2.default.trapImmediate(event);
					if (this.state.focusIndex === null) {
						this.setFirstIndex();
					} else {
						this.increaseIndex();
					}
				} else if (event.keyCode === _KEYS2.default.UP) {
					// If user hits up key, advance aria activedescendant to previous item
					_EventUtil2.default.trapImmediate(event);
					var numFocusable = this.getNumFocusableItems();
					if (this.state.focusIndex === null) {
						this.setState({ focusIndex: numFocusable });
					} else {
						this.decreaseIndex();
					}
				} else if (event.keyCode === _KEYS2.default.ENTER && this.state.focusIndex !== null) {
					// If user hits enter, select current activedescendant item
					_EventUtil2.default.trapImmediate(event);
					// If the focus is on the first fixed Action Item in Menu, click it
					if (this.refs.header && this.state.focusIndex === 0) {
						_reactDom2.default.findDOMNode(this.refs.header).click();
					} else if (this.refs.footer && this.state.focusIndex === this.state.listLength + 1) {
						// If the focus is on the last fixed Action Item in Menu, click it
						_reactDom2.default.findDOMNode(this.refs.footer).click();
					} else {
						// If not, then select menu item
						this.selectItem(this.state.currentFocus);
					}
				}
			}
		},
		handlePillKeyDown: function handlePillKeyDown(event) {
			if (event.keyCode) {
				if (event.keyCode === _KEYS2.default.DELETE || event.keyCode === _KEYS2.default.BACKSPACE) {
					_EventUtil2.default.trapImmediate(event);
					this.handleDeleteSelected();
				}
			}
		},
		getHeader: function getHeader() {
			var Header = this.props.headerRenderer;
			var headerActive = this.state.focusIndex === 0;

			return _react2.default.createElement(Header, _extends({
				ref: 'header'
			}, this.props, {
				focusIndex: this.state.focusIndex,
				isActive: headerActive,
				onClose: this.handleClose,
				searchTerm: this.state.searchTerm,
				setFocus: this.setFocus
			}));
		},
		getFooter: function getFooter() {
			var Footer = this.props.footerRenderer;
			var numFocusable = this.getNumFocusableItems();
			var footerActive = this.state.focusIndex === numFocusable;

			return _react2.default.createElement(Footer, _extends({
				ref: 'footer'
			}, this.props, {
				focusIndex: this.state.focusIndex,
				isActive: footerActive,
				onClose: this.handleClose,
				setFocus: this.setFocus
			}));
		},
		normalizeSearchTerm: function normalizeSearchTerm(string) {
			return (string || '').toString().replace(/^\s+/, '');
		},


		// =================================================
		// Rendering Things
		renderMenuContent: function renderMenuContent() {
			return _react2.default.createElement(_menu2.default, {
				ref: 'menu',
				emptyMessage: this.props.emptyMessage,
				filterWith: this.props.filterWith,
				focusIndex: this.state.focusIndex,
				footer: this.props.footerRenderer ? this.getFooter() : null,
				getListLength: this.getListLength,
				header: this.props.headerRenderer ? this.getHeader() : null,
				iconCategory: this.props.iconCategory,
				iconInverse: this.props.iconInverse,
				iconName: this.props.iconName,
				items: this.state.items,
				label: this.props.label,
				listItemLabelRenderer: this.props.listItemLabelRenderer,
				listLength: this.state.listLength,
				onSelect: this.selectItem,
				searchTerm: this.state.searchTerm,
				sectionDividerRenderer: this.props.sectionDividerRenderer,
				setFocus: this.setFocus
			});
		},
		renderInlineMenu: function renderInlineMenu() {
			return this.state.isOpen ? _react2.default.createElement(
				'div',
				{ className: 'ignore-react-onclickoutside slds-lookup__menu', role: 'listbox', ref: 'scroll' },
				this.renderMenuContent()
			) : null;
		},
		renderSeparateMenu: function renderSeparateMenu() {
			return this.state.isOpen ? _react2.default.createElement(
				_dialog2.default,
				{
					className: 'slds-lookup__menu slds-show',
					closeOnTabKey: true,
					contentsClassName: 'slds-lookup__menu slds-show',
					inheritTargetWidth: true,
					onClose: this.handleCancel,
					flippable: this.props.flippable,
					constrainToScrollParent: this.props.constrainToScrollParent,
					targetElement: this.input,
					verticalAlign: 'bottom'
				},
				this.renderMenuContent()
			) : null;
		},
		renderInput: function renderInput() {
			var _this = this;

			return _react2.default.createElement(_input2.default, {
				'aria-activedescendant': this.state.currentFocus ? this.state.currentFocus : '',
				'aria-autocomplete': 'list',
				'aria-describedby': this.props.describedById,
				'aria-expanded': !!this.state.isOpen,
				assistiveText: this.props.assistiveText,
				className: 'slds-lookup__search-input',
				disabled: this.props.disabled,
				iconRight: _react2.default.createElement(_inputIcon2.default, {
					assistiveText: 'Search',
					category: 'utility',
					name: 'search'
				}),
				id: this.inputRefId(),
				onBlur: this.handleBlur,
				onChange: this.handleChange,
				onClick: this.handleClick,
				onFocus: this.handleFocus,
				onKeyDown: this.handleKeyDown,
				inputRef: function inputRef(component) {
					_this.input = component;
					if (_this.focusOnRender) {
						_reactDom2.default.findDOMNode(_this.input).focus();
						_this.focusOnRender = false;
					}
				},
				placeholder: this.props.placeholder,
				role: 'combobox',
				type: 'text',
				value: this.state.searchTerm
			});
		},
		renderSelectedItem: function renderSelectedItem() {
			var selectedItem = this.props.options[this.state.selectedIndex].label;
			var renderIcon = this.props.iconName ? _react2.default.createElement(_icon2.default, {
				category: this.props.iconCategory,
				className: 'slds-icon slds-pill__icon',
				inverse: this.props.iconInverse,
				name: this.props.iconName
			}) : null;
			var labelClassName = this.props.iconName ? 'slds-pill__label' : 'slds-pill__label slds-m-left--x-small';

			// i18n
			return _react2.default.createElement(
				'div',
				{ className: 'slds-pill__container' },
				_react2.default.createElement(
					'a',
					{
						href: 'javascript:void(0)',
						className: 'slds-pill',
						ref: 'pill-' + this.state.selectedIndex,
						onKeyDown: this.handlePillKeyDown
					},
					renderIcon,
					_react2.default.createElement(
						'span',
						{ className: labelClassName },
						selectedItem
					),
					_react2.default.createElement(_button2.default, {
						assistiveText: 'Press delete to remove',
						className: 'slds-pill__remove slds-button--icon-bare',
						iconName: 'close',
						onClick: this.handleDeleteSelected,
						ref: 'clearSelectedItemButton',
						tabIndex: '-1',
						variant: 'icon'
					})
				)
			);
		},
		renderLabel: function renderLabel() {
			var inputLabel = void 0;
			var required = this.props.required ? _react2.default.createElement(
				'span',
				{ className: 'slds-required' },
				'*'
			) : null;
			if (this.isSelected()) {
				// inline style override
				inputLabel = _react2.default.createElement(
					'span',
					{
						className: 'slds-form-element__label',
						style: { width: '100%' }
					},
					required,
					this.props.label
				);
			} else {
				inputLabel = _react2.default.createElement(
					'label',
					{
						className: 'slds-form-element__label',
						htmlFor: this.inputRefId(),
						style: { width: '100%' }
					},
					required,
					this.props.label
				);
			}
			return inputLabel;
		},
		inputRefId: function inputRefId() {
			return this.props.label + 'Lookup';
		},
		focusInput: function focusInput() {
			this.focusOnRender = true;
		},
		isSelected: function isSelected() {
			var hasSelection = !isNaN(parseInt(this.state.selectedIndex, 10)) && this.state.selectedIndex >= 0;
			return hasSelection;
		},
		getClassName: function getClassName() {
			return (0, _classnames2.default)(this.props.className, 'slds-form-element slds-lookup', {
				'slds-has-selection': this.isSelected(),
				'slds-is-open': this.state.isOpen
			});
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

			var formElementControlClasses = _defineProperty({
				'slds-form-element__control': true
			}, 'slds-input-has-icon slds-input-has-icon--' + this.props.iconPosition, !this.isSelected());

			return _react2.default.createElement(
				'div',
				{ className: this.getClassName(), 'data-select': 'single', 'data-scope': 'single' },
				this.props.label ? this.renderLabel() : null,
				_react2.default.createElement(
					'div',
					{ className: (0, _classnames2.default)(formElementControlClasses) },
					this.isSelected() ? this.renderSelectedItem() : null,
					!this.isSelected() ? this.renderInput() : null
				),
				isInline ? this.renderInlineMenu() : this.renderSeparateMenu()
			);
		}
	});

	module.exports = Lookup;
	module.exports.DefaultHeader = _defaultHeader2.default;
	module.exports.DefaultSectionDivider = _defaultSectionDivider2.default;
	module.exports.DefaultFooter = _defaultFooter2.default;
});