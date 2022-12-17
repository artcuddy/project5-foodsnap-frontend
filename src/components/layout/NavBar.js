import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.webp';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import LoginSharpIcon from '@mui/icons-material/LoginSharp';
import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp';
import styles from "../../styles/NavBar.module.css";

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/">
        <Navbar.Brand><img src={logo} alt="logo" height="45"/></Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink to="/" exact className={styles.NavLink} activeClassName={styles.Active}><HomeSharpIcon fontSize="large"/>Home</NavLink>
            <NavLink to="/signin" className={styles.NavLink} activeClassName={styles.Active}><LoginSharpIcon fontSize="large"/>Sign In</NavLink>
            <NavLink to="/signup" className={styles.NavLink} activeClassName={styles.Active}><PersonAddAltSharpIcon fontSize="large"/>Sign Up</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar