define(['module', 'react', '../../utilities/constants'], function (module, _react, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var PropTypes = _react2.default.PropTypes;


	/**
  * A default empty state for Cards.
  */
	var CardEmpty = function CardEmpty(props) {
		return _react2.default.createElement(
			'div',
			{ className: 'slds-p-horizontal--small' },
			_react2.default.createElement(
				'div',
				{ className: 'slds-text-align--center slds-m-bottom--x-large' },
				_react2.default.createElement(
					'h3',
					{ className: 'slds-text-heading--small slds-p-top--large slds-p-bottom--large' },
					props.heading
				),
				props.children
			)
		);
	};

	// ### Display Name
	// Always use the canonical component name as the React display name.
	CardEmpty.displayName = _constants.CARD_EMPTY;

	// ### Prop Types
	CardEmpty.propTypes = {
		/**
   * Additional call to actions that will render under the heading. Often this is an "Add Item" button.
   */
		children: PropTypes.node,
		/**
   * Primary text for an Empty Card.
   */
		heading: PropTypes.string
	};

	CardEmpty.defaultProps = {
		heading: 'No Related Items'
	};

	module.exports = CardEmpty;
});