import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import RecipeForm from "./RecipeForm";
import Recipe from "./Recipe";
import { addRecipe as serviceAddRecipe } from '../services/recipeService';

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  }
}));

export function MyRecipes() {
  const classes = useStyles();
  const [recipes, setRecipes] = useState([]);

  function addRecipe(newRecipe) {
    console.log('newRecipe', newRecipe);
    serviceAddRecipe(newRecipe)
    setRecipes(previousRecipes => {
      return [...previousRecipes, newRecipe];
    });
  }

  function deleteRecipe(id) {
    setRecipes(prevRecipes => {
      return prevRecipes.filter((_, index) => {
        return index !== id;
      });
    });
  }

  function updateRecipe(id) {
    console.log("Update Recipe");
  }

  return (
    <>
    <CssBaseline />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <h1>My Recipes</h1>
          <RecipeForm onAdd={addRecipe} />
          <Grid container spacing={4}>
            {recipes.map((recipeItem, index) => {
              return (
              <Grid item key={recipeItem} xs={12} sm={6} md={4}>
                <Recipe
                  key={index}
                  id={index}
                  title={recipeItem.name}
                  description={recipeItem.description}
                  category={recipeItem.category}
                  duration={recipeItem.duration}
                  ingredients={recipeItem.ingredients}
                  instructions={recipeItem.instructions}
                  price={recipeItem.price}
                  rate={recipeItem.rate}
                  onUpdate={updateRecipe}
                  onDelete={deleteRecipe}
                />
              </Grid>
              );
            })
            }   
          </Grid>
        </Container>
      </main>
    </>
  );
};
