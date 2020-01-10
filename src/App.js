import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Header from "./components/Header";

import { Catalog } from "./components/Catalog";
import { MyRecipes } from "./components/MyRecipes";
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
            <Route exact path="/myrecipes" component={MyRecipes} />
            <Route path="/myfavorites" component={MyFavorites} />
            <Route path="/fridge" component={Fridge} />
          </Switch>
        </Router>
      </React.Fragment>
    </div>
  );
}

export default App;
