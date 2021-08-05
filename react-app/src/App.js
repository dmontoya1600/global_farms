import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate, getSavedFarms, getWallet } from './store/session';
import Farm from './components/Farm'
import HomePage from './components/HomePage'


function App() {
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      if(user){
        await dispatch(getWallet(user.id))
        await dispatch(getSavedFarms(user.id))
      }
    })();

  }, [user?.id])

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/farms/:farmId' exact={true} >
          <NavBar />
          <Farm />
        </Route>
        <Route path='/' exact={true} >
          <NavBar />
          <HomePage />
        </Route>
        <div>PAGE NOT FOUND</div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
