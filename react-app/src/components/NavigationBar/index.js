import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './NavigationBar.css';
import search from '../../assets/search.png';
import cart from '../../assets/cart.png';
import userIcon from '../../assets/user.png';
import fish from '../../assets/fish.png';

const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  const cartItems = Object.values(useSelector((state) => state.cart));

  let totalItems = 0
  cartItems.forEach(item => {
    totalItems += Number(item.productQuantity)
  })

  return (
    <nav className='nav-bar-container'>
      <div className='search-icon-container'>
        <img className='search-icon' src={search} alt='searchIcon' />
      </div>
      <div className='product-list'>
        <div>
          <NavLink to='/' exact={true} activeClassName='active' className='nav-link'>
            <img className='fish-icon' src={fish} alt='fish' />
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
        <div className='nav-cart'>
          <NavLink to='/cart' exact={true} activeClassName='active' className='nav-link'>
          {cartItems.length > 0 && <span className='num-in-cart'>{totalItems}</span>}
            <img className='cart-icon' src={cart} alt='cartIcon' />
          </NavLink>
        </div>
        {!user && (
          <NavLink to='/login' exact={true} activeClassName='active' className='nav-link'>
            <img className='user-icon' src={userIcon} alt='userIcon' />
          </NavLink>
        )}
        {user && (
          <NavLink to='/profile' exact={true} activeClassName='active' className='nav-link'>
            <img className='user-icon' src={userIcon} alt='userIcon' />
          </NavLink>
        )}
        <div>
          {!user && (
            <NavLink to='/login' exact={true} activeClassName='active' className='nav-link'>
              Login
            </NavLink>
          )}
          {user && (
            <NavLink to='/profile' exact={true} activeClassName='active' className='nav-link'>
              {user.firstName}
            </NavLink>
          )}

        </div>
      </div>
    </nav>
  );
}

export default NavBar;
