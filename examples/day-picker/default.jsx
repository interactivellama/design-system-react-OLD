/* eslint-disable no-console, react/prop-types */
import React from 'react';
import DayPicker from '~/components/day-picker';

const Example = React.createClass({
	displayName: 'DaypickerExample',

	render () {
		return (
			<DayPicker
				onChange={(event, data) => {
					if (this.props.action) {
						const dataAsArray = Object.keys(data).map((key) => data[key]);
						this.props.action('onChange')(event, data, ...dataAsArray);
					} else if (console) {
						console.log('onChange', event, data);
					}
				}}
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
