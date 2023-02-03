import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../Context/Modal";
import { createAddress } from "../../store/address";
import { getUser } from "../../store/session";
import '../Context/ModalForms.css';

export default function CreateAddressModal({ user }) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('CA');
    const [country, setCountry] = useState('USA');
    const [zipCode, setZipCode] = useState('');
    const [phone, setPhone] = useState('');
    const [primary, setPrimary] = useState('')
    const { closeModal } = useModal();


    const updateAddress = (e) => {
        setAddress(e.target.value);
    };

    const updateCity = (e) => {
        setCity(e.target.value);
    };

    const updateState = (e) => {
        setState(e.target.value);
    };
    const updateCountry = (e) => {
        setCountry(e.target.value);
    };

    const updateZipCode = (e) => {
        setZipCode(e.target.value);
    };

    const updatePhone = (e) => {
        setPhone(e.target.value);
    };

    const updatePrimary = (e) => {
        setPrimary(!primary);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newAddress = { address, city, state, country, zipCode, phone, primary }

        await dispatch(createAddress(user.id, newAddress)).then(closeModal)
        await dispatch(getUser(user.id))
            .catch(async (res) => {
                const data = await res.json();
                const validationErrors = [];
                if (data && data.errors) setErrors(data.errors);
                if (data && data.message) {
                    validationErrors.push(data.message);
                    setErrors(validationErrors);
                };
            });

    };


    return (
        <div className="address-form-container">
            <header className="header">
                <button id="cancel-x" onClick={closeModal}>X</button>
                Add an Address
            </header>
            <li className="header-divider"></li>
            <form className='address-modal-container' onSubmit={handleSubmit}>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div className='form-input-container'>
                    <label className='form-label'>Address</label>
                    <input
                        type='text'
                        name='address'
                        placeholder='Address'
                        onChange={updateAddress}
                        value={address}
                        required={true}
                        className='form-input-fields'
                    ></input>
                </div>
                <div className='form-input-container'>
                    <label className='form-label'>City</label>
                    <input
                        type='text'
                        name='city'
                        placeholder='City'
                        onChange={updateCity}
                        value={city}
                        required={true}
                        className='form-input-fields'
                    ></input>
                </div>
                <div className='form-input-container'>
                    <label className='form-label'>State</label>
                    <select className='form-input-fields' value={state} onChange={updateState}>
                        <option value='CA'>California</option>
                        <option value='NV'>Nevada</option>
                        <option value='AZ'>Arizona</option>
                        <option value='OR'>Oregon</option>
                    </select>
                </div>
                <div className='form-input-container'>
                    <label className='form-label'>Country</label>
                    <select className='form-input-fields' value={country} onChange={updateCountry}>
                        <option value='USA'>United States</option>
                    </select>
                </div>
                <div className='form-input-container'>
                    <label className='form-label'>Zip Code</label>
                    <input
                        type='number'
                        name='zipCode'
                        placeholder='Zip Code'
                        onChange={updateZipCode}
                        value={zipCode}
                        required={true}
                        className='form-input-fields'
                    ></input>
                </div>
                <div className='form-input-container'>
                    <label className='form-label'>Phone Number</label>
                    <input
                        type='text'
                        name='phone'
                        placeholder='Phone Number'
                        onChange={updatePhone}
                        value={phone}
                        required={true}
                        className='form-input-fields'
                    ></input>
                </div>
                <div className='form-input-bool-container-modal'>
                    <label className='bool-label' htmlFor="primary">Set as primary address?</label>
                    <input
                        type='checkbox'
                        name='primary'
                        id='primary'
                        onChange={updatePrimary}
                        value={primary}
                        className='form-boolean-fields'
                    ></input>
                </div>
                <div className='form-button-container'>
                    <button className="field-buttons" type="submit">Add Address</button>
                </div>
            </form>
        </div>
    );
};