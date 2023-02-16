import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom'
import { loadCartItems, addOneToCart, minusOneToCart, removeFromCart } from "../../store/cart";
import { useModal } from '../Context/Modal';
import './CartModal.css';
import '../Context/ModalForms.css';

export default function CartModal({ isOpen, onClose }) {
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

    if (!isOpen) return null;

    return (
        <div className='modal-cart-container'>
            <div className='modal-cart-header-container'>
                <h1 id='modal-cart-header'>CART</h1>
            </div>
            {cartItems.map((item) =>
                <>
                    <div className='modal-cart-cards'>
                        <div className='modal-img-info'>
                            <NavLink to={`/products/${item.productId}`} exact={true} className='nav-link'>
                                <img className='modal-cart-img' src={item.itemUrl} alt='itemurl' />
                            </NavLink>
                        </div>
                        <div className='modal-info-and-counter'>
                            <div className='modal-info'>
                                <NavLink to={`/products/${item.productId}`} exact={true} className='nav-link'>
                                    <span className='item-info'>{item.name}</span>
                                </NavLink>
                            </div>
                            <div className='modal-item-quantity-total'>
                                <div className='modal-incart-quantity'>
                                    <div className='modal-minus-plus'>
                                        <button id='modal-minus' onClick={(e) => handleMinusItem(e, item)}>&ndash;</button>
                                        <span>{item.productQuantity}</span>
                                        <button id='modal-plus' onClick={(e) => handleAddItem(e, item)}>+</button>
                                    </div>
                                    <span id='modal-cart-price'>${Number(item.totalItemPrice).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <li className="modal-cart-order-divider" />
                </>
            )}
            <div className='modal-total'>
                <div className='modal-subtotal'>
                    <span>Subtotal: </span>
                    <span>${Number(cartItems.reduce((total, item) => total + item.totalItemPrice, 0)).toFixed(2)}</span>
                </div>
                <div>
                    <NavLink to='/cart' exact={true} activeClassName='active' className='nav-link'>
                    <button className='modal-view-cart' onClick={() => closeModal()}>View Cart</button>
                    </NavLink>
                    <button className='modal-cart-close' onClick={() => closeModal()}>Continue Shopping</button>
                </div>
            </div>
        </div>
    )
}
