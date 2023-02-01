import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavigationBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import Products from './components/Products';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import SplashPage from './components/SplashPage';
import Profile from './components/Profile';
import CheckoutPage from './components/CheckoutPage';
import Footer from './components/Footer';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <div className='main-container'>
      <NavBar />
      <Switch>
        <Route path='/products/pages/:category' exact={true}>
          <Products />
        </Route>
        <Route path='/products/:productId' exact={true}>
          <ProductDetails />
        </Route>
        <Route path='/cart' exact={true}>
          <Cart />
        </Route>
        <Route path='/checkout' exact={true}>
          <CheckoutPage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/profile' exact={true} >
          <Profile />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <SplashPage />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
