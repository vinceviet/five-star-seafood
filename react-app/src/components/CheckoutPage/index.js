import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadCartItems, checkoutCart } from "../../store/cart";
import './CheckoutPage.css';

export default function CheckoutPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const cartItems = Object.values(useSelector((state) => state.cart));
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
                <div className='checkout-address-header'>Five Star Seafood and Provisions</div>
            </div>
            <div className='checkout-cart-container'>
                {cartItems.map((item) =>
                    <div className='checkout-cart-items'>
                        <img className='cart-page-img' src={item.itemUrl} alt='itemurl' />
                        <span className='item-info'>{item.name} {item.description}</span>
                        <div className='checkout-total-price'>
                            <span>${Number(item.totalItemPrice).toFixed(2)}</span>
                        </div>
                    </div>
                )}
                <li className="checkout-divider" />
                <div className='subtotal-container'>
                    <div className='subtotal'>
                        <div>
                            <span>Subtotal Price</span>
                        </div>
                        <div className='sub-shipping'>
                            <span>${Number(cartItems.reduce((total, item) => total + item.totalItemPrice, 0)).toFixed(2)}</span>
                        </div>
                        <div className='subtotal'>
                            <div>Shipping</div>
                            <div className='sub-shipping'>
                                <span>Free</span>
                            </div>
                        </div>
                    </div>
                </div>
                <li className="checkout-divider" />
                <div>Total</div><div>USD ${Number(cartItems.reduce((total, item) => total + item.totalItemPrice, 0)).toFixed(2)}</div>
            </div>
        </div>
    )
}
