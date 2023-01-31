import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { loadCartItems, checkoutCart } from "../../store/cart";
import './CheckoutPage.css';

export default function CheckoutPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const cartItems = Object.values(useSelector((state) => state.cart));
    const user = useSelector(state => state.session.user);

    let cartId
    cartItems.forEach(item =>
        cartId = item.cartId)

    useEffect(() => {
        dispatch(loadCartItems())
    }, [dispatch])

    if (!cartItems) return null;

    const handleCheckout = async (e) => {
        e.preventDefault();
        dispatch(checkoutCart(cartId)).then(() => dispatch(loadCartItems()))
        history.push('/profile');
    };

    if (!cartItems) return null;

    return (
        <div className='checkout-container'>
            <div className='checkout-address-container'>
                <span className='checkout-address-header'>Five Star Seafood and Provisions</span>
                <li className="checkout-address-divider" />
                <div className='contact-info-container'>
                    <span>Contact Information</span>
                    {user && (
                        <span>{user.firstName} {user.lastName} ({user.email})</span>
                    )}
                    {!user && (
                        <NavLink to='/login' exact={true} className='nav-link'>
                            <button className='form-button' type='submit'>Login/sign up to Checkout</button>
                        </NavLink>
                    )}
                </div>
                <div className='shipping-container'>
                    <span>Shipping Address</span>
                </div>
                <button className='checkout-checkout-button' onClick={handleCheckout}>Checkout</button>
            </div>
            <div className='checkout-cart-container'>
                {cartItems.map((item) =>
                    <div className='checkout-cart-items'>
                        <img className='cart-page-img' src={item.itemUrl} alt='itemurl' />
                        <span className='checkout-quantity'>{item.productQuantity}</span>
                        <span className='item-info'>{item.name} {item.description}</span>
                        <div className='checkout-total-price'>
                            <span>${Number(item.totalItemPrice).toFixed(2)}</span>
                        </div>
                    </div>
                )}
                <li className="checkout-divider" />
                <div className='subtotal-container'>
                    <span>Subtotal Price</span>
                    <div className='sub-shipping'>
                        <span>${Number(cartItems.reduce((total, item) => total + item.totalItemPrice, 0)).toFixed(2)}</span>
                    </div>
                </div>
                <div className='subtotal-container'>
                    <div>Shipping</div>
                    <div className='sub-shipping'>
                        <span>Free</span>
                    </div>
                </div>
                <li className="checkout-divider" />
                <div className='total-price-container'>
                    <span>Total</span>
                    <div className='usd-total'>
                        <span id='usd'>USD</span>
                        <div>${Number(cartItems.reduce((total, item) => total + item.totalItemPrice, 0)).toFixed(2)}</div>
                    </div>
                </div>
            </div>
        </div >
    )
}
