import React from "react";
import { NavLink } from "react-router-dom";
import './OrderDetails.css';``

export default function OrderDetails() {
    return (
        <div className='order-details-container'>
            <div className='order-details-header'>
                <NavLink to='/profile' exact={true} className='nav-link'>
                    BACK TO ACCOUNT
                </NavLink>
            </div>
        </div>
    )
}
