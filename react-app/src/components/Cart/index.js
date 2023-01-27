import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom'
import { loadCartItems, addOneToCart, minusOneToCart, removeFromCart } from "../../store/cart";
import './Cart.css';

export default function Cart() {
    const dispatch = useDispatch();
    // const [loaded, setLoaded] = useState(false);
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
                <div className='cart-cards'>
                    <div className='img-info'>
                        <span>{item.name}</span>
                        <span>{item.description}</span>
                    </div>
                    <div className='item-quantity-total'>
                        <button onClick={(e) => handleMinusItem(e, item)}>minus 1</button>
                        <span>{item.productQuantity}</span>
                        <button onClick={(e) => handleAddItem(e, item)}>plus 1</button>
                        <button onClick={(e) => handleRemoveItem(e, item)}>Remove</button>
                        <span>${Number(item.totalItemPrice).toFixed(2)}</span>
                    </div>
                </div>
            )}
            <div>Total Price: ${Number(cartItems.reduce((total, item) => total + item.totalItemPrice, 0)).toFixed(2)}</div>
            <button>Checkout</button>
        </div>
    )
}
