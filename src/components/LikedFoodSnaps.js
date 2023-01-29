import React from "react";
import styles from "../styles/LikedFoodSnaps.module.css";

import foodSnaps from "../assets/foodsnaps.webp";

const LikedFoodSnaps = () => {
  return (
    <p className={styles.Title}>
      <img
        className={styles.FoodSnappers}
        src={foodSnaps}
        alt="Popular foodSNAPS"
        height="20"
      />
      You Liked
    </p>
  );
};

export default LikedFoodSnaps;
