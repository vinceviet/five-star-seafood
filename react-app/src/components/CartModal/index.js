import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom'
import { loadCartItems, addOneToCart, minusOneToCart, removeFromCart, checkoutCart } from "../../store/cart";
import { useModal } from '../Context/Modal';
import './CartModal.css';

export default function CartModal() {
    const dispatch = useDispatch();
    // const history = useHistory();
    const { closeModal } = useModal();
    const cartItems = Object.values(useSelector((state) => state.cart));
    let cartId
    cartItems.forEach(item =>
        cartId = item.cartId)

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

    const handleCheckout = async (e) => {
        e.preventDefault();
        dispatch(checkoutCart(cartId)).then(() => dispatch(loadCartItems()))
        // history.push('/');
    };

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
                <div className='cart-cards'>
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
                                <button onClick={(e) => handleMinusItem(e, item)}>&ndash;</button>
                                <span>{item.productQuantity}</span>
                                <button onClick={(e) => handleAddItem(e, item)}>+</button>
                            </div>
                            <button className='remove-button' onClick={(e) => handleRemoveItem(e, item)}>Remove</button>
                        </div>
                        <span className='total-price'>${Number(item.totalItemPrice).toFixed(2)}</span>
                    </div>
                </div>
            )}
            <div className='total-checkout'>
                <div>Total Price: ${Number(cartItems.reduce((total, item) => total + item.totalItemPrice, 0)).toFixed(2)}</div>
                <button className='checkout-button' onClick={handleCheckout}>Checkout</button>
            </div>
        </div>
    )
}
