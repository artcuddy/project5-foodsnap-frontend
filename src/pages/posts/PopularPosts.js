import React, { useEffect, useState } from "react";

import { Container } from "react-bootstrap";

import PopularPost from "./PopularPost";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import styles from "../../styles/PopularPosts.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.webp";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import foodSnaps from "../../assets/foodsnaps.webp";

function PopularPosts({ mobile, message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();
  // const hasMostLikes = (post) => post.likes_count >= 2;
  // const filteredPosts = (post) =>
  //       post.likes_count.filter(hasMostLikes).length > 0;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get("/posts/");
        // setPosts(data.find((posts) => posts.likes_count >= 2));
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, pathname, currentUser]);

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      {hasLoaded ? (
        <>
          <p className={styles.Title}>
            Popular{" "}
            <img
              className={styles.FoodSnappers}
              src={foodSnaps}
              alt="Popular foodSNAPS"
              height="20"
            />
          </p>
          {posts.results.length ? (
            <>
              {posts.results
                .slice(0, 4)
                .filter((post) => post.likes_count >= 2)
                .reverse()
                .map((post) => (
                  <PopularPost key={post.id} {...post} setPosts={setPosts} />
                ))}
            </>
          ) : (
            <Container className={appStyles.Content}>
              <Asset src={NoResults} message={message} />
            </Container>
          )}
        </>
      ) : (
        <Container className={appStyles.Content}>
          <Asset spinner />
        </Container>
      )}
    </Container>
  );
}

export default PopularPosts;
