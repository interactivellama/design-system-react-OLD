/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # GlobalNavigationBar Link Component

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ### classNames
import classNames from 'classnames';

// ### isFunction
import isFunction from 'lodash.isfunction';

// ## Constants
import { GLOBAL_NAVIGATION_BAR_LINK } from '../../utilities/constants';

function handleClick (event, href, onClick) {
	event.preventDefault();

	onClick(event, { href });
}

/**
 * Wraps a link in the proper markup to support use in the GlobalNavigationBar.
 */
const GlobalNavigationBarLink = (props) => {
	// Separate props we care about in order to pass others along passively to the `a` tag
	const {
		active,
		activeBackgroundColor,
		className,
		dividerPosition,
		href,
		id,
		label,
		onBlur,
		onClick,
		onFocus,
		onKeyDown,
		onKeyPress,
		tabIndex
	} = props;

	const listItemstyle = active ? { backgroundColor: activeBackgroundColor, borderBottomColor: activeBackgroundColor } : null;

	return (
		<li
			className={classNames(
				'slds-context-bar__item',
				{ 'slds-is-active': active,
					[`slds-context-bar__item--divider-${dividerPosition}`]: dividerPosition
				})}
			id={id}
			style={listItemstyle}
		>
			<a
				href={href}
				className={classNames('slds-context-bar__label-action', className)}
				onBlur={onBlur}
				onClick={isFunction(onClick) ? (event) => handleClick(event, href, onClick) : null}
				onFocus={onFocus}
				onKeyDown={onKeyDown}
				onKeyPress={onKeyPress}
				tabIndex={tabIndex}
			>
				<span className="slds-truncate">{label}</span>
			</a>
		</li>
	);
};

GlobalNavigationBarLink.displayName = GLOBAL_NAVIGATION_BAR_LINK;

// ### Prop Types
GlobalNavigationBarLink.propTypes = {
	/**
	 * Whether the item is active or not.
	 */
	active: PropTypes.bool,
	/**
	 * Allows alignment of active item with active application background color. If application background is dark, text color may need to be `#fff`. This can be done with the style prop.
	 */
	activeBackgroundColor: PropTypes.string,
	/**
	 * Class names to be added to the anchor element
	 */
	className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
	/**
	 * Determines position of separating bar.
	 */
	dividerPosition: PropTypes.oneOf(['left', 'right']),
	/**
	 * The `href` attribute of the link. Please pass in bookmarkable URLs from your routing library. Use `GlobalNavigationBarButton` if a "real URL" is not desired. If the `onClick` callback is specified this URL will still be prevented from changing the browser's location.
	 */
	href: PropTypes.string,
	/**
	 * The `id` attribute is applied to the `li` tag. _This was recently changed from being on the anchor tag._
	 */
	id: PropTypes.string,
	/**
	 * Text to show for link item.
	 */
	label: PropTypes.string,
	onBlur: PropTypes.func,
	/**
	 * `function (event, href)` - fires when the link is clicked. If set, the browser location change to the `href` specified will be ignored, but the `href` will be included in an additional parameter passed to the callback.
	 */
	onClick: PropTypes.func,
	onFocus: PropTypes.func,
	onKeyDown: PropTypes.func,
	onKeyPress: PropTypes.func,
	onKeyUp: PropTypes.func,
	onMouseEnter: PropTypes.func,
	onMouseLeave: PropTypes.func,
	/**
	 * Write "-1" if you don't want the user to tab to the button.
	 */
	tabIndex: PropTypes.string
};

GlobalNavigationBarLink.defaultProps = {
	href: 'javascript:void(0);' // eslint-disable-line no-script-url
};

module.exports = GlobalNavigationBarLink;
