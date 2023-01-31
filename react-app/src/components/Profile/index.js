import React from "react";
import LogoutButton from "../auth/LogoutButton";
import { useSelector } from "react-redux";
import './Profile.css';

export default function Profile() {
    const user = useSelector((state) => state.session.user)

    return (
        <>
            <div className='profile-container'>
                <LogoutButton />
                <div className='profile-header'>
                    <span id='my-acccont'>MY ACCOUNT</span>
                    <span>Welcome back, {user.firstName}!</span>
                    <span>Order History Coming Soon...</span>
                </div>
            </div>
        </>
    )
}
