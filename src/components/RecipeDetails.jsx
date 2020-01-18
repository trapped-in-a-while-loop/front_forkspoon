import React, { Component } from 'react';
import { getRecipe as serviceGetRecipe } from '../services/recipeService';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'

class RecipeDetails extends Component {

	constructor(props) {
		super(props);
		this.state = { recipe: {} };
	}

	async componentDidMount() {
		const { id } = this.props.match.params;
		try {
			const recipe = await serviceGetRecipe(id);
			this.setState({recipe: recipe});
		} catch(err) {
			this.setState({recipe: null});
		}
	}

	render() {
		const recipe = this.state.recipe;

		if (!recipe) {
      return (
				<div className="text-center">
					<h1>The requested recipe doesn't exist.</h1>
					<Button variant="dark">
						<Link to="/catalog">Back to Home</Link>
					</Button>
				</div>
			);
    }

    return (
      <div>
        <h1>{recipe.name}</h1>
        <p>{recipe.description}</p>
      </div>
    );
  }

}

export default RecipeDetails;
