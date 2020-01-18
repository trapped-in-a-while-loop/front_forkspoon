import React, { useState } from 'react';
import { Button, Modal, Form, InputGroup } from 'react-bootstrap';
import IngredientInputs from './IngredientInputs'

function RecipeForm(props) {

  const recipeState = props.recipe;
  const [recipe, setRecipe] = useState(recipeState);

  function handleChange(event) {
    const { name, value } = event.target;
    setRecipe(previousRecipe => {
      return { ...previousRecipe, [name]: value };
    });
  }

  function handleSave(event) {
    // Format Dynamic form fields
    recipe.instructions = recipe.instructions.map(i => i.name);
    recipe.ingredients = ingredients;

    props.onAdd ? props.onAdd(recipe) : props.onUpdate(recipe);
    setRecipe(recipeState);
    event.preventDefault();
    props.showHandler(false);
  }

  /* Manage Instructions array */

  function handleAddInstruction() {
    setRecipe(previousRecipe => {
      return {
        ...previousRecipe,
        instructions: recipe.instructions.concat([{ name: "" }])
      };
    });
  }

  function handleChangeInstruction(evt, idx) {
    const newInstructions = recipe.instructions.map((instruction, sidx) => {
      if (idx !== sidx) return instruction;
      return { ...instruction, name: evt.target.value };
    });
    setRecipe(previousRecipe => {
      return {
        ...previousRecipe,
        instructions: newInstructions
      };
    });
  }

  function handleRemoveInstruction(idx) {
    setRecipe(previousRecipe => {
      return {
        ...previousRecipe,
        instructions: recipe.instructions.filter((_, sidx) => idx !== sidx)
      };
    });
  }

  /* Manage Ingredients array */

  const blankIngredient = { name: "", amount: "", unit: "" };
  const [ingredients, setIngredient] = useState([
    { ...blankIngredient },
  ]);

  function handleAddIngredient() {
    setIngredient([...ingredients, { ...blankIngredient }]);
  }

  const handleIngredientChange = (e) => {
    const newIngredients = [...ingredients];
    newIngredients[e.target.dataset.idx][e.target.dataset.item] = e.target.value;
    setIngredient(newIngredients);
  };

  function handleRemoveIngredient(idx) {
    setIngredient(ingredients.filter((_, sidx) => idx !== sidx));
  }

  return(
    <>
      <Modal show={props.show} onHide={() => props.showHandler(false)}>
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title className="modal-title">{props.modalTitle}</Modal.Title>
        </Modal.Header>

        <Form className="modal-body text-center">

          <Form.Group controlId="recipeName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              onChange={handleChange}
              type="text"
              placeholder="Name of the recipe"
              value={recipe.name || ""}
            />
          </Form.Group>

          <Form.Group controlId="recipeDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              name="description" 
              onChange={handleChange} 
              type="text" 
              placeholder="Describe your recipe" 
              value={recipe.description || ""}
            />
          </Form.Group>

          <Form.Group controlId="recipeCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control name="category" as="select" onChange={handleChange} value={recipe.category || ""}>
              <option value="">Select a category</option>
              <option>Appetizer</option>
              <option>Beverage</option> 
              <option>Dish</option>
              <option>Dessert</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="recipeDuration">
            <Form.Label>Duration</Form.Label>
            <Form.Control 
              name="duration" 
              onChange={handleChange} 
              type="number" 
              placeholder="Time to make the recipe" 
              min="0" 
              value={recipe.duration || ""}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Ingredients</Form.Label>
            {ingredients.map((_, idx) => (
              <IngredientInputs
                key={`ingredient-${idx}`}
                idx={idx}
                ingredientState={ingredients}
                handleIngredientChange={handleIngredientChange}
                handleIngredientRemove={() => handleRemoveIngredient(idx)}
              />
            ))}
            <Button onClick={handleAddIngredient}>Add ingredient</Button>
          </Form.Group>

          <Form.Group>
            <Form.Label>Instructions</Form.Label>
            {recipe.instructions.map((instruction, idx) => (
              <InputGroup className="mb-1" key={idx}>
                <Form.Control
                  name="instruction"
                  type="text"
                  placeholder={`Instruction #${idx + 1}`}
                  onChange={(evt) => handleChangeInstruction(evt, idx)}
                  value={instruction.name || ""}
                />
                <InputGroup.Append>
                  <Button onClick={() => handleRemoveInstruction(idx)} variant="outline-secondary">-</Button>
                </InputGroup.Append>
              </InputGroup>
            ))}
            <Button onClick={handleAddInstruction}>Add instruction</Button>
          </Form.Group>

          <Form.Group controlId="recipePrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              name="price"
              onChange={handleChange}
              type="number"
              placeholder="Estimated cost of your recipe"
              min="0"
              value={recipe.price || ""}
            />
          </Form.Group>

        </Form>

        <Modal.Footer className="modal-footer">
          <Button className="btn btn-secondary" onClick={() => props.showHandler(false)}>Close</Button>
          <Button variant="primary" onClick={handleSave}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default RecipeForm;
