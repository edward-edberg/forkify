import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

// import icons from '../img/icons.svg';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    // 1 Loading recipe
    await model.loadRecipe(id);
    // const { recipe } = model.state;
    // console.log(recipe);
    // 2) Rendering recipe
    recipeView.render(model.state.recipe);

    // recipeContainer.insertAdjacentHTML('beforeend', markup);
  } catch (err) {
    // console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // console.log('rendering');
    resultsView.renderSpinner();
    // console.log(resultsView);
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    // console.log(model.state.search.results);
    // console.log(model.getSearchResultsPage(1));
    resultsView.render(model.getSearchResultsPage());

    // 4) Render the pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
// controlSearchResults();
const controlPagination = function (goToPage) {
  // console.log(goToPage);
  // 1) Render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render the pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);
  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
// showRecipe();

// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
