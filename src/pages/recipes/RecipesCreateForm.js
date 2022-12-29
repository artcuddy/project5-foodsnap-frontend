import React, { useState } from "react";

import Form from "react-bootstrap/Form";

import styles from "../../styles/RecipesCreateEditForm.module.css";
import { axiosRes } from "../../api/axiosDefaults";


function RecipeCreateForm(props) {

  const { post, setPost, setRecipes } = props;
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
      const { data } = await axiosRes.post("/recipes/", {
        ingredients,
        method,
        post,
      });
      setRecipes((prevRecipes) => ({
        ...prevRecipes,
        results: [data, ...prevRecipes.results],
      }));
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            recipes_count: prevPost.results[0].recipes_count + 1,
          },
        ],
      }));
      setIngredients("");
      setMethod("");
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
          <Form.Control
            className={styles.Form}
            placeholder="Ingredients"
            as="textarea"
            name="ingredients"
            value={ingredients}
            onChange={handleIngredients}
            rows={4}
          />
               <Form.Control
            className={styles.Form}
            placeholder="Method"
            name="method"
            as="textarea"
            value={method}
            onChange={handleMethod}
            rows={4}
          />
      </Form.Group>
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!ingredients.trim()}
        type="submit"
      >
        Add Recipe
      </button>
    </Form>
  );
}

export default RecipeCreateForm;