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


    const orderObject = {};
    orderNums.forEach(orderNum => {
        orderObject.orderNum = orderNum;
        const order = orders.filter(item => item.orderNumber === orderNum);
        orderObject.dateTime = order[0].dateTime?.split(' ')[0];
    });

    console.log('orderObject', orderObject)
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
                                </div>
                                <li className="order-date-divider" />
                                <div className='orders-list'>
                                    {orderNums.map(order => (
                                        <>
                                            <div className='order-cards'>
                                                <div className='order-date-card'>
                                                    <NavLink to={`/orders/${order}`} className='orders-nav-link'>
                                                        {order}
                                                    </NavLink>
                                                    <span>{orderObject.dateTime}</span>
                                                </div>
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
