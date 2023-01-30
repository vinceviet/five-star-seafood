import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './Forms.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
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
    <>
      <div className='form-container'>
        <div className='form-header-container'>
          <h2 className='form-header'>REGISTER</h2>
          <span>Please fill in the information below:</span>
        </div>
        <form onSubmit={onSignUp}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='form-input-container'>
            <label className='form-label'>First Name</label>
            <input
              type='text'
              name='firstName'
              placeholder='First Name'
              onChange={updateFirstName}
              value={firstName}
              required={true}
              className='form-input-fields'
            ></input>
          </div>
          <div className='form-input-container'>
            <label className='form-label'>Last Name</label>
            <input
              type='text'
              name='lastName'
              placeholder='Last Name'
              onChange={updateLastName}
              value={lastName}
              required={true}
              className='form-input-fields'
            ></input>
          </div>
          <div className='form-input-container'>
            <label className='form-label'>Email</label>
            <input
              type='text'
              name='email'
              placeholder='Email'
              onChange={updateEmail}
              value={email}
              required={true}
              className='form-input-fields'
            ></input>
          </div>
          <div className='form-input-container'>
            <label className='form-label'>Password</label>
            <input
              type='password'
              name='password'
              placeholder='Password'
              onChange={updatePassword}
              value={password}
              required={true}
              className='form-input-fields'
            ></input>
          </div>
          <div className='form-input-container'>
            <label className='form-label'>Repeat Password</label>
            <input
              type='password'
              name='repeat_password'
              placeholder='Repeat Password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
              className='form-input-fields'
            ></input>
            <button className='form-button' type='submit'>Sign Up</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
