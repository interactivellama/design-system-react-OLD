
/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */


// # Picklist Component

// Implements the [Picklist design pattern](https://www.lightningdesignsystem.com/components/menus/#flavor-picklist) in React.
// Based on SLDS v2.1.0-rc.2

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// This component's `checkProps` which issues warnings to developers about properties
// when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classNames from 'classnames';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

// ### Children
import Dialog from '../utilities/dialog';
import Icon from '../icon';
import List from '../utilities/menu-list';
import ListItemLabel from '../utilities/menu-list/item-label';
import Pill from './private/pill';

import { shape } from 'airbnb-prop-types';

// ### Traits

// #### KeyboardNavigable
import KeyboardNavigable from '../../utilities/keyboard-navigable-menu';

import EventUtil from '../../utilities/event';
import KEYS from '../../utilities/key-code';
import { MENU_PICKLIST } from '../../utilities/constants';

/**
 * The MenuPicklist component is a variant of the Lightning Design System Menu component.
 */
const MenuPicklist = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: MENU_PICKLIST,

	mixins: [KeyboardNavigable],

	// ### Prop Types
	propTypes: {
		/**
		 * Callback that passes in the DOM reference of the `<button>` DOM node within this component. Primary use is to allow `focus` to be called. You should still test if the node exists, since rendering is asynchronous. `buttonRef={(component) => { if(component) console.log(component); }}`
		 */
		buttonRef: PropTypes.func,
		className: PropTypes.string,
		/**
		 * If true, renders checkmark icon on the selected Menu Item.
		 */
		checkmark: PropTypes.bool,
		disabled: PropTypes.bool,
		/**
		 * Message to display when the input is in an error state. When this is present, also visually highlights the component as in error.
		 */
		errorText: PropTypes.string,
		/**
		 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
		 */
		id: PropTypes.string,
		/**
		 * Renders menu within the wrapping trigger as a sibling of the button. By default, you will have an absolutely positioned container at an elevated z-index.
		 */
		isInline: PropTypes.bool,
		/**
		 * Form element label
		 */
		label: PropTypes.string,
		/**
		 * **Text labels for internationalization**
		 * This object is merged with the default props object on every render.
		 * * `multipleOptionsSelected`: Text to be used when multiple items are selected. "2 Options Selected" is a good pattern to use.
		 */
		labels: shape({
			multipleOptionsSelected: PropTypes.string
		}),
		/**
		 * Custom element that overrides the default Menu Item component.
		 */
		listItemRenderer: PropTypes.func,
		/**
		 * Allows multiple items to be selected. Items will be shown in pills. Clicking the item does not close the menu.
		 */
		multiple: PropTypes.bool,
		/**
		 * Triggered when the trigger button is clicked to open.
		 */
		onClick: PropTypes.func,
		/**
		 * Triggered when an item is selected. Passes in the option object that has been selected and a data object in the format: `{ option, optionIndex }`. The first parameter may be deprecated in the future and changed to an event for consistency. Please use the data object.
		 */
		onSelect: PropTypes.func,
		/**
		 * Menu item data.
		 */
		options: PropTypes.array.isRequired,
		/**
		 * Text present in trigger button if no items are selected.
		 */
		placeholder: PropTypes.string,
		/**
		 * Add styling of a required form element.
		 */
		required: PropTypes.bool,
		/**
		 * Current selected item.
		 */
		value: PropTypes.node
	},

	getDefaultProps () {
		return {
			inheritTargetWidth: true,
			placeholder: 'Select an Option',
			checkmark: true,
			labels: {
				multipleOptionsSelected: 'Multiple Options Selected'
			}
		};
	},

	getInitialState () {
		return {
			focusedIndex: -1,
			selectedIndex: -1,
			selectedIndices: [],
			currentPillLabel: ''
		};
	},

	componentWillMount () {
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(MENU_PICKLIST, this.props);

		this.generatedId = shortid.generate();
		if (this.props.errorText) {
			this.generatedErrorId = shortid.generate();
		}

		window.addEventListener('click', this.closeOnClick, false);

		if (!this.props.multiple) {
			this.setState({
				selectedIndex: this.getIndexByValue(this.props)
			});
		} else {
			const currentSelectedIndex = this.getIndexByValue(this.props);
			const currentIndices = this.state.selectedIndices;
			if (currentSelectedIndex !== -1) {
				currentIndices.push(currentSelectedIndex);
			}
			this.setState({
				selectedIndices: currentIndices
			});
		}
	},

	componentWillReceiveProps (nextProps) {
		if (this.props.value !== nextProps.value || this.props.options.length !== nextProps.length) {
			if (this.props.multiple !== true) {
				this.setState({
					selectedIndex: this.getIndexByValue(nextProps)
				});
			} else {
				const currentSelectedIndex = this.getIndexByValue(nextProps);
				if (currentSelectedIndex !== -1) {
					const currentIndices = this.state.selectedIndices.concat(currentSelectedIndex);
					this.setState({
						selectedIndices: currentIndices
					});
				}
			}
		}
	},

	componentWillUnmount () {
		this.isUnmounting = true;
		window.removeEventListener('click', this.closeOnClick, false);
	},

	getId () {
		return this.props.id || this.generatedId;
	},

	getErrorId () {
		return this.props['aria-describedby'] || this.generatedErrorId;
	},

	getClickEventName () {
		return `SLDS${this.getId()}ClickEvent`;
	},

	getIndexByValue ({ value, options } = this.props) {
		let foundIndex = -1;

		if (options && options.length) {
			options.some((element, index) => {
				if (element && element.value === value) {
					foundIndex = index;
					return true;
				}

				return false;
			});
		}

		return foundIndex;
	},

	getValueByIndex (index) {
		return this.props.options[index];
	},

	getListItemRenderer () {
		return this.props.listItemRenderer ? this.props.listItemRenderer : ListItemLabel;
	},

	handleSelect (index) {
		if (!this.props.multiple) {
			this.setState({ selectedIndex: index });
			this.handleClose();
			this.setFocus();
		} else if (this.props.multiple && this.state.selectedIndices.indexOf(index) === -1) {
			const currentIndices = this.state.selectedIndices.concat(index);
			this.setState({
				selectedIndices: currentIndices
			});
		} else if (this.props.multiple) {
			const deselectIndex = this.state.selectedIndices.indexOf(index);
			this.state.selectedIndices.splice(deselectIndex, 1);
		}

		if (this.props.onSelect) {
			const option = this.getValueByIndex(index);
			this.props.onSelect(option, { option, optionIndex: index });
		}
	},

	handleClose () {
		this.setState({ isOpen: false });
	},

	handleClick (event) {
		if (event) {
			event.nativeEvent[this.getClickEventName()] = true;
		}

		if (!this.state.isOpen) {
			this.setState({ isOpen: true });
			this.setFocus();

			if (this.props.onClick) {
				this.props.onClick(event);
			}
		} else {
			this.handleClose();
		}
	},

	handleMouseDown (event) {
		if (event) {
			EventUtil.trapImmediate(event);
			event.nativeEvent[this.getClickEventName()] = true;
		}
	},

	setFocus () {
		if (!this.isUnmounting && this.button) {
			this.button.focus();
		}
	},

	handleKeyDown (event) {
		if (event.keyCode) {
			if (event.keyCode === KEYS.ENTER ||
				event.keyCode === KEYS.SPACE ||
				event.keyCode === KEYS.DOWN ||
				event.keyCode === KEYS.UP) {
				EventUtil.trap(event);
			}

			if (event.keyCode !== KEYS.TAB) {
				// The outer div with onKeyDown is overriding button onClick so we need to add it here.
				const openMenuKeys = event.keyCode === KEYS.ENTER || event.keyCode === KEYS.DOWN || event.keyCode === KEYS.UP;
				const isTrigger = event.target.tagName === 'BUTTON';
				if (openMenuKeys && isTrigger && this.props.onClick) {
					this.props.onClick(event);
				}

				this.handleKeyboardNavigate({
					isOpen: this.state.isOpen || false,
					keyCode: event.keyCode,
					onSelect: this.handleSelect,
					toggleOpen: this.toggleOpen
				});
			} else {
				this.handleCancel();
			}
		}
	},

	handleCancel () {
		this.setFocus();
		this.handleClose();
	},

	closeOnClick (event) {
		if (!event[this.getClickEventName()] && this.state.isOpen) {
			this.handleClose();
		}
	},

	toggleOpen () {
		this.setState({ isOpen: !this.state.isOpen });
	},

	saveRefToList (list) {
		this.list = list;
	},

	saveRefToListItem (listItem, index) {
		if (!this.listItems) {
			this.listItems = {};
		}

		this.listItems[index] = listItem;

		if (index === this.state.focusedIndex) this.handleKeyboardFocus(this.state.focusedIndex);
	},

	// Trigger opens, closes, and recieves focus on close
	saveRefToTrigger (trigger) {
		this.button = trigger;
		if (this.props.buttonRef) {
			this.props.buttonRef(this.button);
		}
	},

	renderMenuContent () {
		return (
			<List
				checkmark={this.props.checkmark}
				getListItemId={this.getListItemId}
				itemRefs={this.saveRefToListItem}
				itemRenderer={this.getListItemRenderer()}
				onCancel={this.handleCancel}
				onSelect={this.handleSelect}
				options={this.props.options}
				ref={this.saveRefToList}
				selectedIndex={!this.props.multiple ? this.state.selectedIndex : undefined}
				selectedIndices={this.props.multiple ? this.state.selectedIndices : undefined}
				triggerId={this.getId()}
			/>
		);
	},

	renderInlineMenu () {
		return (
			!this.props.disabled && this.state.isOpen
			? <div
				className="slds-dropdown slds-dropdown--left"
				// inline style override
				style={{
					maxHeight: '20em',
					overflowX: 'hidden',
					minWidth: '100%'
				}}
			>
				{this.renderMenuContent()}
			</div>
			: null
		);
	},

	renderDialog () {
		return (
			!this.props.disabled && this.state.isOpen && this.button
			? <Dialog
				closeOnTabKey
				constrainToScrollParent={this.props.constrainToScrollParent}
				contentsClassName="slds-dropdown slds-dropdown--left"
				flippable
				onClose={this.handleCancel}
				onKeyDown={this.handleKeyDown}
				targetElement={this.button}
				inheritTargetWidth={this.props.inheritTargetWidth}
			>
				{this.renderMenuContent()}
			</Dialog>
			: null
		);
	},

	renderTrigger () {
		let isInline;
		/* eslint-disable react/prop-types */
		if (this.props.isInline) {
			isInline = true;
		} else if (this.props.modal !== undefined) {
			isInline = !this.props.modal;
		}
		/* eslint-enable react/prop-types */

		let inputValue;
		if (this.props.multiple && this.state.selectedIndices.length === 0) {
			inputValue = this.props.placeholder;
		}	else if (this.props.multiple && this.state.selectedIndices.length === 1) {
			const option = this.props.options[this.state.selectedIndices];
			inputValue = option.label;
		} else if (this.props.multiple && this.state.selectedIndices.length > 1) {
			inputValue = this.props.labels.multipleOptionsSelected;
		} else {
			const option = this.props.options[this.state.selectedIndex];
			inputValue = (option && option.label) ? option.label : this.props.placeholder;
		}

		// TODO: make use of <Button>
		return (
			// eslint-disable-next-line jsx-a11y/no-static-element-interactions
			<div
				className={classNames(
						'slds-picklist slds-dropdown-trigger slds-dropdown-trigger--click',
						{ 'slds-is-open': this.state.isOpen },
						this.props.className
					)}
				onKeyDown={this.handleKeyDown}
				onMouseDown={this.handleMouseDown}
			>
				<button
					aria-describedby={this.getErrorId()}
					aria-expanded={this.state.isOpen}
					aria-haspopup="true"
					className="slds-button slds-button--neutral slds-picklist__label"
					disabled={this.props.disabled}
					id={this.getId()}
					onClick={!this.props.disabled && this.handleClick}
					ref={this.saveRefToTrigger}
					tabIndex={this.state.isOpen ? -1 : 0}
				>
					<span className="slds-truncate">{inputValue}</span>
					<Icon name="down" category="utility" />
				</button>
				{isInline ? this.renderInlineMenu() : this.renderDialog()}
			</div>
		);
	},

	renderPills () {
		const selectedPills = this.state.selectedIndices.map((selectedPill) => {
			const pillLabel = this.getValueByIndex(selectedPill).label;
			return (
				<li
					className="slds-listbox__item"
					key={`pill-${selectedPill}`}
					role="presentation"
				>
					<Pill
						eventData={{
							item: this.props.options[selectedPill],
							index: selectedPill
						}}
						events={{
							onRequestRemove: (event, data) => {
								const newData = this.state.selectedIndices;
								newData.splice(this.state.selectedIndices.indexOf(data.eventData.index), 1);
								this.setState({ selectedIndices: newData });
							}
						}}
						labels={{
							label: pillLabel
						}}
					/>
				</li>
			);
		});
		return (
			<div
				id="listbox-selections-unique-id"
				orientation="horizontal"
				role="listbox"
			>
				<ul
					className="slds-listbox slds-listbox_inline slds-p-top_xxx-small"
					role="group"
					aria-label="Selected Options:"
				>
					{selectedPills}
				</ul>
			</div>
		);
	},

	render () {
		const {
			className,
			errorText,
			label,
			required
		} = this.props;

		const requiredElem = required ? <span style={{ color: 'red' }}>* </span> : null;

		return (
			<div
				className={classNames('slds-form-element', {
					'slds-has-error': errorText
				},
				className)}
			>
				{this.props.label
					? <label
						className="slds-form-element__label"
						htmlFor={this.getId()}
						// inline style override
						style={{ width: '100%' }}
					>
						{requiredElem}{label}
					</label>
				: null}
				{this.renderTrigger()}
				{this.renderPills()}
				{errorText && <div id={this.getErrorId()} className="slds-form-element__help">{errorText}</div>}
			</div>
		);
	}
});

module.exports = MenuPicklist;
module.exports.ListItemLabel = ListItemLabel;
