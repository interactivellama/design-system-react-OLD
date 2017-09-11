define(['module', 'react', 'prop-types', 'react-highlighter', '../../../utilities/constants'], function (module, _react, _propTypes, _reactHighlighter, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _reactHighlighter2 = _interopRequireDefault(_reactHighlighter);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * A utility component that highlights occurrences of a particular pattern in its contents.
  */


	// ### ReactHighlighter
	/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
	/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

	// ### React
	var Highlighter = function Highlighter(props) {
		if (props.search) {
			var children = void 0;
			if (typeof props.children === 'string') {
				children = _react2.default.createElement(
					_reactHighlighter2.default,
					{ className: props.className, matchClass: null, matchElement: 'mark', search: props.search },
					props.children
				);
			} else {
				var findString = function findString(nodeArr) {
					return nodeArr.map(function (element) {
						var newElement = void 0;
						if (typeof element === 'string') {
							newElement = _react2.default.createElement(
								_reactHighlighter2.default,
								{ key: element, className: props.className, matchClass: null, matchElement: 'mark', search: props.search },
								element
							);
						} else {
							newElement = element;
						}
						return newElement;
					});
				};

				if (props.children.props) {
					var node = props.children.props.children;
					children = node instanceof Array ? findString(node) : node;
				}
			}

			return _react2.default.createElement(
				'span',
				null,
				children
			);
		}

		return _react2.default.createElement(
			'span',
			{ className: props.className },
			props.children
		);
	};

	// ### Display Name


	// ## Constants
	Highlighter.displayName = _constants.HIGHLIGHTER;

	// ### Prop Types
	Highlighter.propTypes = {
		/**
   * The full string to display.
   */
		children: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.bool, _propTypes2.default.node]),
		className: _propTypes2.default.string,
		/**
   * The string of text (or Regular Expression) to highlight.
   */
		search: _propTypes2.default.any
	};

	module.exports = Highlighter;
});