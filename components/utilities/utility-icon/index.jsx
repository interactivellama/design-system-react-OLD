/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

// This component's `checkProps` which issues warnings to developers about properties
// when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

import Svg from './svg';

import settings from '../../../components/settings';

import * as SLDS_ICONS_UTILITY from '../../../icons/utility';
import * as SLDS_ICONS_ACTION from '../../../icons/action';
import * as SLDS_ICONS_CUSTOM from '../../../icons/custom';
import * as SLDS_ICONS_DOCTYPE from '../../../icons/doctype';
import * as SLDS_ICONS_STANDARD from '../../../icons/standard';

const UtilityIcon = ({ name = '',
	assistiveText, // eslint-disable-line no-unused-vars
	category,
	icon,
	path,
	...rest
}) => {
	let data;

	// if the user passes in modified path, then we don't use data
	if (!path) {
		if (icon) {
			data = icon;
		} else {
			switch (category) {
				case 'action':
					data = SLDS_ICONS_ACTION[name.toLowerCase()];
					data.viewBox = SLDS_ICONS_ACTION.viewBox;
					break;
				case 'custom':
					data = SLDS_ICONS_CUSTOM[name.toLowerCase()];
					data.viewBox = SLDS_ICONS_CUSTOM.viewBox;
					break;
				case 'doctype':
					data = SLDS_ICONS_DOCTYPE[name.toLowerCase()];
					data.viewBox = SLDS_ICONS_DOCTYPE.viewBox;
					break;
				case 'standard':
					data = SLDS_ICONS_STANDARD[name.toLowerCase()];
					data.viewBox = SLDS_ICONS_STANDARD.viewBox;
					break;
				case 'utility':
				default:
					data = SLDS_ICONS_UTILITY[name.toLowerCase()];
					data.viewBox = SLDS_ICONS_UTILITY.viewBox;
					break;
			}
		}
	}

	// Use icon path prop if set, then see if a global path is set, if not use inline icons
	const modifiedPath = path || (settings.getIconsPath() && `${settings.getIconsPath()}/${category}-sprite/svg/symbols.svg#${name}`);

	checkProps('UtilityIcon', { name, category, path });

	const output = modifiedPath && !icon
		? (<svg {...rest}>
			<use xlinkHref={modifiedPath} />
		</svg>)
		: (<Svg data={data} name={name} {...rest} />);

	return output;
};

UtilityIcon.displayName = 'UtilityIcon';

UtilityIcon.propTypes = {
	category: PropTypes.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']),
	/**
   * An SVG object to use instead of name / category, look in `design-system-react/icons` for examples
   */
	icon: PropTypes.object,
	/**
   * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
   */
	name: PropTypes.string,
	/**
   * Path to the icon. This will override any global icon settings.
   */
	path: PropTypes.string
};

UtilityIcon.defaultProps = {
	category: 'utility'
};

module.exports = UtilityIcon;
