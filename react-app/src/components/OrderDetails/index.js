import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../../store/orders";
import './OrderDetails.css';

export default function OrderDetails() {
    const dispatch = useDispatch();
    const {orderNum} = useParams();
    const order = Object.values(useSelector((state) => state.orders));
    console.log('ORDER', order)

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
