import { FormGroup } from "@mui/material";
import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";

import styles from "../../styles/RecipesCreateEditForm.module.css";

function RecipeEditForm(props) {
  const { id, ingredients, method, setShowEditForm, setRecipes } = props;

  const [formIngredients, setFormIngredients] = useState(ingredients);
  const [formMethod, setFormMethod] = useState(method);


  const handleIngredients = (event) => {
    setFormIngredients(event.target.value);
  };

  const handleMethod = (event) => {
    setFormMethod(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/recipes/${id}/`, {
        ingredients: formIngredients.trim(),
        method: formMethod.trim(),
      });
      setRecipes((prevRecipes) => ({
        ...prevRecipes,
        results: prevRecipes.results.map((recipe) => {
          return recipe.id === id
            ? {
                ...recipe,
                ingredients: formIngredients.trim(),
                method: formMethod.trim(),
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
          value={formIngredients}
          onChange={handleIngredients}
          rows={4}
        />
      </Form.Group>
      <FormGroup>
                         <Form.Control
          className={styles.Form}
          as="textarea"
          name="method"
          value={formMethod}
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
          disabled={!formIngredients.trim()}
          type="submit"
        >
          save
        </button>
      </div>
    </Form>
  );
}

export default RecipeEditForm;