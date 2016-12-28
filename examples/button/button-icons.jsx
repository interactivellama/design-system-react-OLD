import React from 'react';
import Button from '~/components/button'; // `~` is replaced with design-system-react at runtime

const Container = React.createClass({
	displayName: 'ButtonExample',

	render () {
		return (
			<div className="-x-small-buttons--horizontal">
				<Button
					assistiveText="Icon Bare Small"
					iconName="settings"
					iconSize="small"
					iconVariant="bare"
					onClick={() => { alert('Icon Bare Clicked'); }} variant="icon"
				/>

				<Button
					assistiveText="Icon Container Small"
					iconName="settings"
					iconSize="small"
					iconVariant="container"
					variant="icon"
				/>

				<div
					style={{ backgroundColor: '#4BC076', padding: '10px', display: 'inline-block' }}
					className="-m-horizontal--small"
				>
					<Button
						assistiveText="Icon Border medium"
						iconName="settings"
						iconVariant="border"
						variant="icon"
					/>

					<Button
						assistiveText="Icon Border-filled medium"
						iconName="settings"
						iconVariant="border-filled"
						variant="icon"
					/>
				</div>

				<Button
					assistiveText="Icon More large"
					iconName="settings"
					iconSize="large"
					iconVariant="more"
					variant="icon"
				/>

				<div
					style={{ backgroundColor: '#16325c', padding: '10px', display: 'inline-block' }}
					className="-m-horizontal--small"
				>
					<Button
						assistiveText="Icon inverse"
						iconName="settings"
						iconSize="large"
						inverse
						variant="icon"
					/>
				</div>

				<div
					style={{ backgroundColor: '#FFB75D', padding: '10px 50px', display: 'inline-block' }}
					className="-hint-parent -m-horizontal--small"
				>
					<Button
						assistiveText="Icon hint large"
						hint
						iconName="settings"
						iconSize="large"
						variant="icon"
					/>
				</div>
			</div>
		);
	}
});

export default Container;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
