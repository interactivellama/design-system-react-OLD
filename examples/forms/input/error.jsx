import React from 'react';
import Input from '~/components/forms/input'; // `~` is replaced with design-system-react at runtime
import InputIcon from '~/components/icon/input-icon'; // `~` is replaced with design-system-react at runtime

const Example = React.createClass({
	displayName: 'InputExample',

	render () {
		return (
			<div className="slds-grid slds-grid--pull-padded slds-grid--vertical-align-center">
				<div className="slds-col--padded">
					<Input
						id="unique-id-4"
						label="Input Label"
						required
						errorText="Error Message"
						placeholder="Placeholder Text"
					/>
				</div>
				<div className="slds-col--padded">
					<Input
						iconLeft={<InputIcon
							assistiveText="Search"
							name="warning"
							category="utility"
							color="warning"
							onClick={() => { console.log('Icon Clicked'); }}
						/>}
						id="unique-id-4"
						label="Input Label"
						required
						errorText="Error Message"
						placeholder="Placeholder Text"
					/>
				</div>
			</div>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
