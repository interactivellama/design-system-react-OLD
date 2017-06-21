define(['exports', 'warning'], function (exports, _warning) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var deprecated = function deprecated() {}; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
	/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

	/* eslint-disable import/no-mutable-exports */

	// This function will deliver an error message to the browser console about the removal of a property.


	if (process.env.NODE_ENV !== 'production') {
		(function () {
			var hasWarned = {};

			deprecated = function deprecated(control, propValue, oldProp, newProp, comment) {
				var additionalComment = comment ? ' ' + comment : '';
				var newProperty = newProp ? 'Use `' + newProp + '`' : '';
				if (!hasWarned[control + oldProp]) {
					/* eslint-disable max-len */
					(0, _warning2.default)(propValue === undefined, '[Design System React] `' + oldProp + '` will be removed in the next major version of ' + control + '. ' + newProperty + ' instead.' + additionalComment);
					/* eslint-enable max-len */
					hasWarned[control + oldProp] = propValue !== undefined;
				}
			};
		})();
	}

	exports.default = deprecated;
});