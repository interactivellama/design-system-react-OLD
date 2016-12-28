'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.assign');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.isarray');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.isfunction');

var _lodash6 = _interopRequireDefault(_lodash5);

var _lodash7 = require('lodash.reject');

var _lodash8 = _interopRequireDefault(_lodash7);

var _checkProps = require('./check-props');

var _checkProps2 = _interopRequireDefault(_checkProps);

var _cell = require('./cell');

var _cell2 = _interopRequireDefault(_cell);

var _column = require('./column');

var _column2 = _interopRequireDefault(_column);

var _head = require('./private/head');

var _head2 = _interopRequireDefault(_head);

var _row = require('./private/row');

var _row2 = _interopRequireDefault(_row);

var _rowActions = require('./row-actions');

var _rowActions2 = _interopRequireDefault(_rowActions);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /*
                                                                                                                                                                                                                             Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                             
                                                                                                                                                                                                                             Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                             Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                             Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                             Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                             
                                                                                                                                                                                                                             THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                             */

// # Data Table Component

// Implements the [Data Table design pattern](https://www.lightningdesignsystem.com/components/data-tables) in React.

// ## Dependencies

// ### React


// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator


// ### classNames


// ### assign


// ### isArray


// ### isFunction


// ### reject


// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)


// ## Children


// ## Constants


// Removes the need for `PropTypes`.
var PropTypes = _react2.default.PropTypes;

// Safely get the length of an array, returning 0 for invalid input.

var count = function count(array) {
	return (0, _lodash4.default)(array) ? array.length : 0;
};

/**
 * DataTables support the display of structured data in rows and columns with an HTML table. To sort, filter or paginate the table, simply update the data passed in the items to the table and it will re-render itself appropriately. The table will throw a sort event as needed, and helper components for paging and filtering are coming soon.
 */
var DataTable = _react2.default.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: _constants.DATA_TABLE,

	// ### Prop Types
	propTypes: {
		/**
   * A variant which adds borders to the table.
   */
		bordered: PropTypes.bool,
		/**
   * A variant which adds more horizontal padding to the outter edges of the table.
   */
		buffered: PropTypes.bool,
		/**
   * Provide children of the type `<DataTableColumn />` to define the structure of the data being represented and children of the type `<DataTableRowActions />` to define a menu which will be rendered for each item in the grid. Use a _higher-order component_ to customize a data table cell that will override the default cell rendering. `CustomDataTableCell` must have the same `displayName` as `DataTableCell` or it will be ignored. If you want complete control of the HTML, including the wrapping `td`, you don't have to use `DataTableCell`.
   * ```
   * import DataTableCell from 'design-system-react/data-table/cell';
     * const CustomDataTableCell = ({ children, ...props }) => (
     *   <DataTableCell {...props} >
     *     <a href="javascript:void(0);">{children}</a>
     *   </DataTableCell>
     * );
     * CustomDataTableCell.displayName = DataTableCell.displayName;
     *
   * <DataTable>
   *   <DataTableColumn />
   *   <DataTableColumn>
   *     <DataTableCustomCell />
   *   </DataTableColumn>
   *   <DataTableRowActions />
   * </DataTable>
   * ```
   */
		children: PropTypes.node,
		/**
   * Class names to be added to the table.
   */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
   * A unique ID is needed in order to support keyboard navigation and ARIA support.
   */
		id: PropTypes.string,
		/**
  	 * The collection of items to render in the table.
  	 */
		items: PropTypes.array.isRequired,
		/**
   * This function fires when the selection of rows changes.
   */
		onChange: PropTypes.func,
		/**
   * This function fires when the table should be sorted.
   */
		onSort: PropTypes.func,
		/**
   * The selected rows.
   */
		selection: PropTypes.array,
		/**
   * True if rows should be selectable.
   */
		selectRows: PropTypes.bool,
		/**
   * A variant which modifies table layout by stacking cells to accommodate smaller viewports. Should not be used at the same time as `stackedHorizontal`.
   */
		stacked: PropTypes.bool,
		/**
   * A variant which modifies table layout by displaying the header and row data side by side for smaller viewports. Should not be used at the same time as `stacked`.
   */
		stackedHorizontal: PropTypes.bool,
		/**
   * A variant which adds stripes to alternating rows.
   */
		striped: PropTypes.bool
	},

	getDefaultProps: function getDefaultProps() {
		return {
			bordered: false,
			id: _shortid2.default.generate(),
			selection: [],
			selectRows: false,
			stacked: false,
			stackedHorizontal: false,
			striped: false
		};
	},
	componentWillMount: function componentWillMount() {
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		(0, _checkProps2.default)(_constants.DATA_TABLE, this.props);
	},


	// ### Render
	render: function render() {
		var _this = this;

		var numRows = count(this.props.items);
		var numSelected = count(this.props.selection);
		var canSelectRows = this.props.selectRows && numRows > 0;
		var allSelected = canSelectRows && numRows === numSelected;
		var indeterminateSelected = canSelectRows && numRows !== numSelected && numSelected !== 0;
		var columns = [];
		var RowActions = null;

		// Legacy Support
		if ((0, _lodash4.default)(this.props.columns)) {
			this.props.columns.forEach(function (column) {
				columns.push({
					Cell: _cell2.default,
					props: {
						label: column.displayName,
						property: column.propertyName,
						sortable: column.sortable
					}
				});
			});
		}

		_react2.default.Children.forEach(this.props.children, function (child) {
			if (child && child.type === _column2.default) {
				var _child$props = child.props;
				var children = _child$props.children;

				var columnProps = _objectWithoutProperties(_child$props, ['children']);

				var props = (0, _lodash2.default)({}, _this.props);
				delete props.children;
				(0, _lodash2.default)(props, columnProps);

				var Cell = void 0;
				if (children && children.type.displayName === _constants.DATA_TABLE_CELL) {
					Cell = children.type;
					(0, _lodash2.default)(props, children.props);
				} else {
					Cell = _cell2.default;
				}

				columns.push({
					Cell: Cell,
					props: props,
					dataTableProps: _this.props
				});
			} else if (child && child.type === _rowActions2.default) {
				RowActions = child;
			}
		});

		return _react2.default.createElement(
			'table',
			{
				className: (0, _classnames2.default)('slds-table', {
					'slds-table--bordered': this.props.bordered,
					'slds-table--cell-buffer': this.props.buffered,
					'slds-max-medium-table--stacked': this.props.stacked,
					'slds-max-medium-table--stacked-horizontalviewports': this.props.stackedHorizontal,
					'slds-table--striped': this.props.striped
				}, this.props.className),
				id: this.props.id
			},
			_react2.default.createElement(_head2.default, {
				allSelected: allSelected,
				indeterminateSelected: indeterminateSelected,
				canSelectRows: canSelectRows,
				columns: columns,
				id: this.props.id + '_' + _constants.DATA_TABLE_HEAD,
				onToggleAll: this.handleToggleAll,
				onSort: this.props.onSort,
				showRowActions: !!RowActions
			}),
			_react2.default.createElement(
				'tbody',
				null,
				numRows > 0 ? this.props.items.map(function (item, index) {
					return _react2.default.createElement(_row2.default, {
						canSelectRows: canSelectRows,
						columns: columns,
						id: _this.props.id + '-' + _constants.DATA_TABLE_ROW + '-' + index,
						item: item,
						key: index,
						onToggle: _this.handleRowToggle,
						selection: _this.props.selection,
						rowActions: RowActions
					});
				})
				// Someday this should be an element to render when the table is empty
				: null
			)
		);
	},
	handleToggleAll: function handleToggleAll(selected, e) {
		if ((0, _lodash6.default)(this.props.onChange)) {
			var selection = selected ? [].concat(_toConsumableArray(this.props.items)) : [];

			this.props.onChange(selection, e);
		}
	},
	handleRowToggle: function handleRowToggle(item, selected, e) {
		if ((0, _lodash6.default)(this.props.onChange)) {
			var selection = void 0;

			if (selected) {
				selection = [].concat(_toConsumableArray(this.props.selection), [item]);
			} else {
				selection = (0, _lodash8.default)(this.props.selection, item);
			}

			this.props.onChange(selection, e);
		}
	}
});

module.exports = DataTable;