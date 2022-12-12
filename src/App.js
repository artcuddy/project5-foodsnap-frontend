import React from 'react';
import NavBar from './components/layout/NavBar';
import styles from './App.module.css'
import Container from 'react-bootstrap/Container'
import { Route, Switch } from "react-router-dom";

function App() {
  return (


<div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path='/' render={() =>  <h1>Home Page</h1>} />
          <Route exact path='/signin' render={() =>  <h1>Sign In</h1>} />
          <Route exact path='/signup' render={() =>  <h1>Sign Up</h1>} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>

  );
}

export default App;
