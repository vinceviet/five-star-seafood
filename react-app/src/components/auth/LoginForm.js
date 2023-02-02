import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import './Forms.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'pass'));
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

  return (
    <>
      <div className='form-container'>
        <div className='form-header-container'>
          <h2 className='form-header'>LOGIN</h2>
          <span>Please enter your e-mail and password:</span>
        </div>
        <form onSubmit={onLogin}>
          <div>
            {errors.length >= 1 && 'Invalid credentials'}
            {/* {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))} */}
          </div>
          <div className='form-input-container'>
            <label className='form-label' htmlFor='email'>Email</label>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
              className='form-input-fields'
              required={true}
            />
          </div>
          <div className='form-input-container'>
            <label className='form-label' htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
              className='form-input-fields'
              required={true}
            />
            <button className='form-button' type='submit'>LOGIN</button>
            <button className='form-button' onClick={demoLogin}>DEMO LOGIN</button>
          </div>
        </form>
        <div className='to-signup'>
              <div>Don't have an account?</div>
              <NavLink className='nav-link' to='/sign-up' exact={true}>Create one</NavLink>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
