import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import './Address.css';

export default function Address() {
    const user = useSelector((state) => state.session.user)
    let primaryAddress = user.address.find(address => address.primary === true)

    return (
        <>
            <div className='address-page-container'>
                <div className='address-page-header'>
                    <NavLink to='/profile' exact={true} className='nav-link'>
                        BACK TO ACCOUNT
                    </NavLink>
                    <span id='my-address'>MY ADDRESSES</span>
                    <div>
                        <NavLink to='/user/address' exact={true} className='nav-link'>
                            <button className='add-address-button'>ADD A NEW ADDRESS</button>
                        </NavLink>
                    </div>
                </div>
                <div className='address-body-container'>
                    <span>DEFAULT ADDRESS</span>
                    <li className="address-divider" />
                </div>
                <div className='address-cards-container'>
                    {primaryAddress && (
                        <div className='address-cards'>
                            <span>{user.firstName} {user.lastName}</span>
                            <span>{primaryAddress.address}</span>
                            <span>{primaryAddress.city}, {primaryAddress.state} {primaryAddress.zipCode}</span>
                            <span>{primaryAddress.country}</span>
                            <div className='edit-delete-address'>
                                <button>Edit</button>
                                <button>Delete</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
