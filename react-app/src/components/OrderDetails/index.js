import React, { useState, useEffect, useRef } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../../store/orders";
import StyledOpenModalMenuItem from "../Modal/StyledOpenModalMenuItem";
import DeleteOrderModal from "../DeleteOrderModal";
import './OrderDetails.css';

export default function OrderDetails() {
    const dispatch = useDispatch();
    const { orderNum } = useParams();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef()
    const order = Object.values(useSelector((state) => state.orders));

    let dateTime;

    order.forEach(item => {
        dateTime = item.dateTime
    });

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    useEffect(() => {
        dispatch(getOrderDetails(orderNum))
    }, [dispatch])

    if (!order) return null;

    return (
        <div className='order-details-container'>
            <div className='order-details-header'>
                <NavLink id='back-to-account' to='/profile' exact={true} className='nav-link'>
                    BACK TO ACCOUNT
                </NavLink>
            </div>
            <div className='order-details-header-info'>
                <span id='order-head'>ORDER {orderNum}</span>
                <span id='order-time'>Placed on {dateTime?.split(' ')[0]} at {dateTime?.split(' ')[1]}</span>
            </div>
            <div className='order-products'>
                <div className='order-products-head'>
                    <span>Product</span>
                    <div className='order-qt'>
                        <span>Quantity</span>
                        <span>Total</span>
                    </div>
                </div>
                <li className="order-divider" />
                <div className='order-products-cards-container'>
                    {order.map(item => (
                        <div className='order-product-cards'>
                            <div className='order-info-img-container'>
                                <img src={item.itemUrl} alt='product' className='order-img' />
                                <div className='order-info'>
                                    <span>{item.name} {item.description}</span>
                                    <span>${item.price}</span>
                                </div>
                            </div>
                            <div className='order-qt-card'>
                                {/* <div className='order-qt-absolute'> */}
                                    <span id='quantity-absolute'>{item.productQuantity}</span>
                                    <span id='price-absolute'>${Number(item.totalItemPrice).toFixed(2)}</span>
                                {/* </div> */}
                            </div>
                        </div>
                    ))}
                    <li className="order-divider" />
                </div>
                <div className='order-subtotal-container'>
                    <div className='orders-shipping'>
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div className='order-total-price-container'>
                        <span>Total</span>
                        <div>
                            <div>${Number(order.reduce((total, item) => total + item.totalItemPrice, 0)).toFixed(2)}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <StyledOpenModalMenuItem
                    itemText="CANCEL ORDER"
                    onItemClick={closeMenu}
                    modalComponent={<DeleteOrderModal orderNum={orderNum} />}
                />
            </div>
        </div>
    )
};
