import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import './App.css';

import Header from "./components/Header";

import { Catalog } from "./components/Catalog";
import MyRecipes from "./components/MyRecipes";
import RecipeDetails from "./components/RecipeDetails";
import { MyFavorites } from "./components/MyFavorites";
import { Fridge } from "./components/Fridge";

function App() {
  return (
    <div>
      <React.Fragment>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Catalog} />
            <Route path="/myrecipes" component={MyRecipes} />
            <Route path="/recipe/:id" component={RecipeDetails} />
            <Route path="/myfavorites" component={MyFavorites} />
            <Route path="/fridge" component={Fridge} />
            <Redirect from="*" to={"/"} />
          </Switch>
        </Router>
      </React.Fragment>
    </div>
  );
}

export default App;
