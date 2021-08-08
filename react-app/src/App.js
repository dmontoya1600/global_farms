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
import CreateFarm from './components/Farm/CreateFarm';


function App() {
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  const err = useSelector(state=> state.session.error)
  let [pageActive, setPageActive] = useState(false)

  useEffect(() =>{
    if(err){
      setPageActive(true)
    }
  }, [err])

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
      {err && pageActive?
        <div id='error__page'>
          <div className='error__oops'>Oops!</div>
          <div className='error__message'>
            Error: {err.message}
          </div>
          <i className='fas fa-times-circle error__close' onClick={() => setPageActive(false)}/>
        </div> :
        null}
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
        <Route path='/create-farm' >
          <NavBar />
          <CreateFarm />
        </Route>
        <div>PAGE NOT FOUND</div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
