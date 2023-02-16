import React, { useEffect } from "react";
import LogoutButton from "../auth/LogoutButton";
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../../store/orders";
import './Profile.css';

export default function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const orders = Object.values(useSelector((state) => state.orders))
    const orderNums = Array.from(new Set(orders.map(item => item.orderNumber)));

    const handleDateTime = (o) => {
        const order = orders.filter(item => item.orderNumber === o);
        const dateTime = order[0].dateTime;
        return dateTime;
    }

    const handleTotalPrice = (o) => {
        const order = orders.filter(item => item.orderNumber === o);
        const totalPrice = order.reduce((total, item) => total + item.totalItemPrice, 0).toFixed(2);
        return totalPrice;
    }

    let primaryAddress = user.address.find(address => address.primary === true)

    useEffect(() => {
        dispatch(getOrders())
    }, [dispatch])

    return (
        <>
            <div className='profile-container'>
                <LogoutButton />
                <div className='profile-header'>
                    <span id='my-acccont'>MY ACCOUNT</span>
                    <span>Welcome back, {user.firstName}!</span>
                </div>
                <div className='profile-info-container'>
                    <div className='order-history-container'>
                        {orders.length < 1 && (
                            <span>Order History Empty</span>
                        )}
                        {orders.length >= 1 && (
                            <>
                                <div className='orders-header'>
                                    <div className='order-date'>
                                        <span>ORDER</span>
                                        <span>DATE</span>
                                    </div>
                                    <span>TOTAL</span>
                                </div>
                                <li className="order-date-divider" />
                                <div className='orders-list'>
                                    {orderNums
                                        .sort((order1, order2) => {
                                            const date1 = new Date(handleDateTime(order1))
                                            const date2 = new Date(handleDateTime(order2))
                                            return date2 - date1;
                                        })
                                        .map(order => (
                                            <>
                                                <div className='order-cards'>
                                                    <div className='order-date-card'>
                                                        <NavLink to={`/orders/${order}`} className='orders-nav-link'>
                                                            {order}
                                                        </NavLink>
                                                        <span>{(handleDateTime(order)).split(' ')[0]}</span>
                                                    </div>
                                                    <span className='order-total-price'>${handleTotalPrice(order)}</span>
                                                </div>
                                                <li className="order-date-divider" />
                                            </>
                                        ))}
                                </div>
                            </>
                        )}
                    </div>
                    <div className='address-info-container'>
                        <span>PRIMARY ADDRESS</span>
                        <li className="profile-divider" />
                        {user.address.length < 1 && (
                            <div>
                                <span>No Primary Address Saved</span>
                            </div>
                        )}
                        {primaryAddress && <div className='primary-address-info'>
                            <span>{user.firstName} {user.lastName}</span>
                            <span>{primaryAddress.address}</span>
                            <span>{primaryAddress.city}, {primaryAddress.state} {primaryAddress.zipCode}</span>
                            <span>{primaryAddress.country}</span>
                        </div>}
                        <div>
                            <NavLink to='/user/address' exact={true} className='nav-link'>
                                <button className='address-button'>EDIT ADDRESSES</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
