/* eslint-disable react/display-name */

import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { BUTTON_STATEFUL } from '../../utilities/constants';
import ButtonStateful from '../../components/button-stateful';

const getButtonStateful = (props) => (
	<ButtonStateful
		{...props}
		onClick={action('click')}
	/>
);

storiesOf(BUTTON_STATEFUL, module)
	.addDecorator((getStory) => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Base', () => getButtonStateful())
	.add('Disabled', () => getButtonStateful({ disabled: true }))
	.add('Icon', () => getButtonStateful({
		variant: 'icon',
		label: 'Neutral Icon',
		iconName: 'check',
		onFocus: action('hover'),
		onMouseEnter: (e) => { console.log('target is ', e.target); }
	}));
