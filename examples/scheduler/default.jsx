import React from 'react';
import PropTypes from 'prop-types';
import Scheduler from '~/components/scheduler';
import Datepicker from '~/components/date-picker';
import Picklist from '~/components/menu-picklist';
import Input from '~/components/forms/input';
import CheckboxButtonGroup from '~/components/forms/checkbox';

// Labels since they will most likely be re-used are a part of the scheduler API. All data is directly applied to the component via a component prop

class Example extends React.Component {
	static displayName = 'SchedulerExample';

	render () {
		return (
			<Scheduler
				assistiveText={{}}
				// non-unique labels that would shared across all Datepickers in an application based on locale
				datepickerSharedProps={<Datepicker
					assistiveText={{
						openCalendar: 'Open Calendar',
						nextMonth: 'Next month',
						previousMonth: 'Previous month'
					}}
					formatter={(date) => {
						let inputText = '';
						/* Make American or European input format here */
						if (date) {
							inputText = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
						}
						return inputText;
					}}
					isIsoWeekday
					labels={{
						abbreviatedWeekDay: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
						closeAndSave: 'Done',
						lastDay: 'Last Day',
						months: [
							'January',
							'February',
							'March',
							'April',
							'May',
							'June',
							'July',
							'August',
							'September',
							'October',
							'November',
							'December'
						],
						ordinalWeek: ['1st', '2nd', '3rd', '4th'],
						ordinalDays: ['First Monday', 'First Tuesday', 'First Wednesday'],
						placeholder: 'Pick a Date',
						selectDates: 'Select one or more dates:',
						today: 'Today',
						weekDays: [
							'Sunday',
							'Monday',
							'Tuesday',
							'Wednesday',
							'Thursday',
							'Friday',
							'Saturday'
						]
					}}
				/>}
				// unique labels for a Scheduler component
				labels={{
					dayFrequency: 'Frequency',
					eventRepeatHeading: 'Repeat',
					// unsure about positioning inline inputs with a text string
					everyHour: 'Every[NUMBER]Hour(s)',
					everyDay: 'Every[NUMBER]Day(s)',
					everyWeek: 'Every[NUMBER]Weeks(s)',
					hourFrequency: 'Frequency',
					monthlyDate: 'Repeat on a specific date',
					monthlyDay: 'Repeat on a specific day',
					yearlyOnDate: 'on',
					yearlyOnTheDay: 'on the',
					yearlyOnTheDayOf: 'of',
					endOccurences: 'occurrence(s)',
					repeatOptions: {
						repeatNone: 'None (run once)',
						repeatSecond: 'Per Second',
						repeatMinute: 'Per Minute',
						repeatHour: 'Hourly',
						repeatDay: 'Daily',
						repeatWeekday: 'Weekdays',
						repeatWeek: 'Weekly',
						repeatMonth: 'Monthly',
						repeatYear: 'Yearly'
					},
					endOptions: [
						{ label: 'After', value: 'quantity' },
						{ label: 'On Date', value: 'date' }
					],
					startDateHeading: 'Start Date',
					startTimeHeading: 'Start Time',
					timeZoneAsteriskFootnote: 'Denotes this time zone honors daylight savings time.',
					timeZoneHeading: 'Time Zone'
				}}
				startDateDatepicker={<Datepicker />}
				startTimePicklist={<Picklist /* should be combobox */ />}
				timeZonePicklist={<Picklist
					options={[/* .... */]}
				/>}
				// second, minute, hour, day, weekday, week, monthly-date, monthly-day, year-date, year-day
				repeatPattern="monthly-date"
				repeatPicklist={<Picklist />}
				frequencyInput={<Input
					value="1"
				/>}
				weeklyCheckboxButtonGroup={
					<CheckboxButtonGroup />
				}
				monthlyDateDatepicker={<Datepicker />}
				monthlyDayDatepicker={<Datepicker
					day="Fri" // unsure about
					week="3"
					multi-select // will be default
					variant="day"
				/>}
				yearlyDateMonthPicklist={<Picklist />}
				yearlyDateNumberPicklist={<Picklist
					// computed values by default
					options={[
						'1',
						'2',
						'3',
						'4',
						'5',
						'6',
						'7',
						'8',
						'9',
						'10'
					]}
				/>}
				yearlyDayDatepicker={<Datepicker
					// unsure about whether to use Fri or number,
					day="FR"
					variant="day" // will be default
					week="3"
				/>}
				yearlyDayMonthPicklist={<Picklist /* steal months from datepicker */ />}
				// quantity, date
				end="date"
				endPicklist={<Picklist />}
				quantityInput={<Input value="1" />}
				endDateDatepicker={<Datepicker />}
			/>
		);
	}
}

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
