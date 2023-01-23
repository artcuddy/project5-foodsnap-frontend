import { useState, useEffect } from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import Tooltip from "@mui/material/Tooltip";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { red } from "@mui/material/colors";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import RecipeCreateForm from "../recipes/RecipesCreateForm";
import Recipes from "../recipes/Recipes";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import useAlert from "../../hooks/useAlert";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    title,
    content,
    image,
    updated_at,
    postPage,
    setPosts,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();
  const [recipes, setRecipes] = useState({ results: [] });
  const [recipeOpen, setRecipeOpen] = useState(false);

  const { setAlert } = useAlert();

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      history.push("/");
      setAlert("foodSnap deleted!", "success");
    } catch (err) {
      setAlert(err.message, "error");
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { post: id });
      setAlert("Thanks you liked this foodSNAP!", "success");
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? {
                ...post,
                likes_count: post.likes_count + 1,
                like_id: data.id,
              }
            : post;
        }),
      }));
    } catch (err) {
      setAlert(err.message, "error");
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setAlert("What a shame you have unliked this foodSNAP", "success");
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? {
                ...post,
                likes_count: post.likes_count - 1,
                like_id: null,
              }
            : post;
        }),
      }));
    } catch (err) {
      setAlert(err.message, "error");
    }
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data } = await axiosReq.get(`/recipes/?post=${id}`);
        setRecipes(data);
      } catch (err) {
        // console.log(err);
      }
    };

    const timer = setTimeout(() => {
      fetchRecipes();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [id, currentUser]);

  return (
    <Card className={`${styles.Post} ${appStyles.BoxShadow}`}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={40} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span className={styles.Date}>{updated_at}</span>
            {is_owner && postPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && (
          <Card.Title className={`${styles.CardTitle} "text-center"`}>
            {title}
          </Card.Title>
        )}
        {content && (
          <Card.Text className={styles.CardDescription}>{content}</Card.Text>
        )}
        <div className={`${styles.PostBar} ${appStyles.BoxShadow}`}>
          <div className={styles.Heart}>
            {is_owner ? (
              <Tooltip
                title="You can't like your own foodSNAP!"
                placement="top"
                arrow
              >
                <FavoriteBorderOutlinedIcon />
              </Tooltip>
            ) : like_id ? (
              <span onClick={handleUnlike}>
                <FavoriteIcon sx={{ color: red[500] }} />
              </span>
            ) : currentUser ? (
              <span onClick={handleLike}>
                <FavoriteBorderOutlinedIcon />
              </span>
            ) : (
              <Tooltip
                title="Please login to like posts!"
                placement="top"
                arrow
              >
                <Link to={"/signin"}>
                  <FavoriteIcon />
                </Link>
              </Tooltip>
            )}
            {likes_count}
          </div>
          <div className={styles.Comments}>
            <Link to={`/posts/${id}`} aria-label={title}>
              <ChatBubbleOutlineOutlinedIcon />
            </Link>
            {comments_count}
          </div>
          {recipes.results.length && currentUser ? (
            <Tooltip title="Click to view the recipe" placement="bottom" arrow>
              <div
                className={styles.Recipes}
                onClick={() => setRecipeOpen(!recipeOpen)}
              >
                {!recipeOpen ? (
                  <RestaurantMenuOutlinedIcon className={styles.Recipes} />
                ) : (
                  <CloseOutlinedIcon />
                )}
                Recipe
              </div>
            </Tooltip>
          ) : recipes.results.length && !currentUser ? (
            <Tooltip title="Login to view the recipe" placement="bottom" arrow>
              <Link to={"/signin"} aria-label="Click to sign in">
                <div className={styles.Recipes}>
                  <RestaurantMenuOutlinedIcon className={styles.Recipes} />
                  Login for Recipe
                </div>
              </Link>
            </Tooltip>
          ) : is_owner && recipes.results.length === 0 ? (
            <Tooltip title="Click to add a recipe" placement="bottom" arrow>
              <div
                className={styles.Recipes}
                onClick={() => setRecipeOpen(!recipeOpen)}
              >
                <AddCircleOutlineOutlinedIcon />
                Add Recipe
              </div>
            </Tooltip>
          ) : (
            <div></div>
          )}
        </div>
      </Card.Body>
      {recipeOpen && (
        <Card.Body>
          {is_owner && currentUser && recipes.results.length === 0 ? (
            <RecipeCreateForm
              profile_id={currentUser.profile_id}
              post={id}
              setRecipes={setRecipes}
            />
          ) : recipes.results.length ? (
            <Recipes {...recipes.results[0]} setRecipes={setRecipes} />
          ) : currentUser ? (
            <span className={styles.NoRecipe}>
              No recipe has been added yet!
            </span>
          ) : (
            <span className={styles.NoRecipe}>
              Sorry no recipe has been added yet!
            </span>
          )}
        </Card.Body>
      )}
    </Card>
  );
};

export default Post;
