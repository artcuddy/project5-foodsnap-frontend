import { NavLink } from "react-router-dom";
import Paper from "@mui/material/Paper";
import styles from "../styles/FooterNavBar.module.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const FixedFooterNavigation = () => {
  const currentUser = useCurrentUser();

  const loggedOutBar = (
    <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/">
      <HomeOutlinedIcon /> Home
    </NavLink>
  );

  const loggedInBar = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/"
      >
        <HomeOutlinedIcon /> Home
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/feed"
      >
        <SortOutlinedIcon /> Feed
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/liked"
      >
        <FavoriteBorderOutlinedIcon /> Liked
      </NavLink>
    </>
  );

  return (
    <Paper
      className={styles.FooterBar}
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      {currentUser ? loggedInBar : loggedOutBar}
    </Paper>
  );
};

export default FixedFooterNavigation;
