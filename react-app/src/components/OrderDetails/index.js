import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getOrderDetails } from "../../store/orders";
import './OrderDetails.css';

export default function OrderDetails() {
    const dispatch = useDispatch();
    const {orderNum} = useParams();
    console.log('ORDERDETS', orderNum)

    useEffect(() => {
        dispatch(getOrderDetails(orderNum))
    }, [dispatch])

    return (
        <div className='order-details-container'>
            <div className='order-details-header'>
                <NavLink to='/profile' exact={true} className='nav-link'>
                    BACK TO ACCOUNT
                </NavLink>
            </div>
            <div className='order-details-header-info'>
                ORDER {orderNum}
            </div>
        </div>
    )
};
