'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.isfunction');

var _lodash2 = _interopRequireDefault(_lodash);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /*
                                                                                                                                                                                                                  Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                  
                                                                                                                                                                                                                  Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                  Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                  Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                  Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                  
                                                                                                                                                                                                                  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                  */

// # GlobalNavigationBar Link Component

// ## Dependencies

// ### React


// ### classNames


// ### isFunction


// ## Constants


function handleClick(event, href, onClick) {
	event.preventDefault();

	onClick(event, { href: href });
}

/**
 * Wraps a link in the proper markup to support use in the GlobalNavigationBar.
 */
var GlobalNavigationBarLink = function GlobalNavigationBarLink(props) {
	// Separate props we care about in order to pass others along passively to the `a` tag
	var active = props.active,
	    activeBackgroundColor = props.activeBackgroundColor,
	    className = props.className,
	    dividerPosition = props.dividerPosition,
	    href = props.href,
	    id = props.id,
	    label = props.label,
	    onBlur = props.onBlur,
	    onClick = props.onClick,
	    onFocus = props.onFocus,
	    onKeyDown = props.onKeyDown,
	    onKeyPress = props.onKeyPress,
	    onKeyUp = props.onKeyUp,
	    onMouseEnter = props.onMouseEnter,
	    onMouseLeave = props.onMouseLeave,
	    tabIndex = props.tabIndex;


	var listItemstyle = active ? { backgroundColor: activeBackgroundColor, borderBottomColor: activeBackgroundColor } : null;

	return _react2.default.createElement(
		'li',
		{
			className: (0, _classnames2.default)('slds-context-bar__item', _defineProperty({ 'slds-is-active': active
			}, 'slds-context-bar__item--divider-' + dividerPosition, dividerPosition)),
			id: id,
			style: listItemstyle
		},
		_react2.default.createElement(
			'a',
			{
				href: href,
				className: (0, _classnames2.default)('slds-context-bar__label-action', className),
				onBlur: onBlur,
				onClick: (0, _lodash2.default)(onClick) ? function (event) {
					return handleClick(event, href, onClick);
				} : null,
				onFocus: onFocus,
				onKeyDown: onKeyDown,
				onKeyPress: onKeyPress,
				tabIndex: tabIndex
			},
			_react2.default.createElement(
				'span',
				{ className: 'slds-truncate' },
				label
			)
		)
	);
};

GlobalNavigationBarLink.displayName = _constants.GLOBAL_NAVIGATION_BAR_LINK;

// ### Prop Types
GlobalNavigationBarLink.propTypes = {
	/**
  * Whether the item is active or not.
  */
	active: _react.PropTypes.bool,
	/**
  * Allows alignment of active item with active application background color. If application background is dark, text color may need to be `#fff`. This can be done with the style prop.
  */
	activeBackgroundColor: _react.PropTypes.string,
	/**
  * Class names to be added to the anchor element
  */
	className: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
	/**
  * Determines position of separating bar.
  */
	dividerPosition: _react.PropTypes.oneOf(['left', 'right']),
	/**
  * The `href` attribute of the link. Please pass in bookmarkable URLs from your routing library. Use `GlobalNavigationBarButton` if a "real URL" is not desired. If the `onClick` callback is specified this URL will still be prevented from changing the browser's location.
  */
	href: _react.PropTypes.string,
	/**
  * The `id` attribute is applied to the `li` tag. _This was recently changed from being on the anchor tag._
  */
	id: _react.PropTypes.string,
	/**
  * Text to show for link item.
  */
	label: _react.PropTypes.string,
	onBlur: _react.PropTypes.func,
	/**
  * `function (event, href)` - fires when the link is clicked. If set, the browser location change to the `href` specified will be ignored, but the `href` will be included in an additional parameter passed to the callback.
  */
	onClick: _react.PropTypes.func,
	onFocus: _react.PropTypes.func,
	onKeyDown: _react.PropTypes.func,
	onKeyPress: _react.PropTypes.func,
	onKeyUp: _react.PropTypes.func,
	onMouseEnter: _react.PropTypes.func,
	onMouseLeave: _react.PropTypes.func,
	/**
  * Write "-1" if you don't want the user to tab to the button.
  */
	tabIndex: _react.PropTypes.string
};

GlobalNavigationBarLink.defaultProps = {
	href: 'javascript:void(0);' // eslint-disable-line no-script-url
};

module.exports = GlobalNavigationBarLink;