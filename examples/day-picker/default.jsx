/* eslint-disable no-console, react/prop-types */
import React from 'react';
import DayPicker from '~/components/day-picker';

const Example = React.createClass({
	displayName: 'DaypickerExample',

	getInitialState () {
		return {
			selectedDaysInMonth: []
		};
	},

	handleOnChange (event, data) {
		console.log(data);
		// const newDaysInMonth = data.selected
		// 	? this.state.selectedDaysInMonth.filter((item) => item.day !== data.day)
		// 	: this.state.selectedDaysInMonth.concat(data);

//		this.setState({ selectedDaysInMonth: newDaysInMonth });

		if (this.props.action) {
			const dataAsArray = Object.keys(data).map((key) => data[key]);
			this.props.action('onChange')(event, data, ...dataAsArray);
		} else if (console) {
			console.log('onChange', event, data);
		}
	},

	render () {
		return (
			<DayPicker
				selectedDaysInMonth={this.state.selectedDaysInMonth}
				initialFocusDayInMonth={new Date().getDate()}
				variant="daysInMonth"
				onChange={this.handleOnChange}
				onCalendarFocus={(event, data) => {
					if (this.props.action) {
						const dataAsArray = Object.keys(data).map((key) => data[key]);
						this.props.action('onCalendarFocus')(event, data, ...dataAsArray);
					} else if (console) {
						console.log('onCalendarFocus', event, data);
					}
				}}
			/>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
