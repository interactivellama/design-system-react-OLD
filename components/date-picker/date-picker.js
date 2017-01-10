define(['exports', 'react', '../utilities/dialog', './private/calendar-wrapper', '../icon/input-icon', '../forms/input', 'lodash.isboolean', 'classnames', 'shortid', './check-props', '../../utilities/EventUtil', '../../utilities/KEYS', '../../utilities/constants'], function (exports, _react, _dialog, _calendarWrapper, _inputIcon, _input, _lodash, _classnames, _shortid, _checkProps, _EventUtil, _KEYS, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _dialog2 = _interopRequireDefault(_dialog);

	var _calendarWrapper2 = _interopRequireDefault(_calendarWrapper);

	var _inputIcon2 = _interopRequireDefault(_inputIcon);

	var _input2 = _interopRequireDefault(_input);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _shortid2 = _interopRequireDefault(_shortid);

	var _checkProps2 = _interopRequireDefault(_checkProps);

	var _EventUtil2 = _interopRequireDefault(_EventUtil);

	var _KEYS2 = _interopRequireDefault(_KEYS);

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

	/* A datepicker is a non text input form element. You can select a single date from a popup or inline calendar. The datepicker supplied by this library comes with an input by default, but other components could be passed in as children--however, pairing with other components is untested.
 
  * This component is wrapped in a [higher order component to listen for clicks outside itself](https://github.com/kentor/react-click-outside) and thus requires use of `ReactDOM`.
  *
  * This component may use a portalMount (a disconnected React subtree mount) within an absolutely positioned DOM node created with [Drop](http://github.hubspot.com/drop/).
 */
	var Datepicker = _react2.default.createClass({
		displayName: _constants.DATEPICKER,

		propTypes: {
			/**
    * Three letter abbreviations of the days of the week, starting on Sunday. Tested wtih snapshot testing.
    */
			abbreviatedWeekDayLabels: _react.PropTypes.array,
			/**
    * Label for button to go to the next month
    */
			assistiveTextNextMonth: _react.PropTypes.string,
			/**
    * Call to action label for calendar dialog trigger
    */
			assistiveTextOpenCalendar: _react.PropTypes.string,
			/**
    * Label for button to go to the previous month
    */
			assistiveTextPreviousMonth: _react.PropTypes.string,
			/**
    * Aligns the right or left side of the menu with the respective side of the trigger.
    */
			align: _react.PropTypes.oneOf(['left', 'right']),
			/**
    * Pass in an <Input /> component to customize it. Event handlers for the input (if needed) should be added here and not to this component. `<Input onKeyDown... />`.`
    */
			children: _react.PropTypes.node,
			/**
    * CSS classes to be added to tag with `slds-datepicker`.
    */
			className: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
			/**
    * If true, constrains the menu to the scroll parent. Has no effect if `isInline` is `true`.
    */
			constrainToScrollParent: _react.PropTypes.bool,
			/**
    * Disable input and calendar.
    */
			disabled: _react.PropTypes.bool,
			/**
    * Date formatting function
    */
			formatter: _react.PropTypes.func,
			/**
    * Value of input that gets passed to `parser` prop. Set the `value` prop if using a `Date` object. Use an external library such as [MomentJS](https://github.com/moment/moment/) if additional date formatting or internationalization is needed.
    */
			formattedValue: _react.PropTypes.string,
			/* Prevents the dropdown from changing position based on the viewport/window. If set to true your dropdowns can extend outside the viewport _and_ overflow outside of a scrolling parent. If this happens, you might want to consider making the dropdowns contents scrollable to fit the menu on the screen.
   */
			hasStaticAlignment: _react.PropTypes.bool,
			/**
    * HTML id for component
    */
			id: _react.PropTypes.string,
			/**
    * Renders menu within the wrapping trigger as a sibling of the input. By default, you will have an absolutely positioned container at an elevated z-index.
    */
			isInline: _react.PropTypes.bool,
			/**
    * Forces the dropdown to be open or closed. See controlled/uncontrolled callback/prop pattern for more on suggested use view [Concepts and Best Practices](https://github.com/salesforce-ux/design-system-react/blob/master/CONTRIBUTING.md#concepts-and-best-practices)
    */
			isOpen: _react.PropTypes.bool,
			/**
    * Makes Monday the first day of the week
    */
			isIsoWeekday: _react.PropTypes.bool,
			/**
    * Names of the months
    */
			monthLabels: _react.PropTypes.array,
			/**
    * Triggered when the date changes. It receives an object. {date: [Date object], formattedDate: [string]}. Can be used for validation.
    */
			onChange: _react.PropTypes.func,
			/**
    * Triggered when the calendar is closed.
    */
			onClose: _react.PropTypes.func,
			/**
    * Triggered when the calendar has opened.
    */
			onOpen: _react.PropTypes.func,
			/**
    * Function called when the calendar dialog would like hide.
    */
			onRequestClose: _react.PropTypes.func,
			/**
    * Function called when the calendar dialog would like show.
    */
			onRequestOpen: _react.PropTypes.func,
			/**
    * Custom function to parase date string into and return a `Date` object. Default function passes the input value to `Date()` and prays. Use an external library such as [MomentJS](https://github.com/moment/moment/) if additional date parsing is needed.
    */
			parser: _react.PropTypes.func,
			/**
    * Absolutely positioned DOM nodes, such as a datepicker dialog, may need their own React DOM tree root. They may need their alignment "flipped" if extended beyond the window or outside the bounds of an overflow-hidden scrolling modal. This library's portal mounts are added as a child node of `body`. This prop will be triggered instead of the default `ReactDOM.mount()` when this dialog is mounted. This prop is useful for testing and simliar to a "callback ref." Two arguments,`reactElement` and `domContainerNode` are passed in. Consider the following code that bypasses the internal mount and uses an Enzyme wrapper to mount the React root tree to the DOM.
    *
    * ```
    * <Datepicker
   		isOpen
   		portalMount={(reactElement, domContainerNode) => {
   			portalWrapper = Enzyme.mount(reactElement, { attachTo: domContainerNode });
   		}}
   		onOpen={() => {
   			expect(portalWrapper.find(`#my-heading`)).to.exist;
   			done();
   		}}
   	/>
   	```
    */
			portalMount: _react.PropTypes.func,
			/**
    * Placeholder text for input
    */
			placeholder: _react.PropTypes.string,
			/**
    * Offset of year from current year that can be selected in the year selection dropdown. (2017 - 5 = 2012).
    */
			relativeYearFrom: _react.PropTypes.number,
			/**
    * Offset of year from current year that can be selected in the year selection dropdown. (2017 + 5 = 2012).
    */
			relativeYearTo: _react.PropTypes.number,
			/**
    * Label of shortcut to jump to today within the calendar. This is also used for assistive text on today's date.
    */
			todayLabel: _react.PropTypes.string,
			/**
    * CSS classes to be added to tag with `slds-datepicker-trigger`. This is typically a wrapping `div` around the input.
    */
			triggerClassName: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
			/**
      * Sets date with a `Date` ECMAScript object.
      */
			value: _react.PropTypes.instanceOf(Date),
			/**
    * Full names of the seven days of the week, starting on Sunday.
    */
			weekDayLabels: _react.PropTypes.array
		},

		getDefaultProps: function getDefaultProps() {
			return {
				align: 'left',
				abbreviatedWeekDayLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
				assistiveTextOpenCalendar: 'Open Calendar',
				assistiveTextNextMonth: 'Next month',
				assistiveTextPreviousMonth: 'Previous month',
				formatter: function formatter(date) {
					return date ? date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() : '';
				},

				monthLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
				parser: function parser(str) {
					return new Date(str);
				},

				placeholder: 'Pick a Date',
				relativeYearFrom: -5,
				relativeYearTo: 5,
				todayLabel: 'Today',
				weekDayLabels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
			};
		},
		getInitialState: function getInitialState() {
			var dateString = this.props.formatter(this.props.value);
			var initDate = this.props.value ? dateString : this.props.formattedValue;
			return {
				isOpen: false,
				value: this.props.value,
				formattedValue: initDate || '',
				inputValue: initDate || ''
			};
		},
		componentWillMount: function componentWillMount() {
			this.generatedId = _shortid2.default.generate();

			// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
			(0, _checkProps2.default)(_constants.DATEPICKER, this.props);
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if (nextProps.value && this.props.value) {
				var currentDate = this.props.value.getTime();
				var nextDate = nextProps.value.getTime();

				if (currentDate !== nextDate) {
					this.setState({
						value: nextProps.value,
						formattedValue: this.props.formatter(nextProps.value)
					});
				}
			}
		},
		getId: function getId() {
			return this.props.id || this.generatedId;
		},
		getIsOpen: function getIsOpen() {
			return !!((0, _lodash2.default)(this.props.isOpen) ? this.props.isOpen : this.state.isOpen);
		},
		handleCalendarChange: function handleCalendarChange(event, _ref) {
			var date = _ref.date;

			this.setState({
				value: date,
				formattedValue: this.props.formatter(date),
				inputValue: this.props.formatter(date)
			});

			this.handleRequestClose();

			if (this.props.onChange) {
				this.props.onChange(event, { date: date, formattedDate: this.props.formatter(date) });
			}
		},
		handleClickOutside: function handleClickOutside() {
			this.handleRequestClose();
		},
		handleRequestClose: function handleRequestClose() {
			var isOpen = this.getIsOpen();

			if (this.props.onRequestClose) {
				this.props.onRequestClose();
			}

			if (isOpen) {
				this.setState({ isOpen: false });
			}

			if (this.input) {
				this.input.focus();
			}
		},
		openDialog: function openDialog() {
			if (this.props.onRequestOpen) {
				this.props.onRequestOpen();
			} else {
				this.setState({ isOpen: true });
			}
		},
		parseDate: function parseDate(formattedValue) {
			var parsedDate = this.props.parser(formattedValue);
			if (Object.prototype.toString.call(parsedDate) !== '[object Date]' || isNaN(parsedDate.getTime())) {
				parsedDate = new Date();
			}
			return parsedDate;
		},
		getInlineMenu: function getInlineMenu() {
			return !this.props.disabled && this.getIsOpen() ? _react2.default.createElement(
				'div',
				{
					className: (0, _classnames2.default)('slds-datepicker', 'slds-dropdown', 'slds-dropdown--' + this.props.align, this.props.className)
				},
				this.getDatePicker()
			) : null;
		},
		handleClose: function handleClose() {
			if (this.props.onClose) {
				this.props.onClose();
			}
		},
		handleOpen: function handleOpen() {
			if (this.props.onOpen) {
				this.props.onOpen();
			}

			if (this.selectedDateCell) {
				this.selectedDateCell.focus();
			}
		},
		getDialog: function getDialog() {
			return !this.props.disabled && this.getIsOpen() ? _react2.default.createElement(
				_dialog2.default,
				{
					contentsClassName: 'slds-datepicker slds-dropdown',
					closeOnTabKey: true,
					constrainToScrollParent: this.props.constrainToScrollParent,
					horizontalAlign: this.props.align,
					flippable: !this.props.hasStaticAlignment,
					onClose: this.handleClose,
					onOpen: this.handleOpen,
					portalMount: this.props.portalMount,
					targetElement: this.input
				},
				this.getDatePicker()
			) : null;
		},
		getDatePicker: function getDatePicker() {
			var _this = this;

			var date = this.state.formattedValue ? this.parseDate(this.state.formattedValue) : this.state.value;

			return _react2.default.createElement(_calendarWrapper2.default, {
				abbreviatedWeekDayLabels: this.props.abbreviatedWeekDayLabels,
				assistiveTextNextMonth: this.props.assistiveTextNextMonth,
				assistiveTextPreviousMonth: this.props.assistiveTextPreviousMonth,
				id: this.getId(),
				isIsoWeekday: this.props.isIsoWeekday,
				monthLabels: this.props.monthLabels,
				onRequestClose: this.handleRequestClose,
				onSelectDate: this.handleCalendarChange,
				ref: function ref() {
					// since it's inline, there is no callback except on render
					if (_this.props.isInline) {
						_this.handleOpen();
					}
				},
				relativeYearFrom: this.props.relativeYearFrom,
				relativeYearTo: this.props.relativeYearTo,
				selectedDate: date || new Date(),
				selectedDateRef: function selectedDateRef(component) {
					_this.selectedDateCell = component;
				},
				todayLabel: this.props.todayLabel,
				weekDayLabels: this.props.weekDayLabels
			});
		},
		handleInputChange: function handleInputChange(event) {
			this.setState({
				formattedValue: event.target.value,
				inputValue: event.target.value
			});

			if (this.props.onChange) {
				this.props.onChange(event, { date: this.props.parser(event.target.value), formattedDate: event.target.value });
			}
		},
		handleKeyDown: function handleKeyDown(event) {
			// Don't open if user is selecting text
			if (event.keyCode && !event.shiftKey && (event.keyCode === _KEYS2.default.DOWN || event.keyCode === _KEYS2.default.UP)) {
				_EventUtil2.default.trapEvent(event);
				this.setState({ isOpen: true });
			}
		},
		render: function render() {
			var _this2 = this;

			var clonedProps = {
				disabled: this.props.children && !!this.props.children.props.disabled || this.props.disabled,
				iconRight: this.props.children && !!this.props.children.props.iconRight || _react2.default.createElement(_inputIcon2.default, {
					assistiveText: this.props.assistiveTextOpenCalendar,
					'aria-haspopup': true,
					'aria-expanded': this.getIsOpen(),
					category: 'utility',
					name: 'event',
					onClick: this.openDialog
				}),
				id: this.getId(),
				inputRef: function inputRef(component) {
					_this2.input = component;
				},
				onChange: this.handleInputChange,
				onClick: function onClick() {
					_this2.openDialog();
					if (_this2.props.children && _this2.props.children.props.onClick) {
						_this2.props.children.props.onClick();
					}
				},
				onKeyDown: this.props.children && this.props.children.props.onKeyDown || this.handleKeyDown,
				placeholder: this.props.children && this.props.children.props.placeholder || this.props.placeholder,
				value: this.props.children && this.props.children.props.value || this.state.inputValue
			};

			var clonedInput = this.props.children ? _react2.default.cloneElement(this.props.children, _extends({}, clonedProps)) : _react2.default.createElement(_input2.default, clonedProps);

			return _react2.default.createElement(
				'div',
				{
					className: (0, _classnames2.default)('slds-dropdown-trigger', 'slds-dropdown-trigger--click', 'ignore-react-onclickoutside', {
						'slds-is-open': this.getIsOpen()
					}, this.props.triggerClassName)
				},
				clonedInput,
				this.props.isInline ? this.getInlineMenu() : this.getDialog()
			);
		}
	});

	exports.default = Datepicker;
});