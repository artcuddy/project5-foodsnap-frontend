import styles from "../../styles/Post.module.css";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import appStyles from "../../App.module.css";

const PopularPost = (props) => {
  const { id, title, image } = props;

  return (
    <Card className={`${styles.Post} ${appStyles.BoxShadow}`}>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
      </Card.Body>
    </Card>
  );
};

export default PopularPost;
