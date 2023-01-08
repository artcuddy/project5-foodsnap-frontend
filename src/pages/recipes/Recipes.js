import { useState } from "react";
import { Media } from "react-bootstrap";
import { MoreDropdown } from "../../components/MoreDropdown";
import styles from "../../styles/Recipes.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import RecipeEditForm from "./RecipeEditForm";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";

const Recipes = (props) => {
  const {
    profile_id,
    owner,
    ingredients,
    method,
    id,
    setRecipes,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/recipes/${id}/`);
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
        {is_owner && showEditForm ? (
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
            <div className={styles.RecipeDiv}>
              <h5 className={styles.RecipeTitle}>
                <FormatListBulletedOutlinedIcon /> Ingredients
              </h5>
              <p className={styles.CssFix}>{ingredients}</p>
            </div>
            <div className={styles.RecipeDiv}>
              <h5 className={styles.RecipeTitle}>
                <MenuBookOutlinedIcon /> Method
              </h5>
              <p className={styles.CssFix}>
                {method}
              </p>
            </div>
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