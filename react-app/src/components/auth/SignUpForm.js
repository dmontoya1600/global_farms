import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import image from './tractor-chicken.png'
import './Auth.css'


const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else if (password !== repeatPassword){
      setErrors(['password: password and repeat password must match'])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login__grid'>
      <img src={image} className='login__image' />
      <div className='right__side'>
        <form className='login__form' onSubmit={onSignUp}>
          <div>
            <label>User Name</label>
            <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
              required={true}
              ></input>
          </div>
          <div>
            <label>Email</label>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
              required={true}
              ></input>
          </div>
          <div>
            <label>Password</label>
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              required={true}
              ></input>
          </div>
          <div>
            <label>Repeat Password</label>
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
              ></input>
          </div>
          <button className='login' type='submit'>Sign Up</button>
          <div className='login__error' >
            {errors.length > 0 ? <div className='oops' >Oops!</div> : <div className='welcome__message'>Welcome To Global Farms!</div>}
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
              ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
