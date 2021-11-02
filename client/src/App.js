import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterComplete from './pages/auth/RegisterComplete';
import Home from './pages/Home';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/register' component={Register}></Route>
        <Route
          exact
          path='/register/complete'
          component={RegisterComplete}
        ></Route>
      </Switch>
    </>
  );
};

export default App;
