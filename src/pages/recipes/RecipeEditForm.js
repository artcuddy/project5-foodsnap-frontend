import { FormGroup } from "@mui/material";
import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";

import styles from "../../styles/RecipesCreateEditForm.module.css";

function RecipeEditForm(props) {
  const { id, setShowEditForm, setRecipes } = props;

  const [ingredients, setIngredients] = useState("");
  const [method, setMethod] = useState("");

  const handleIngredients = (event) => {
    setIngredients(event.target.value);
  };

  const handleMethod = (event) => {
    setMethod(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/recipes/${id}/`, {
        ingredients,
        method,
      });
      setRecipes((prevRecipe) => ({
        ...prevRecipe,
        results: prevRecipe.results.map((recipe) => {
          return recipe.id === id
            ? {
                ...recipe,
                ingredients: ingredients.trim(),
                method: method.trim(),
                updated_at: "now",
              }
            : recipe;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
                <Form.Control
          className={styles.Form}
          as="textarea"
          name="ingredients"
          value={ingredients}
          onChange={handleIngredients}
          rows={4}
        />
      </Form.Group>
      <FormGroup>
                         <Form.Control
          className={styles.Form}
          as="textarea"
          name="method"
          value={method}
          onChange={handleMethod}
          rows={4}
        />
      </FormGroup>
      <div className="text-right">
        <button
          className={styles.Button}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          cancel
        </button>
        <button
          className={styles.Button}
          disabled={!ingredients.trim()}
          type="submit"
        >
          save
        </button>
      </div>
    </Form>
  );
}

export default RecipeEditForm;