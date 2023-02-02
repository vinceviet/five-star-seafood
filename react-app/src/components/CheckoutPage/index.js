import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { loadCartItems, checkoutCart } from "../../store/cart";
import './CheckoutPage.css';

export default function CheckoutPage() {
    const [errors, setErrors] = useState([]);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [phone, setPhone] = useState('');
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

    const updateAddress = (e) => {
        setAddress(e.target.value);
    };

    const updateCity = (e) => {
        setCity(e.target.value);
    };

    const updateState = (e) => {
        setState(e.target.value);
    };
    const updateCountry = (e) => {
        setCountry(e.target.value);
    };

    const updateZipCode = (e) => {
        setZipCode(e.target.value);
    };

    const updatePhone = (e) => {
        setPhone(e.target.value);
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        dispatch(checkoutCart(cartId)).then(() => dispatch(loadCartItems()))
        alert('Your order has been received!')
        history.push('/profile');
    };

    if (!cartItems) return null;

    return (
        <div className='checkout-container'>
            <div className='checkout-address-container'>
                <span className='checkout-address-header'>Five Star Seafood and Provisions</span>
                <li className="checkout-address-divider" />
                <div className='contact-info-container'>
                    <span id='contact-header'>Contact Information</span>
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
                    <form>
                        <div>
                            {errors.map((error, ind) => (
                                <div key={ind}>{error}</div>
                            ))}
                        </div>
                        <div className='form-input-container'>
                            <label className='form-label'>Address</label>
                            <input
                                type='text'
                                name='address'
                                placeholder='Address'
                                onChange={updateAddress}
                                value={address}
                                required={true}
                                className='form-input-fields'
                            ></input>
                        </div>
                        <div className='form-input-container'>
                            <label className='form-label'>City</label>
                            <input
                                type='text'
                                name='city'
                                placeholder='City'
                                onChange={updateCity}
                                value={city}
                                required={true}
                                className='form-input-fields'
                            ></input>
                        </div>
                        <div className='form-input-container'>
                            <label className='form-label'>State</label>
                            <input
                                type='text'
                                name='state'
                                placeholder='State'
                                onChange={updateState}
                                value={state}
                                required={true}
                                className='form-input-fields'
                            ></input>
                        </div>
                        <div className='form-input-container'>
                            <label className='form-label'>Country</label>
                            <input
                                type='text'
                                name='country'
                                placeholder='Country'
                                onChange={updateCountry}
                                value={country}
                                required={true}
                                className='form-input-fields'
                            ></input>
                        </div>
                        <div className='form-input-container'>
                            <label className='form-label'>Zip Code</label>
                            <input
                                type='number'
                                name='zipCode'
                                placeholder='Zip Code'
                                onChange={updateZipCode}
                                value={zipCode}
                                required={true}
                                className='form-input-fields'
                            ></input>
                        </div>
                        <div className='form-input-container'>
                            <label className='form-label'>Phone Number</label>
                            <input
                                type='text'
                                name='phone'
                                placeholder='Phone Number'
                                onChange={updatePhone}
                                value={phone}
                                required={true}
                                className='form-input-fields'
                            ></input>
                        </div>
                    </form>
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
