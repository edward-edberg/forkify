import * as model from './model.js';
import recipeView from './views/recipeView.js';

// import icons from '../img/icons.svg';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeView.renderSpinner();
    // 1 Loading recipe
    await model.loadRecipe(id);
    // const { recipe } = model.state;
    // console.log(recipe);
    // 2) Rendering recipe
    recipeView.render(model.state.recipe);

    // recipeContainer.insertAdjacentHTML('beforeend', markup);
  } catch (err) {
    console.log(err);
  }
};
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
// showRecipe();

// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
