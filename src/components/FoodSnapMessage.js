import React from "react";
import styles from "../styles/FoodSnapMessage.module.css";

import foodSnaps from "../assets/foodsnaps.webp";

const FoodSnapMessage = (props) => {
  const { message } = props;

  return (
    <p className={styles.Title}>
      <img
        className={styles.FoodSnappers}
        src={foodSnaps}
        alt="Popular foodSNAPS"
        height="20"
      />
      {message}
    </p>
  );
};

export default FoodSnapMessage;
