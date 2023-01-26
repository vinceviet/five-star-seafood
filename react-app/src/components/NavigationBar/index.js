import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavigationBar.css';

const NavBar = () => {
  return (
    <nav className='nav-bar-container'>
      <div className='search-icon'>
      <div>Search placeholder</div>
      </div>
      <div className='product-list'>
        <div>
          <NavLink to='/' exact={true} activeClassName='active' className='nav-link'>
            Home
          </NavLink>
        </div>
        <div>
          <NavLink to='/products/pages/seafood' exact={true} activeClassName='active' className='nav-link'>
            Seafood
          </NavLink>
        </div>
        <div>
          <NavLink to='/products/pages/meat' exact={true} activeClassName='active' className='nav-link'>
            Meat
          </NavLink>
        </div>
        <div>
          <NavLink to='/products/pages/produce' exact={true} activeClassName='active' className='nav-link'>
            Produce
          </NavLink>
        </div>
        <div>
          <NavLink to='/products/pages/dairy' exact={true} activeClassName='active' className='nav-link'>
            Dairy
          </NavLink>
        </div>
        <div>
          <NavLink to='/products/pages/meals' exact={true} activeClassName='active' className='nav-link'>
            Meals & Kits
          </NavLink>
        </div>
        <div>
          <NavLink to='/products/pages/bakery' exact={true} activeClassName='active' className='nav-link'>
            Bakery
          </NavLink>
        </div>
        <div>
          <NavLink to='/products/pages/pantry' exact={true} activeClassName='active' className='nav-link'>
            Pantry
          </NavLink>
        </div>
      </div>
      <div className='cart-user'>
        <div>
          <NavLink to='/cart' exact={true} activeClassName='active' className='nav-link'>
            Cart
          </NavLink>
        </div>
        <div>
          <NavLink to='/login' exact={true} activeClassName='active' className='nav-link'>
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
