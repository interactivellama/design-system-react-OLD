'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _input = require('../forms/input');

var _input2 = _interopRequireDefault(_input);

var _inputIcon = require('../icon/input-icon');

var _inputIcon2 = _interopRequireDefault(_inputIcon);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /*
                                                                                                                                                                                                                             Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                             
                                                                                                                                                                                                                             Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                             Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                             Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                             Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                             
                                                                                                                                                                                                                             THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                             */

// ### React
// React is an external dependency of the project.


// Removes the need for `PropTypes`.
var PropTypes = _react2.default.PropTypes;


/**
 * A default filter or search input for Cards that contain items.
 */
var Filter = function Filter(props) {
	var id = props.id,
	    placeholder = props.placeholder,
	    onChange = props.onChange,
	    rest = _objectWithoutProperties(props, ['id', 'placeholder', 'onChange']);

	return _react2.default.createElement(_input2.default, _extends({}, rest, {
		assistiveText: placeholder,
		iconLeft: _react2.default.createElement(_inputIcon2.default, { name: 'search', category: 'utility' }),
		id: id,
		onChange: onChange,
		placeholder: placeholder
	}));
};

// ### Display Name
// Always use the canonical component name as the React display name.
Filter.displayName = _constants.CARD_FILTER;

// ### Prop Types
Filter.propTypes = {
	/**
  * The HTML `id` from the card with a suffixe.
  */
	id: PropTypes.string,
	/**
  * This callback fires when the input changes.
  */
	onChange: PropTypes.func,
	/**
  * Text present in input until the user enters text. This text will also be used for a visually hidden label on the filter `input` element for accessibility.
  */
	placeholder: PropTypes.string.isRequired
};

Filter.defaultProps = {
	placeholder: 'Find in List'
};

module.exports = Filter;