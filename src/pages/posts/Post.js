import { useState, useEffect } from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import Tooltip from '@mui/material/Tooltip';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RecipeCreateForm from "../recipes/RecipesCreateForm";
import Recipes from "../recipes/Recipes";
import { axiosReq } from "../../api/axiosDefaults";

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
  const [post, setPost] = useState({ results: [] });

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      history.goBack();
    } catch (err) {
      // console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }, { data: recipes }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/recipes/?post=${id}`),
        ]);
        setPost({ results: [post] });
        setRecipes(recipes);
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={40} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
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
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        <div className={styles.PostBar}>
          <div className={styles.Heart}>
          {is_owner ? (
          <Tooltip title="You can't like your own post!" placement="top" arrow>
              <FavoriteBorderOutlinedIcon />
          </Tooltip> 
          ) : like_id ? (
            <span onClick={handleUnlike}>
              <FavoriteIcon  sx={{ color: red[500] }}/>
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <FavoriteBorderOutlinedIcon />
            </span>
          ) : (
          <Tooltip title="Please login to like posts!" placement="top" arrow>
              <FavoriteIcon />
          </Tooltip> 
          )}
          {likes_count}
          </div>
          <div className={styles.Comments}>
          <Link to={`/posts/${id}`}>
            <ChatBubbleOutlineOutlinedIcon />
          </Link>
          {comments_count}
          </div>
          {recipes.results.length  ? (
                  <div className={styles.Recipes} onClick={() => setRecipeOpen(!recipeOpen)}>
            <RestaurantMenuOutlinedIcon className={styles.Recipes}/>
            View Recipe
          </div>
           ) : is_owner && recipes.results.length === 0 ? (
           <div className={styles.Recipes} onClick={() => setRecipeOpen(!recipeOpen)}>
            <AddCircleOutlineOutlinedIcon  />
            Add Recipe
          </div>
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
              setPost={setPost}
              setRecipes={setRecipes}
            />
          ) : recipes.results.length ? (
            <h5>Check out the recipe here!</h5>
          ) : null}
          {recipes.results.length ? (
            <Recipes {...recipes.results[0]} setRecipes={setRecipes} />
          ) : currentUser ? (
            <span>No recipe has been added yet!</span>
          ) : (
            <span>Sorry no recipe has been added yet!</span>
          )}
        </Card.Body>
  )}
    </Card>
  );
};

export default Post;