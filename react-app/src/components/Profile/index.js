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
    console.log('ORDERS IN OBJECT', orders)

    const orderObject = {};
    orderNums.forEach(orderNum => {
        const order = orders.find(item => item.orderNumber === orderNum);
        orderObject[orderNum] = order.dateTime.split(' ')[0];
        // orderObject[orderNum] = { totalPrice: order.reduce((total, item) => total + item.totalItemPrice, 0).toFixed(2)}
    });

    console.log('ORDERS', orderObject)
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
                        {!orders && (
                            <span>Order History Empty</span>
                        )}
                        {orders && (
                            <>
                                <div className='orders-header'>
                                    <div className='order-date'>
                                        <span>ORDER</span>
                                        <span>DATE</span>
                                    </div>
                                    <span>TOTAL</span>
                                </div>
                                <li className="order-divider" />
                                <div className='orders-list'>
                                    {orderNums.map(order => (
                                        <>
                                            <div className='order-cards'>
                                                <div className='order-date-card'>
                                                    <NavLink to={`/orders/${order}`}>
                                                        {order}
                                                    </NavLink>
                                                    {/* <span>{orderObject}</span> */}
                                                </div>
                                            </div>
                                            <li className="order-divider" />
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
