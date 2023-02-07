import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { loadCartItems, checkoutCart } from "../../store/cart";
import { createAddress } from "../../store/address";
import './CheckoutPage.css';

export default function CheckoutPage() {
    const cartItems = Object.values(useSelector((state) => state.cart));
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    let primaryAddress = user?.address.find(address => address.primary === true)
    const addressList = user?.address.filter(address => address.primary !== true)

    const [errors, setErrors] = useState([]);
    const [savedAddress, setSavedAddress] = useState(primaryAddress ? primaryAddress.address : '');
    const [save, setSave] = useState(false);
    const [address, setAddress] = useState(primaryAddress ? primaryAddress.address : '');
    const [city, setCity] = useState(primaryAddress ? primaryAddress.city : '');
    const [state, setState] = useState(primaryAddress ? primaryAddress.state : '');
    const [country, setCountry] = useState(primaryAddress ? primaryAddress.country : '');
    const [zipCode, setZipCode] = useState(primaryAddress ? primaryAddress.zipCode : '');
    const [phone, setPhone] = useState(primaryAddress ? primaryAddress.phone : '');
    const [primary, setPrimary] = useState(false)

    let cartId
    cartItems.forEach(item =>
        cartId = item.cartId)

    useEffect(() => {
        dispatch(loadCartItems())
    }, [dispatch])

    if (!cartItems) return null;

    const handleSavedAddress = (e) => {
        setSavedAddress(e.target.value);
    };

    const updateSave = (e) => {
        setSave(!save)
    }

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

    const updatePrimary = (e) => {
        setPrimary(!primary);
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        if (user.address.find(addy => addy.address !== address) && save === true) {
            const newAddress = { address, city, state, country, zipCode, phone, primary }
            console.log(newAddress)
            await dispatch(createAddress(user.id, newAddress)).catch(async (res) => {
                const data = await res.json();
                const validationErrors = [];
                if (data && data.errors) setErrors(data.errors);
                if (data && data.message) {
                    validationErrors.push(data.message);
                    setErrors(validationErrors);
                };
            });
        }
        dispatch(checkoutCart(cartId)).then(() => dispatch(loadCartItems()))
        alert('Your order has been received!')
        history.push('/profile');
    };

    return (
        <div className='checkout-container'>
            <div className='checkout-address-container'>
                <span className='checkout-address-header'>Five Star Seafood and Provisions</span>
                <li className="checkout-address-divider" />
                <div className='shipping-container'>
                    <div className='checkout-contact-info-container'>
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
                    {user && (
                        <>
                            <span id='shipping-header'>Shipping Address</span>
                            <form className='saved-addresses'>
                                {user.address.length > 0 && (
                                    <div className='saved-addresses-container'>
                                        <label htmlFor='address-list'>Saved Addresses</label>
                                        <select id='address-list' value={savedAddress} onChange={handleSavedAddress}>
                                            {primaryAddress && (
                                                <option>{primaryAddress.address}, {primaryAddress.city} {primaryAddress.state} {primaryAddress.country} {primaryAddress.zipCode} - Primary Address</option>
                                            )}
                                            {addressList.map(addy => (
                                                <option>{addy.address}, {addy.city} {addy.state} {addy.country} {addy.zipCode} {addy.primary ? '- Primary Address' : ''}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </form>
                            <form className='shipping-form-container'>
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
                                    <select className='form-input-fields' value={state} onChange={updateState}>
                                        <option value='California'>California</option>
                                        <option value='Nevada'>Nevada</option>
                                        <option value='Arizona'>Arizona</option>
                                        <option value='Oregon'>Oregon</option>
                                    </select>
                                </div>
                                <div className='form-input-container'>
                                    <label className='form-label'>Country</label>
                                    <select className='form-input-fields' value={country} onChange={updateCountry}>
                                        <option value='United States'>United States</option>
                                    </select>
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
                                {!primaryAddress && <div className='form-input-bool-container'>
                                    <input
                                        type='checkbox'
                                        name='primary'
                                        id='primary'
                                        onChange={updatePrimary}
                                        value={primary}
                                        className='form-boolean-fields'
                                    ></input>
                                    <label className='bool-label' htmlFor="primary">Set as primary address?</label>
                                </div>}
                                {!primaryAddress && <div className='form-input-bool-container'>
                                    <input
                                        type='checkbox'
                                        name='save'
                                        id='save'
                                        onChange={updateSave}
                                        value={save}
                                        className='form-boolean-fields'
                                    ></input>
                                    <label className='bool-label' htmlFor="save">Save address?</label>
                                </div>}
                            </form>
                        </>
                    )}
                </div>
                {user && (
                    <div className='checkout-button-container'>
                        <button className='checkout-checkout-button' onClick={handleCheckout}>Checkout</button>
                    </div>
                )}
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
