/* eslint-disable no-console, react/prop-types */
import React from 'react';
import Daypicker from '~/components/day-picker';
import Input from '~/components/forms/input';

const Example = React.createClass({
	displayName: 'DaypickerExample',

	getInitialState () {
		return {
			isOpen: false
		};
	},

	render () {
		return (
			<Daypicker
				isOpen={this.state.isOpen}
				onRequestClose={() => { this.setState({ isOpen: false }); }}
				onRequestOpen={() => { this.setState({ isOpen: true }); }}
				onChange={(event, data) => {
					if (this.props.action) {
						const dataAsArray = Object.keys(data).map((key) => data[key]);
						this.props.action('onChange')(event, data, ...dataAsArray);
					} else if (console) {
						console.log('onChange', event, data);
					}
				}}
			>
				<Input placeholder="With custom Input" value="" />
			</Daypicker>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
