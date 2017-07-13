'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var urlExists = function urlExists() {}; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */
/* global XMLHttpRequest, window */

// This function does an "AJAX" request to warn users on how to setup their icon path.


if (process.env.NODE_ENV !== 'production') {
	var hasWarned = {};
	var hasExecuted = void 0;

	// Using XMLHttpRequest can cause problems in non-browser environments. This should be completely removed in production environment and should not execute in a testing environment.
	urlExists = function urlExists(control, url, comment) {
		if (!hasExecuted && !hasWarned[control + '-path'] && window && XMLHttpRequest && process.env.NODE_ENV !== 'test') {
			var http = new XMLHttpRequest();
			http.open('HEAD', url, false);
			http.send();
			hasExecuted = true;

			if (http.status === 404) {
				var additionalComment = comment ? ' ' + comment : '';
				/* eslint-disable max-len */
				(0, _warning2.default)(!url, '[Design System React] Icon file was not found. Try setting an icon path with `setIconsPath([ICONPATH])` from `components/settings`.' + additionalComment);
				/* eslint-enable max-len */
				hasWarned[control + '-path'] = !!url;
			}
		}
	};
}

exports.default = urlExists;