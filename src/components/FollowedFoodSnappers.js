import React from "react";
import styles from "../styles/FollowedFoodSnappers.module.css";

import foodSnappers from "../assets/foodsnappers.webp";

const FollowedFoodSnappers = () => {
  return (
    <p className={styles.Title}>
      <img
        className={styles.FoodSnappers}
        src={foodSnappers}
        alt="Popular foodSNAPS"
        height="20"
      />
      You Follow
    </p>
  );
};

export default FollowedFoodSnappers;
