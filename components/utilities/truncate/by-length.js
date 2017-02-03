define(['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = truncateByLength;
	/*
 Copyright (c) 2015, salesforce.com, inc. All rights reserved.
 
 Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

	function truncateByLength(_ref) {
		var _ref$inputString = _ref.inputString,
		    inputString = _ref$inputString === undefined ? '' : _ref$inputString,
		    _ref$maxLength = _ref.maxLength,
		    maxLength = _ref$maxLength === undefined ? 140 : _ref$maxLength,
		    _ref$truncationChars = _ref.truncationChars,
		    truncationChars = _ref$truncationChars === undefined ? '...' : _ref$truncationChars,
		    _ref$startingLength = _ref.startingLength,
		    startingLength = _ref$startingLength === undefined ? 0 : _ref$startingLength;

		var outputString = void 0;

		if (inputString.length <= maxLength) {
			outputString = inputString;
		} else {
			(function () {
				var words = inputString.split(' ');
				var length = startingLength + truncationChars.length - 1;

				outputString = words.reduce(function (combined, word) {
					length += word.length + 1;

					if (length <= maxLength) {
						combined.push(word);
					}

					return combined;
				}, []).join(' ');

				outputString += truncationChars;
			})();
		}

		return outputString;
	}
});