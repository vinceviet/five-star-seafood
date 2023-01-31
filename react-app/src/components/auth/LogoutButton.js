import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { loadCartItems } from '../../store/cart';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout()).then(() => dispatch(loadCartItems()));
  };

  return <button className='logout-button' onClick={onLogout}>LOGOUT</button>;
};

export default LogoutButton;
