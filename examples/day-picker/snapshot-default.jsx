/* eslint-disable no-console, react/prop-types */
import React from 'react';

// Higher Order Components such as `react-onclickoutside` use the DOM and Jest snapshot testing must be DOMless
import DayPicker from '~/components/day-picker/day-picker';

import globalSettings from '../../components/settings';

globalSettings.setIconsPath('/assets/icons');

const Example = React.createClass({
	displayName: 'DaypickerExample',

	render () {
		return (
			<DayPicker
				id="sample-datepicker"
				isInline
				isOpen
				value={new Date(2014, 6, 23)}
				{...this.props}
			/>
		);
	}
});

export default Example;
