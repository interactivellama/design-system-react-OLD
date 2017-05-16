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
			selectedDaysInMonth: []
		};
	},

	handleCalendarSubmit (event, { selectedDaysInMonth }) {
		this.setState({ selectedDaysInMonth: selectedDaysInMonth });
	},

	handleInputSubmit (event, { selectedDayInMonth }) {
		console.log(selectedDayInMonth);
		// de-duplicate
		if (this.state.selectedDaysInMonth.every((item) =>
				item.day !== selectedDayInMonth.day)) {
			this.setState({ selectedDaysInMonth:
				this.state.selectedDaysInMonth.concat(selectedDayInMonth) });
		}
	},

	render () {
		return (
			<div>
				<DayPicker
					selectedDaysInMonth={this.state.selectedDaysInMonth}
					initialFocusDayInMonth={new Date().getDate()}
					variant="daysInMonth"
					onInputSubmit={this.handleInputSubmit}
					onCalendarSubmit={this.handleCalendarSubmit}
				/>
			</div>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
