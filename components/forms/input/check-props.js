define(['exports', '../../../utilities/warning/deprecated-property', '../../../utilities/warning/one-of-required-property', '../../../utilities/warning/only-one-of-properties'], function (exports, _deprecatedProperty, _oneOfRequiredProperty, _onlyOneOfProperties) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _deprecatedProperty2 = _interopRequireDefault(_deprecatedProperty);

	var _oneOfRequiredProperty2 = _interopRequireDefault(_oneOfRequiredProperty);

	var _onlyOneOfProperties2 = _interopRequireDefault(_onlyOneOfProperties);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var checkProps = function checkProps() {}; /*
                                            Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                            
                                            Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                            Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                            Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                            Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                            
                                            THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                            */
	/* eslint-disable import/no-mutable-exports */
	/* eslint-disable max-len */

	if (process.env.NODE_ENV !== 'production') {
		checkProps = function checkProps(COMPONENT, props) {
			// Deprecated and changed to another property
			(0, _deprecatedProperty2.default)(COMPONENT, props.iconCategory, 'iconCategory', undefined, 'Please use `iconLeft` and `iconRight` to pass in a customized <Icon> component.');
			(0, _deprecatedProperty2.default)(COMPONENT, props.iconName, 'iconName', undefined, 'Please use `iconLeft` and `iconRight` to pass in a customized <Icon> component');
			(0, _deprecatedProperty2.default)(COMPONENT, props.iconPosition, 'iconPosition', undefined, 'Please use `iconLeft` and `iconRight` to pass in a customized <Icon> component');
			(0, _deprecatedProperty2.default)(COMPONENT, props.iconAssistiveText, 'iconAssistiveText', undefined, 'Please use `iconLeft` and `iconRight` to pass in a customized <Icon> component');
			(0, _deprecatedProperty2.default)(COMPONENT, props.onIconClick, 'onIconClick', undefined, 'Please use `iconLeft` and `iconRight` to pass in a customized <Icon> component');

			if (!props.inlineEditTrigger) {
				(0, _oneOfRequiredProperty2.default)(COMPONENT, {
					assistiveText: props.assistiveText,
					label: props.label
				});
			}

			(0, _onlyOneOfProperties2.default)(COMPONENT, {
				assistiveText: props.assistiveText,
				label: props.label
			});
		};
	}

	exports.default = checkProps;
});