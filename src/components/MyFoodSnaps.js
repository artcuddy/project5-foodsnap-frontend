import React from "react";
import styles from "../styles/MyFoodSnaps.module.css";

import foodSnaps from "../assets/foodsnaps.webp";

const MyFoodSnaps = () => {
  return (
    <p className={styles.Title}>
      <img
        className={styles.FoodSnappers}
        src={foodSnaps}
        alt="Popular foodSNAPS"
        height="20"
      />
      You Created
    </p>
  );
};

export default MyFoodSnaps;
