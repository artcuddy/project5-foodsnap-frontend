import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "../styles/Asset.module.css";

const Asset = ({ spinner, src, message }) => {
  return (
    <div className={`${styles.Asset} p-4`}>
      {spinner && <Spinner animation="border" />}
      {src && <img className={styles.Image} src={src} alt={message} />}
      {message && <p className={`${styles.Message} "mt-4"`}>{message}</p>}
    </div>
  );
};

export default Asset;
