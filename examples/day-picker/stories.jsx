import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import Datepicker from '~/components/date-picker';
import { DAY_PICKER } from '../../utilities/constants';

import DaysInMonth from './days-in-month';
import DaysAndWeeks from './days-and-weeks';

storiesOf(DAY_PICKER, module)
	.addDecorator((getStory) => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Days In Month', () => (<DaysInMonth action={action} />))
	.add('Days and Weeks', () => (<DaysAndWeeks action={action} />));
