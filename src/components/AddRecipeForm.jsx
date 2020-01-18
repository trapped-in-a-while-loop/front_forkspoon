import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import RecipeForm from './RecipeForm';

class AddRecipeForm extends React.Component {

  constructor(props) {
		super(props);
    this.state = { showForm: false };
    this.showFormHandler = this.showFormHandler.bind(this)
  }

  showFormHandler(value) {
    this.setState({ showForm: value });
  }

  recipeState = {
    name: "",
    description: "",
    category: "",
    duration: "",
    ingredients: [{ name: "", amount: "", unit: "" }],
    instructions: [{ name: "" }],
    price: ""
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <Fab color="primary" aria-label="add" onClick={() => this.showFormHandler(true)} className={classes.fabPosition}>
          <AddIcon />
        </Fab>
        <RecipeForm
          onAdd={this.props.onAdd}
          recipe={this.recipeState}
          show={this.state.showForm}
          showHandler={this.showFormHandler}
          modalTitle="Add new recipe" />
      </>
    )
  }

}

const styles = () => ({
  fabPosition: {
    position: 'fixed',
    bottom: 20,
    right: 20
  }
});

AddRecipeForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddRecipeForm);
