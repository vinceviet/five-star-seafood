import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom'
import { loadCartItems, addOneToCart, minusOneToCart, removeFromCart } from "../../store/cart";
import './Cart.css';

export default function Cart() {
    const dispatch = useDispatch();
    const cartItems = Object.values(useSelector((state) => state.cart));

    useEffect(() => {
        dispatch(loadCartItems())
    }, [dispatch])

    if (!cartItems) return null;

    const handleAddItem = (e, item) => {
        e.preventDefault();
        dispatch(addOneToCart(item)).then(() => dispatch(loadCartItems()))
    }

    const handleMinusItem = (e, item) => {
        e.preventDefault();
        dispatch(minusOneToCart(item)).then(() => dispatch(loadCartItems()))
    }

    const handleRemoveItem = (e, item) => {
        e.preventDefault();
        dispatch(removeFromCart(item)).then(() => dispatch(loadCartItems()))
    }

    if (!cartItems.length) {
        return (
            <div className='empty-cart'>
                <div>YOUR CART IS EMPTY</div>
                <NavLink to='/' exact={true} className='empty-cart-nav-link'>SHOP OUR PRODUCTS</NavLink>
            </div>
        )
    }

    return (
        <div className='cart-container'>
            <h1 id='cart-header'>CART</h1>
            <div className='cart-info'>
                <span>PRODUCT</span>
                <div className='quantity-total'>
                    <span>QUANTITY</span>
                    <span>TOTAL</span>
                </div>
            </div>
            {cartItems.map((item) =>
                <div className='cart-cards' key={item.id}>
                    <div className='img-info'>
                        <NavLink to={`/products/${item.productId}`} exact={true} className='nav-link'>
                            <img className='cart-img' src={item.itemUrl} alt='itemurl' />
                        </NavLink>
                        <div className='info'>
                            <NavLink to={`/products/${item.productId}`} exact={true} className='nav-link'>
                                <span className='item-info'>{item.name} {item.description}</span>
                            </NavLink>
                            <span>${item.price}</span>
                        </div>
                    </div>
                    <div className='item-quantity-total'>
                        <div className='incart-quantity'>
                            <div className='minus-plus'>
                                <button className='minus-click' onClick={(e) => handleMinusItem(e, item)}>&ndash;</button>
                                <span className='quantity-counter'>{item.productQuantity}</span>
                                <button className='plus-click' onClick={(e) => handleAddItem(e, item)}>+</button>
                            </div>
                            <button className='remove-button' onClick={(e) => handleRemoveItem(e, item)}>REMOVE</button>
                        </div>
                        <span className='total-price'>${Number(item.totalItemPrice).toFixed(2)}</span>
                    </div>
                </div>
            )}
            <div className='total-checkout'>
                <div>Total Price: ${Number(cartItems.reduce((total, item) => total + item.totalItemPrice, 0)).toFixed(2)}</div>
                <NavLink to='/checkout' exact={true} className='nav-link'>
                    <button className='checkout-button'>Checkout</button>
                </NavLink>
            </div>
        </div>
    )
}
