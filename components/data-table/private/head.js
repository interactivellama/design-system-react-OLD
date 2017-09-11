define(['exports', 'react', 'prop-types', '../../forms/checkbox', './header-cell', '../../../utilities/constants'], function (exports, _react, _propTypes, _checkbox, _headerCell, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _checkbox2 = _interopRequireDefault(_checkbox);

	var _headerCell2 = _interopRequireDefault(_headerCell);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var _extends = Object.assign || function (target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];

			for (var key in source) {
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					target[key] = source[key];
				}
			}
		}

		return target;
	};

	/**
  * Used internally, provides header row rendering to the DataTable.
  */
	var DataTableHead = _react2.default.createClass({
		// ### Display Name
		// Always use the canonical component name as the React display name.
		displayName: _constants.DATA_TABLE_HEAD,

		// ### Prop Types
		propTypes: {
			/**
    * Text for heading of actions column
    */
			assistiveTextForActionsHeader: _propTypes2.default.string,
			/**
    * Text for sort action on table column header
    */
			assistiveTextForColumnSort: _propTypes2.default.string,
			/**
    * Text for select all checkbox within the table header
    */
			assistiveTextForSelectAllRows: _propTypes2.default.string,
			allSelected: _propTypes2.default.bool,
			indeterminateSelected: _propTypes2.default.bool,
			canSelectRows: _propTypes2.default.bool,
			columns: _propTypes2.default.arrayOf(_propTypes2.default.shape({
				Cell: _propTypes2.default.func,
				props: _propTypes2.default.object
			})),
			id: _propTypes2.default.string,
			onToggleAll: _propTypes2.default.func,
			onSort: _propTypes2.default.func,
			showRowActions: _propTypes2.default.bool
		},

		componentWillMount: function componentWillMount() {},
		render: function render() {
			var _this = this;

			return _react2.default.createElement(
				'thead',
				null,
				_react2.default.createElement(
					'tr',
					{ className: 'slds-text-title--caps' },
					this.props.canSelectRows ? _react2.default.createElement(
						'th',
						{ className: 'slds-text-align--right', scope: 'col', style: { width: '3.25rem' } },
						_react2.default.createElement(
							'div',
							{ className: 'slds-th__action slds-th__action--form' },
							_react2.default.createElement(_checkbox2.default, {
								assistiveText: this.props.assistiveTextForSelectAllRows,
								checked: this.props.allSelected,
								indeterminate: this.props.indeterminateSelected,
								id: this.props.id + '-SelectAll',
								name: 'SelectAll',
								onChange: this.props.onToggleAll
							})
						)
					) : null,
					this.props.columns.map(function (column) {
						return _react2.default.createElement(_headerCell2.default, _extends({
							assistiveTextForColumnSort: _this.props.assistiveTextForColumnSort,
							id: _this.props.id + '-' + column.props.property,
							key: _this.props.id + '-' + column.props.property,
							onSort: _this.props.onSort
						}, column.props));
					}),
					this.props.showRowActions ? _react2.default.createElement(
						'th',
						{ scope: 'col', style: { width: '3.25rem' } },
						_react2.default.createElement(
							'div',
							{ className: 'slds-th__action' },
							_react2.default.createElement(
								'span',
								{ className: 'slds-assistive-text' },
								this.props.assistiveTextForActionsHeader
							)
						)
					) : null
				)
			);
		}
	});

	exports.default = DataTableHead;
});