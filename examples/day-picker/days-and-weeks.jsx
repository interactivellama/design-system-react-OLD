/* eslint-disable no-console, react/prop-types */
import React from 'react';
import DayPicker from '~/components/day-picker';
import Pill from '~/components/day-picker/private/pill';
import InnerInput from '~/components/forms/input/private/inner-input';
import InputIcon from '~/components/icon/input-icon';

const Example = React.createClass({
	displayName: 'DaypickerExample',

	getInitialState () {
		return {
			selectedWeeksAndDays: []
		};
	},

	handleCalendarSubmit (event, { selectedWeeksAndDays }) {
		this.setState({ selectedWeeksAndDays });
	},

	handleInputSubmit (event, { selectedWeeksAndDays }) {
		// de-duplicate
		if (this.state.selectedDaysInMonth.every((item) =>
				item.day !== selectedWeeksAndDays.day)) {
			this.setState({ selectedWeeksAndDays:
				this.state.selectedDaysInMonth.concat(selectedWeeksAndDays) });
		}
	},

	render () {
		return (
			<div>
				<DayPicker
					isInline
					isOpen
					selectedDaysInMonth={this.state.selectedWeeksAndDays}
					initialFocusDayInMonth={new Date().getDate()}
					variant="weeksAndDays"
					onInputSubmit={this.handleInputSubmit}
					onCalendarSubmit={this.handleCalendarSubmit}
				/>
			</div>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
