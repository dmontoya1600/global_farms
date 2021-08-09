import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import image from './tractor-chicken.png'
import logo from './global_farms_logo.png'
import './Auth.css'


const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  async function handleDemo () {
    await dispatch(login('demo@aa.io','password'))
  }

  return (
    <span id='login__grid'>
      <img src={image} className='login__image' />
      <img src={logo} className='logo__image' />
      <div className='right__side'>
        <div className='demo__button' onClick={() => handleDemo()}>Demo</div>
        <form className='login__form' onSubmit={onLogin}>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
              required={true}
              />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
              required={true}
              />
            <button className='login' type='submit'>Login</button>
              <div className='login__error' >
                {errors.length > 0 ? <div className='oops' >Oops!</div> : <div className='welcome__message'>Welcome To Global Farms!</div>}
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                  ))}
              </div>
          </div>
        </form>
        <div className='sign__up__link' onClick={() => history.push('/sign-up')}>Don't have an account? Create one!</div>
      </div>
    </span>
  );
};

export default LoginForm;
