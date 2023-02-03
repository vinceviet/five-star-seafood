import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import OpenModalMenuItem from "../Modal/OpenModalMenuItem";
import CreateAddressModal from "../CreateAddressModal";
import './Address.css';

export default function Address() {
    const ulRef = useRef();
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector((state) => state.session.user)
    let primaryAddress = user.address.find(address => address.primary === true)

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

    return (
        <>
            <div className='address-page-container'>
                <div className='address-page-header'>
                    <NavLink to='/profile' exact={true} className='nav-link'>
                        BACK TO ACCOUNT
                    </NavLink>
                    <span id='my-address'>MY ADDRESSES</span>
                    <div>
                        <OpenModalMenuItem
                            itemText="ADD A NEW ADDRESS"
                            onItemClick={closeMenu}
                            modalComponent={<CreateAddressModal user={user} />}
                        />
                        {/* <NavLink to='/user/address' exact={true} className='nav-link'>
                            <button className='add-address-button'>ADD A NEW ADDRESS</button>
                        </NavLink> */}
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
