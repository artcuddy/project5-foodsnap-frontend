import React, { useState } from "react";
import { Media } from "react-bootstrap";
import { MoreDropdown } from "../../components/MoreDropdown";
import styles from "../../styles/Recipes.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import RecipeEditForm from "./RecipeEditForm";

const Recipes = (props) => {
  const {
    profile_id,
    owner,
    updated_at,
    ingredients,
    method,
    id,
    setPost,
    setRecipes,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/recipes/${id}/`);
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            recipes_count: prevPost.results[0].recipes_count - 1,
          },
        ],
      }));

      setRecipes((prevRecipes) => ({
        ...prevRecipes,
        results: prevRecipes.results.filter((recipe) => recipe.id !== id),
      }));
    } catch (err) {}
  };

return (
    <>
      <hr />
      <Media>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          {showEditForm ? (
            <RecipeEditForm
      id={id}
      profile_id={profile_id}
      ingredients={ingredients}
      method={method}
      setRecipes={setRecipes}
      setShowEditForm={setShowEditForm}
    />
          ) : (
            <>
            <p>{ingredients}</p>
            <p>{method}</p>
            </>
          )}
        </Media.Body>
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </>
  );
};

export default Recipes;