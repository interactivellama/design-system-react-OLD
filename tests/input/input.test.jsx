/* eslint-disable react/no-render-return-value */
import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import assign from 'lodash.assign';
import TestUtils from 'react-addons-test-utils';

import Input from '../../components/forms/input';
import InputIcon from '../../components/icon/input-icon';

const {
	findRenderedDOMComponentWithTag,
	scryRenderedDOMComponentsWithTag,
	findRenderedDOMComponentWithClass
} = TestUtils;

describe('SLDS INPUT **************************************************', () => {
	const defaultProps = {
		placeholder: 'Placeholder Text'
	};

	let body;

	const renderInput = (instance) => {
		body = document.createElement('div');
		document.body.appendChild(body);
		return ReactDOM.render(instance, body);
	};

	function removeInput () {
		ReactDOM.unmountComponentAtNode(body);
		document.body.removeChild(body);
	}

	const createInput = (props) => React.createElement(Input, assign({}, defaultProps, props));
	const getInput = (props) => renderInput(createInput(props));

	describe('Standard Input with Label', () => {
		let component;
		let wrapper;
		let input;
		let label;

		beforeEach(() => {
			component = getInput({ label: 'Input Label', id: 'custom-id' });
			wrapper = findRenderedDOMComponentWithClass(component, 'slds-form-element');
			input = findRenderedDOMComponentWithTag(component, 'input');
			label = findRenderedDOMComponentWithClass(component, 'slds-form-element__label');
		});

		afterEach(() => {
			removeInput();
		});

		it('is wrapped in div with class "slds-form-element"', () => {
			expect(wrapper.className).to.include('slds-form-element');
		});

		it('renders label', () => {
			expect(label.textContent).to.equal('Input Label');
		});

		it('renders input element with class "slds-input"', () => {
			expect(input.className).to.include('slds-input');
		});

		it('has an id', () => {
			expect(input.getAttribute('id')).to.be.ok;
		});

		it('can pass custom id', () => {
			expect(input.getAttribute('id')).to.equal('custom-id');
		});

		it('renders placeholder text', () => {
			expect(input.getAttribute('placeholder')).to.equal('Placeholder Text');
		});
	});

	describe('Input without Label', () => {
		let component;
		let label;

		beforeEach(() => {
			component = getInput({ assistiveText: 'Assistive Label' });
			label = findRenderedDOMComponentWithClass(component, 'slds-form-element__label');
		});

		afterEach(() => {
			removeInput();
		});

		it('renders label (assitive)', () => {
			expect(label.textContent).to.equal('Assistive Label');
		});

		it('label has class "slds-assistive-text"', () => {
			expect(label.className).to.include('slds-assistive-text');
		});
	});

	describe('Read Only Input', () => {
		let component;
		let label;
		let input;

		beforeEach(() => {
			component = getInput({ label: 'Input Label', readOnly: true });
			label = scryRenderedDOMComponentsWithTag(component, 'span')[0];
			input = scryRenderedDOMComponentsWithTag(component, 'span')[1];
		});

		afterEach(() => {
			removeInput();
		});

		it('label is a span and has class "slds-form-element__label"', () => {
			expect(label.className).to.include('slds-form-element__label');
		});

		it('input is a span and has class "slds-form-element__static"', () => {
			expect(input.className).to.include('slds-form-element__static');
		});
	});

	describe('Multiple Inputs', () => {
		let component1;
		let component2;
		let input1;
		let input2;

		beforeEach(() => {
			component1 = getInput({ label: 'Input One' });
			component2 = getInput({ label: 'Input Two' });
			input1 = findRenderedDOMComponentWithTag(component1, 'input');
			input2 = findRenderedDOMComponentWithTag(component2, 'input');
		});

		afterEach(() => {
			removeInput();
		});

		it('each input has unique generated id', () => {
			expect(input1.getAttribute('id')).to.not.equal(input2.getAttribute('id'));
		});
	});

	describe('Required Input in Error State', () => {
		let component;
		let wrapper;
		let error;

		beforeEach(() => {
			component = getInput({ label: 'Input Label', required: true, errorText: 'Error Message' });
			wrapper = findRenderedDOMComponentWithClass(component, 'slds-form-element');
			error = findRenderedDOMComponentWithClass(component, 'slds-form-element__help');
		});

		afterEach(() => {
			removeInput();
		});

		it('input wrapper contains an <abbr> that has class "slds-required"', () => {
			expect(findRenderedDOMComponentWithTag(component, 'abbr').className).to.include('slds-required');
		});

		it('input wrapper has class "slds-has-error"', () => {
			expect(wrapper.className).to.include('slds-has-error');
		});

		it('renders error message', () => {
			expect(error.textContent).to.equal('Error Message');
		});
	});

	describe('Input with Left Clickable Icon', () => {
		let component;
		let elementControl;
		let leftButton;
		let iconAssistiveText;

		const clickCallback = sinon.spy();

		beforeEach(() => {
			component = getInput({
				iconLeft: <InputIcon
					assistiveText="Passed assistive text to icon"
					name="search"
					nategory="utility"
					onClick={clickCallback}
					position="left"
				/>
			});
			leftButton = findRenderedDOMComponentWithTag(component, 'button');
			iconAssistiveText = findRenderedDOMComponentWithClass(component, 'slds-assistive-text');
			elementControl = findRenderedDOMComponentWithClass(component, 'slds-form-element__control');
		});

		afterEach(() => {
			removeInput();
		});

		it('element control has class "slds-input-has-icon"', () => {
			expect(elementControl.className).to.include('slds-input-has-icon');
		});

		it('passes "assitiveText" down to icon', () => {
			expect(iconAssistiveText.textContent).to.equal('Passed assistive text to icon');
		});

		it('icon renders button BEFORE input in DOM', () => {
			const render = elementControl.innerHTML;
			expect(render.indexOf('<button')).to.be.below(render.indexOf('<input'));
		});

		it('icon can be clicked', () => {
			TestUtils.Simulate.click(leftButton);
			expect(clickCallback.calledOnce).to.be.true;
		});
	});

	describe('Input with Right Clickable Icon', () => {
		let component;
		let elementControl;
		let leftButton;

		const clickCallback = sinon.spy();

		beforeEach(() => {
			component = getInput({
				iconRight: <InputIcon
					assistiveText="Passed assistive text to icon"
					name="search"
					nategory="utility"
					onClick={clickCallback}
					position="right"
				/>
			});
			leftButton = findRenderedDOMComponentWithTag(component, 'button');
			elementControl = findRenderedDOMComponentWithClass(component, 'slds-form-element__control');
		});

		afterEach(() => {
			removeInput();
		});

		it('element control has class "slds-input-has-icon"', () => {
			expect(elementControl.className).to.include('slds-input-has-icon');
		});

		it('icon renders button AFTER input in DOM', () => {
			const render = elementControl.innerHTML;
			expect(render.indexOf('<button')).to.be.above(render.indexOf('<input'));
		});

		it('icon can be clicked', () => {
			TestUtils.Simulate.click(leftButton);

			expect(clickCallback.calledOnce).to.be.true;
		});
	});

	describe('Input with Non-Clickable Icon', () => {
		let component;
		let elementControl;

		beforeEach(() => {
			component = getInput({ iconName: 'search', iconCategory: 'utility', iconPosition: 'right' });
			elementControl = findRenderedDOMComponentWithClass(component, 'slds-form-element__control');
		});

		afterEach(() => {
			removeInput();
		});

		it('button tag does not exist', () => {
			expect(elementControl.getElementsByTagName('button')[0]).to.not.be.ok;
		});
	});
});
