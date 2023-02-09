import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import OpenModalMenuItem from "../Modal/OpenModalMenuItem";
import StyledOpenModalMenuItem from "../Modal/StyledOpenModalMenuItem";
import CreateAddressModal from "../CreateAddressModal";
import EditAddressModal from "../EditAddressModal";
import DeleteAddressModal from "../DeleteAddressModal";
import './Address.css';

export default function Address() {
    const ulRef = useRef();
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector((state) => state.session.user)
    let primaryAddress = user.address.find(address => address.primary === true)
    let addressList = user.address.filter(addy => addy.primary === false)

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
                            <StyledOpenModalMenuItem
                                itemText="ADD A NEW ADDRESS"
                                onItemClick={closeMenu}
                                modalComponent={<CreateAddressModal user={user} />}
                            />
                    </div>
                </div>
                <div className='address-cards-container'>
                    {primaryAddress && (
                        <div className='address-cards'>
                            <span>DEFAULT ADDRESS</span>
                            <li className="address-divider" />
                            <span>{user.firstName} {user.lastName}</span>
                            <span>{primaryAddress.address}</span>
                            <span>{primaryAddress.city}, {primaryAddress.state} {primaryAddress.zipCode}</span>
                            <span>{primaryAddress.country}</span>
                            <div className='edit-delete-address'>
                                <div className='modify-address-modal'>
                                    <OpenModalMenuItem
                                        itemText="Edit"
                                        onItemClick={closeMenu}
                                        modalComponent={<EditAddressModal user={user} addy={primaryAddress} />}
                                    />
                                </div>
                                <div className='modify-address-modal'>
                                    <OpenModalMenuItem
                                        itemText="Delete"
                                        onItemClick={closeMenu}
                                        modalComponent={<DeleteAddressModal user={user} address={primaryAddress.id} />}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    {addressList.map(addy => (
                        <div className='address-cards'>
                            <span>Address</span>
                            <li className="address-divider" />
                            <span>{user.firstName} {user.lastName}</span>
                            <span>{addy.address}</span>
                            <span>{addy.city}, {addy.state} {addy.zipCode}</span>
                            <span>{addy.country}</span>
                            <div className='edit-delete-address'>
                                <div className='modify-address-modal'>
                                    <OpenModalMenuItem
                                        itemText="Edit"
                                        onItemClick={closeMenu}
                                        modalComponent={<EditAddressModal user={user} addy={addy} />}
                                    />
                                </div>
                                <div className='modify-address-modal'>
                                    <OpenModalMenuItem
                                        itemText="Delete"
                                        onItemClick={closeMenu}
                                        modalComponent={<DeleteAddressModal user={user} address={addy.id} />}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
