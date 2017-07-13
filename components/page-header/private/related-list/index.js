define(['exports', 'react', 'prop-types'], function (exports, _react, _propTypes) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var displayName = 'PageHeaderRelatedList';
	var propTypes = {
		/**
   * Icon node passed by PageHeader
   */
		icon: _propTypes2.default.node,
		/**
   * Title node passed by PageHeader
   */
		title: _propTypes2.default.node,
		/**
   * Info node passed by PageHeader
   */
		info: _propTypes2.default.node,
		/**
   * Content to appear on the right hand side of the page header
   */
		contentRight: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
		/**
   * Nav content which appears in the upper right hand corner.
   */
		navRight: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element])
	};
	var defaultProps = {};

	var RelatedList = function (_Component) {
		_inherits(RelatedList, _Component);

		function RelatedList() {
			_classCallCheck(this, RelatedList);

			return _possibleConstructorReturn(this, (RelatedList.__proto__ || Object.getPrototypeOf(RelatedList)).apply(this, arguments));
		}

		_createClass(RelatedList, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'div',
						{ className: 'slds-grid' },
						_react2.default.createElement(
							'div',
							{ className: 'slds-col slds-has-flexi-truncate' },
							this.props.label,
							this.props.title
						),
						_react2.default.createElement(
							'div',
							{ className: 'slds-col slds-no-flex slds-grid slds-align-top' },
							this.props.navRight
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'slds-grid' },
						_react2.default.createElement(
							'div',
							{ className: 'slds-col slds-align-bottom' },
							this.props.info
						),
						_react2.default.createElement(
							'div',
							{ className: 'slds-col slds-no-flex slds-grid slds-align-bottom' },
							this.props.contentRight
						)
					)
				);
			}
		}]);

		return RelatedList;
	}(_react.Component);

	RelatedList.displayName = displayName;
	RelatedList.propTypes = propTypes;
	RelatedList.defaultProps = defaultProps;

	exports.default = RelatedList;
});