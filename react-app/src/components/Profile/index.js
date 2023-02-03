import React from "react";
import LogoutButton from "../auth/LogoutButton";
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import './Profile.css';

export default function Profile() {
    const user = useSelector((state) => state.session.user)
    let primaryAddress = user.address.find(address => address.primary === true)

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
                        <span>Order History Coming Soon...</span>
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
