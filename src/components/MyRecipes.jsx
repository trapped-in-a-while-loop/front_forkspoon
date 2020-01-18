import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import AddRecipeForm from "./AddRecipeForm";
import Recipe from "./Recipe";
import { addRecipe as serviceAddRecipe } from '../services/recipeService';
import { deleteRecipe as serviceDeleteRecipe } from '../services/recipeService';
import { getRecipes as serviceGetRecipes } from '../services/recipeService';

/**
 * TODO: The componentDidMount request (currently getRecipes) must be replaced by getRecipesByUser
 */
class MyRecipes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    }
    this.addRecipe = this.addRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }

  componentDidMount() {
		serviceGetRecipes().then(recipes => {
      this.setState({recipes: recipes});
    }).catch(err => {
      console.log(err);
      toast.error("✘ Erreur lors du chargement des recettes.")
      this.setState({recipes: []});
    });
	}

  addRecipe(newRecipe) {
    console.log('Request Recipe Creation:', newRecipe);
    serviceAddRecipe(newRecipe).then(addedRecipe => {
      console.log('Added Recipe:', addedRecipe);
      toast.success("✔ La recette a était ajoutée avec succés !");
      this.setState({
        recipes: [...this.state.recipes, addedRecipe]
      });
    }).catch(err => {
      toast.error("✘ Erreur lors de l'ajout de la recette.");
      console.log(err);
    });
  }

  deleteRecipe(id) {
    console.log('Request Recipe Deletion:', id);
    serviceDeleteRecipe(id).then(_ => {
      toast.warning("✔ La recette vient d'être supprimer.");
      this.setState({
        recipes: this.state.recipes.filter((_, index) => {
          return this.state.recipes[index]._id !== id;
        })
      });
    }).catch(err => {
      toast.error("✘ Erreur lors de la suppression de la recette.");
      console.log(err);
    });
  }

  updateRecipe(id) {
    console.log("Update Recipe");
  }

  render() {
    return (
      <>
        <main>
          <Container maxWidth="md">
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              closeOnClick
              pauseOnHover />
            <h1 className="page-title">My Recipes</h1>
            <AddRecipeForm onAdd={this.addRecipe} />
            <Grid container spacing={4}>
              {this.state.recipes.map((recipeItem, index) => {
                return (
                <Grid item key={`grid-${index}`} xs={12} sm={6} md={4}>
                  <Recipe
                    key={index}
                    id={recipeItem._id}
                    title={recipeItem.name}
                    description={recipeItem.description}
                    category={recipeItem.category}
                    duration={recipeItem.duration}
                    ingredients={recipeItem.ingredients}
                    instructions={recipeItem.instructions}
                    createdAt={recipeItem.createdAt}
                    price={recipeItem.price}
                    rate={recipeItem.rate}
                    onUpdate={this.updateRecipe}
                    onDelete={this.deleteRecipe}
                  />
                </Grid>
                );
              })}   
            </Grid>
          </Container>
        </main>
      </>
    );
  }

}

export default MyRecipes;