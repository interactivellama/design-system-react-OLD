/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/* eslint-disable react/prefer-es6-class */

// Implements the [Modal design pattern](https://core-204.lightningdesignsystem.com/components/modals) in React.
// Based on SLDS v2.1.0-rc.3

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import Button from '../button';
import classNames from 'classnames';
import ReactModal from 'react-modal';

// ### isBoolean
import isBoolean from 'lodash.isboolean';

const displayName = 'Modal';
const propTypes = {
	/**
	 * Vertical alignment of Modal.
	 */
	align: PropTypes.oneOf(['top', 'center']),
	/**
	 * Modal content.
	 */
	children: PropTypes.node.isRequired,
	/**
	  * Custom CSS classes for the modal's container. This is the element with `.slds-modal__container`. Use `classNames` [API](https://github.com/JedWatson/classnames).
	  */
	containerClassName: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string]),
	/**
	 * Custom CSS classes for the modal's body. This is the element that has overflow rules and should be used to set a static height if desired. Use `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	contentClassName: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string]),
	/**
	 * Custom styles for the modal's body. This is the element that has overflow rules and should be used to set a static height if desired.
	 */
	contentStyle: React.PropTypes.object,
	/**
	 * If true, modal footer buttons render left and right. An example use case would be for "back" and "next" buttons.
	 */
	directional: PropTypes.bool,
	/**
	 * If true, Modals can be dismissed by clicking on the close icon or pressing esc key.
	 */
	dismissible: PropTypes.bool,
	/**
	 * If true, Modals can be dismissed by clicking outside of modal. If unspecified, defaults to dismissible.
	 */
	dismissOnClickOutside: PropTypes.bool,
	/**
	 * Callback to fire with Modal is dismissed
	*/
	onRequestClose: PropTypes.func,
	/**
	 * Array of buttons to be placed in the footer. They render on the right side by default but are floated left and right if <code>directional</code> is true.
	 */
	footer: PropTypes.array,
	/**
	 * Allows for a custom modal header that does not scroll with modal content. If this is defined, `title` and `tagline` will be ignored. The close button will still be present.
	 */
	header: PropTypes.node,
	/**
	 * Adds CSS classes to the container surrounding the modal header and the close button. Use `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	headerClassName: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string]),
	/**
	 * Forces the modal to be open or closed.
	 */
	isOpen: PropTypes.bool.isRequired,
	/**
	 * Custom CSS classes for the portal DOM node. This node is a direct descendant of the `body` and is the parent of `ReactModal__Overlay`. Use `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	portalClassName: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string]),
	/**
	 * Styles the modal as a prompt.
	 */
	prompt: PropTypes.oneOf(['success', 'warning', 'error', 'wrench', 'offline', 'info']),
	/**
	 * Specifiies the modal's width. May be deprecated in favor of `width` in the future.
	 */
	size: PropTypes.oneOf(['medium', 'large']),
	/**
	 * Content underneath the title in the modal header.
	 */
	tagline: PropTypes.node,
	/**
	 * Text heading at the top of a modal.
	 */
	title: PropTypes.node,
	/**
	 * Allows adding additional notifications within the modal.
	 */
	toast: PropTypes.node
};

const defaultProps = {
	align: 'center',
	dismissible: true
};

/**
 * The Modal component is used for the Lightning Design System Modal and Notification > Prompt components. The Modal opens from a state change outside of the component itself (pass this state to the <code>isOpen</code> prop). For more details on the Prompt markup, please review the <a href="http://www.lightningdesignsystem.com/components/notifications#prompt">Notifications > Prompt</a>.
 *
 * By default, `Modal` will add `aria-hidden=true` to the `body` tag, but this disables some assistive technologies. To prevent this you can add the following to your application with `#mount` being the root node of your application that you would like to hide from assistive technologies when the `Modal` is open.
 * ```
 * import settings from 'design-system-react/components/settings';
 * settings.setAppElement('#mount');
 * ```
 *
 * This component uses a portalMount (a disconnected React subtree mount) to create a modal as a child of `body`.
 */
class Modal extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			isClosing: false,
			revealed: false
		};

		// Bind
		this.handleModalClick = this.handleModalClick.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.dismissModalOnClickOutside = this.dismissModalOnClickOutside.bind(this);
	}

	setReturnFocus () {
		this.setState({
			returnFocusTo: document.activeElement
		});
	}

	componentDidMount () {
		this.setReturnFocus();

		if (!this.state.revealed) {
			setTimeout(() => {
				this.setState({ revealed: true });
			});
		}
		this.updateBodyScroll();
	}

	componentDidUpdate (prevProps, prevState) {
		if (this.props.isOpen !== prevProps.isOpen) {
			this.updateBodyScroll();
		}
		if (this.state.isClosing !== prevState.isClosing) {
			if (this.state.isClosing) {
				// console.log("CLOSING: ');
				if (!this.isUnmounting) {
					const el = ReactDOM.findDOMNode(this).parentNode;
					if (el && el.getAttribute('data-slds-modal')) {
						ReactDOM.unmountComponentAtNode(el);
						document.body.removeChild(el);
					}
				}
			}
		}
	}

	componentWillUnmount () {
		this.isUnmounting = true;
		this.clearBodyScroll();
	}

	dismissModalOnClickOutside () {
		// if dismissOnClickOutside is not set, default its value to dismissible
		const dismissOnClickOutside = isBoolean(this.props.dismissOnClickOutside)
			? this.props.dismissOnClickOutside
			: this.props.dismissible;

		if (dismissOnClickOutside) {
			this.dismissModal();
		}
	}

	closeModal () {
		if (this.props.dismissible) {
			this.dismissModal();
		}
	}

	dismissModal () {
		this.setState({ isClosing: true });
		if (this.state.returnFocusTo && this.state.returnFocusTo.focus) {
			this.state.returnFocusTo.focus();
		}
		if (this.props.onRequestClose) {
			this.props.onRequestClose();
		}
	}

	handleSubmitModal () {
		this.closeModal();
	}

	updateBodyScroll () {
		if (window && document && document.body) {
			if (this.props.isOpen) {
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = 'inherit';
			}
		}
	}

	clearBodyScroll () {
		if (window && document && document.body) {
			document.body.style.overflow = 'inherit';
		}
	}

	handleModalClick (event) {
		if (event && event.stopPropagation) {
			event.stopPropagation();
		}
	}

	isPrompt () {
		return this.props.prompt !== undefined;
	}

	footerComponent () {
		let footer = null;
		const hasFooter = this.props.footer && this.props.footer.length > 0;
		const footerClass = {
			'slds-modal__footer': true,
			'slds-modal__footer--directional': this.props.directional,
			'slds-theme--default': this.isPrompt()
		};

		if (hasFooter) {
			footer = (<div className={classNames(footerClass)} onClick={this.handleModalClick}>{this.props.footer}</div>);
		}
		return footer;
	}

	headerComponent () {
		let headerContent = this.props.header;
		const closeButton = (
			<Button
				assistiveText="Close"
				iconName="close"
				iconSize="large"
				inverse
				className="slds-modal__close"
				onClick={this.closeModal}
				variant="icon"
			/>
		);

		if (!headerContent && this.props.title || this.props.tagline) {
			headerContent = (
				<div>
					{this.props.toast}
					<h2
						className={classNames({
							'slds-text-heading--small': this.isPrompt(),
							'slds-text-heading--medium': !this.isPrompt()
						})}
					>{this.props.title}</h2>
					{this.props.tagline ? <p className="slds-m-top--x-small">{this.props.tagline}</p> : null}
				</div>
			);
		}

		return (
			<div
				className={classNames({
					'slds-modal__header': headerContent,
					[`slds-theme--${this.props.prompt}`]: this.isPrompt(),
					'slds-theme--alert-texture': this.isPrompt()
				},
				this.props.headerClassName)}
				onClick={this.handleModalClick}
			>
				{this.isPrompt() === true ? null : closeButton}
				{headerContent}
			</div>
		);
	}

	getModal () {
		const modalStyle = this.props.align === 'top' ? { justifyContent: 'flex-start' } : null;
		const borderRadius = this.props.title || this.props.header ? {} : { borderRadius: '.25rem' };
		const contentStyleFromProps = this.props.contentStyle || {};
		const contentStyle =  {
			...borderRadius,
			...contentStyleFromProps
		};
		return (
			<div>
				<div
					aria-hidden="false"
					role="dialog"
					className={classNames({
						'slds-modal': true,
						'slds-fade-in-open': this.state.revealed,
						'slds-modal--large': this.props.size === 'large',
						'slds-modal--prompt': this.isPrompt()
					})}
					onClick={this.dismissModalOnClickOutside}
				>
					<div className={classNames('slds-modal__container', this.props.containerClassName)} style={modalStyle}>
						{this.headerComponent()}
						<div
							className={classNames('slds-modal__content', this.props.contentClassName)}
							style={contentStyle}
							onClick={this.handleModalClick}
						>
							{this.props.children}
						</div>
					{this.footerComponent()}
					</div>
				</div>
				<div className="slds-backdrop slds-backdrop--open"></div>
			</div>
		);
	}

	render () {
		const customStyles = {
			content: {
				position: 'default',
				top: 'default',
				left: 'default',
				right: 'default',
				bottom: 'default',
				border: 'default',
				background: 'default',
				overflow: 'default',
				WebkitOverflowScrolling: 'default',
				borderRadius: 'default',
				outline: 'default',
				padding: 'default'
			},
			overlay: {
				position: 'static',
				backgroundColor: 'default'
			}
		};

		return (
			<ReactModal
				isOpen={this.props.isOpen}
				onRequestClose={this.closeModal}
				style={customStyles}
				portalClassName={classNames('ReactModalPortal', this.props.portalClassName)}
			>
				{this.getModal()}
			</ReactModal>
		);
	}

}

Modal.displayName = displayName;
Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

module.exports = Modal;
