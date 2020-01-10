import sendRequest from './sendRequest';

const BASE_PATH = '/api/recipe';

export const getRecipes = () =>
  sendRequest(`${BASE_PATH}`, {
    method: 'GET',
  });

export const addRecipe = recipe =>
  sendRequest(`${BASE_PATH}`, {
    body: JSON.stringify(recipe),
  });

export const getRecipe = recipeId =>
  sendRequest(`${BASE_PATH}/${recipeId}`, {
    method: 'GET',
  });

export const updateRecipe = (recipeId, recipe) =>
  sendRequest(`${BASE_PATH}/${recipeId}`, {
    method: 'PUT',
    body: JSON.stringify(recipe),
  });

export const deleteRecipe = recipeId =>
  sendRequest(`${BASE_PATH}/${recipeId}`, {
    method: 'DELETE',
  });
