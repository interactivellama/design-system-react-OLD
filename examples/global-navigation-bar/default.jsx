import React from 'react';
import GlobalNavigationBar from '~/components/global-navigation-bar'; // `~` is replaced with design-system-react at runtime
import GlobalNavigationBarRegion from '~/components/global-navigation-bar/region';
import GlobalNavigationBarDropdown from '~/components/global-navigation-bar/dropdown';
import GlobalNavigationBarLink from '~/components/global-navigation-bar/link';

import Button from '~/components/button';
import Icon from '~/components/icon';

import AppLauncher from '~/components/app-launcher';
import AppLauncherSection from '~/components/app-launcher/section';
import AppLauncherTile from '~/components/app-launcher/tile';

const Example = React.createClass({
	displayName: 'GlobalNavigationBarExample',

	render () {
		const dropdownCollection = [{
			label: 'Menu Item One',
			value: '1',
			iconCategory: 'utility',
			iconName: 'table',
			href: 'http://www.google.com'
		}, {
			label: 'Menu Item Two',
			value: '2',
			iconCategory: 'utility',
			iconName: 'kanban',
			href: 'http://www.google.com'
		}, {
			label: 'Menu Item Three',
			value: '3',
			iconCategory: 'utility',
			iconName: 'side_list',
			href: 'http://www.google.com'
		}];

		return (
			<GlobalNavigationBar>
				<GlobalNavigationBarRegion
					region="primary"
				>
					<AppLauncher
						triggerName="App Name"
						onSearch={function (event) { console.log('Search term:', event.target.value); }}
						modalHeaderButton={<Button label="App Exchange" />}
					>
						<AppLauncherSection title="Tile Section">
							<AppLauncherTile
								title="Marketing Cloud"
								iconText="MC"
								description="Send emails, track emails, read emails! Emails!"
							/>
							<AppLauncherTile
								title="Call Center"
								description="The key to call center and contact center is not to use too many words!"
								descriptionHeading="Call Center"
								iconText="CC"
							/>
						</AppLauncherSection>
						<AppLauncherSection title="Small Tile Section">
							<AppLauncherTile
								title="Journey Builder"
								iconText="JB"
								size="small"
							/>
							<AppLauncherTile
								title="Sales Cloud"
								iconNode={<Icon name="campaign" category="standard" size="large" />}
								size="small"
							/>
						</AppLauncherSection>
					</AppLauncher>
				</GlobalNavigationBarRegion>
				<GlobalNavigationBarRegion region="secondary" navigation>
					<GlobalNavigationBarLink
						href="javascript:void(0);"
						label="Home"
						id="home-link"
					/>
					<GlobalNavigationBarDropdown
						id="primaryDropdown"
						assistiveText="Context Menu Item 1"
						label="Context Menu Item"
						options={dropdownCollection}
					/>
					<GlobalNavigationBarLink
						href="javascript:void(0);"
						label="Context Menu Item 2"
						active
					/>
				</GlobalNavigationBarRegion>
				<GlobalNavigationBarRegion region="tertiary">
					<GlobalNavigationBarLink
						href="javascript:void(0);"
						label="Actions"
					/>
				</GlobalNavigationBarRegion>
			</GlobalNavigationBar>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
