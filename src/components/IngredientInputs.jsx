import React from 'react';
import PropTypes from 'prop-types';

import { Form, InputGroup, Button } from 'react-bootstrap';

const IngredientInputs = ({ idx, ingredientState, handleIngredientChange, handleIngredientRemove }) => {
	const nameId = `name-${idx}`;
	const amountId = `amount-${idx}`;
	const unitId = `unit-${idx}`;
	
	return (
		<InputGroup className="mb-1">
			<Form.Control
				type="text"
				placeholder={`Name #${idx + 1}`}
				name={nameId}
				data-idx={idx}
				id={nameId}
				data-item="name"
				value={ingredientState[idx].name}
				onChange={handleIngredientChange}
			/>
			<Form.Control
				type="number"
				placeholder="Amount"
				name={amountId}
				data-idx={idx}
				id={amountId}
				data-item="amount"
				value={ingredientState[idx].amount}
				onChange={handleIngredientChange}
			/>
			<Form.Control
				as="select"
				name={unitId}
				data-idx={idx}
				id={unitId}
				data-item="unit"
				value={ingredientState[idx].unit}
				onChange={handleIngredientChange}
			>
				<option value="">Unit</option>
				<option>unity</option>
				<option>kg</option>
				<option>liter</option>
			</Form.Control>
			<InputGroup.Append>
				<Button onClick={handleIngredientRemove} variant="outline-secondary">-</Button>
			</InputGroup.Append>
		</InputGroup>
	);
};

IngredientInputs.propTypes = {
	idx: PropTypes.number,
	ingredientState: PropTypes.array,
	handleIngredientChange: PropTypes.func,
	handleIngredientRemove: PropTypes.func,
};

export default IngredientInputs;
