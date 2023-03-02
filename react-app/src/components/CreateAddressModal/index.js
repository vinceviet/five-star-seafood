import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../Context/Modal";
import { createAddress } from "../../store/address";
import { getUser } from "../../store/session";
import '../Context/ModalForms.css';

export default function CreateAddressModal({ user }) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [address, setAddress] = useState('')
    const [secondaryAddress, setSecondaryAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('CA');
    const [country, setCountry] = useState('USA');
    const [zipCode, setZipCode] = useState('');
    const [phone, setPhone] = useState('');
    const [primary, setPrimary] = useState('')
    const [googleResponse, setGoogleResponse] = useState(false);
    const { closeModal } = useModal();

    const api_key = process.env.REACT_APP_GOOGLE_API_KEY;

    const updateAddress = (e) => {
        setAddress(e.target.value);
    };

    const updateSecondaryAddress = (e) => {
        setSecondaryAddress(e.target.value);
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

    const handleGoogleResponse = (addressResponse) => {
        if (addressResponse.result.verdict.hasReplacedComponents) {
            addressResponse.result.address.addressComponents.forEach(
                (component) => {
                    if (component.replaced === true) {
                        if (component.componentType === "locality") {
                            setCity(component.componentName.text);
                        } else if (component.componentType === "postal_code") {
                            setZipCode(component.componentName.text);
                        } else if (component.componentType === "subpremise") {
                            setSecondaryAddress(component.componentName.text);
                        }
                    }
                }
            );
        }
        if (addressResponse.result.verdict.hasInferredComponents) {
            addressResponse.result.address.addressComponents.forEach(
                (component) => {
                    if (component.inferred === true) {
                        if (component.componentType === "locality") {
                            setCity(component.componentName.text);
                        } else if (component.componentType === "postal_code") {
                            setZipCode(component.componentName.text);
                        } else if (component.componentType === "subpremise") {
                            setSecondaryAddress(component.componentName.text);
                        }
                    }
                }
            );
        }

        if (
            addressResponse.result.verdict.hasUnconfirmedComponents ||
            addressResponse.result.address.missingComponentTypes ||
            addressResponse.result.verdict.validationGranularity === "OTHER" ||
            addressResponse.result.address.unresolvedTokens
        ) {
            const unconfirmedComponents =
                addressResponse.result.address.unconfirmedComponentTypes;
            let unconfirmedErrors = [];
            if (unconfirmedComponents) {
                unconfirmedComponents?.forEach((component) => {
                    if (component === "route") {
                    unconfirmedErrors.push("Street: Please provide a valid street name.");
                    } else if (component === "locality") {
                        unconfirmedErrors.push("City: Please provide a valid city.");
                    } else if (component === "postal_code") {
                        unconfirmedErrors.push("Zip Code: Please provide a valid Zip Code.");
                    } else if (component === "street_number") {
                        unconfirmedErrors.push("Street Number: Please provide a valid Street Number.");
                    } else if (component === "subpremise") {
                        unconfirmedErrors.push("Apt/Suite/Unit: Please provide a valid apt/suite/unit number.");
                    } else if (
                        component === "administrative_area_level_3" ||
                        component === "administrative_area_level_1" ||
                        component === "administratrive_area_level_2"
                    ) {
                        unconfirmedErrors.push("State: Please provide a valid state.");
                    }
                });
            }

            const missingComponents =
                addressResponse.result.address.missingComponentTypes;
            let missingErrors = [];
            if (missingComponents) {
                missingComponents?.forEach((component) => {
                    if (component === "route") {
                        missingErrors.push(
                            "Street: Please provide a valid street name."
                        );
                    } else if (component === "locality") {
                        missingErrors.push(
                            "City: Please provide a valid city."
                        );
                    } else if (component === "postal_code") {
                        missingErrors.push(
                            "Zip Code: Please provide a valid zip code."
                        );
                    } else if (component === "street_number") {
                        missingErrors.push(
                            "Street Number: Please provide a valid street number."
                        );
                    } else if (component === "subpremise") {
                        missingErrors.push(
                            "Apt/Suite/Unit: Please provide a valid apt/suite/unit number."
                        );
                    } else if (
                        component === "administrative_area_level_3" ||
                        component === "administrative_area_level_1" ||
                        component === "administratrive_area_level_2"
                    ) {

                    }
                });
            }

            if (addressResponse.result.address.unresolvedTokens) {
                setErrors(["Invalid Input: Please provide a valid address."]);
            } else if (unconfirmedErrors[0] && missingErrors[0]) {
                setErrors([...unconfirmedErrors, ...missingErrors]);
            } else if (unconfirmedErrors[0]) {
                setErrors([...unconfirmedErrors]);
            } else if (missingErrors[0]) {
                setErrors([...missingErrors]);
            }
        }
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const newAddress = { address, secondaryAddress, city, state, country, zipCode, phone, primary }

    //     await dispatch(createAddress(user.id, newAddress)).then(closeModal)
    //     await dispatch(getUser(user.id))
    //         .catch(async (res) => {
    //             const data = await res.json();
    //             const validationErrors = [];
    //             if (data && data.errors) setErrors(data.errors);
    //             if (data && data.message) {
    //                 validationErrors.push(data.message);
    //                 setErrors(validationErrors);
    //             };
    //         });

    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        setGoogleResponse(false);
        const response = await fetch(
            `https://addressvalidation.googleapis.com/v1:validateAddress?key=${api_key}`,
            {
                method: "POST",
                body: JSON.stringify({
                    address: {
                        revision: 0,
                        addressLines: [
                            address,
                            secondaryAddress,
                            `${city}, ${state} ${zipCode}`,
                        ],
                    },
                    previousResponseId: "",
                    enableUspsCass: true,
                }),
            }
        );
        if (response.ok) {
            const addressResponse = await response.json();

            await handleGoogleResponse(addressResponse);
            setGoogleResponse(true);
        } else {
            setErrors(["Invalid Address: Please provide a valid address."]);
        }

    };

    const createNewAddress = async () => {
        const newAddress = { address, secondaryAddress, city, state, country, zipCode, phone, primary }
        const data = await dispatch(createAddress(user.id, newAddress));
        console.log('errors', data)
        if (data.errors) setErrors(data.errors);
        else await dispatch(getUser(user.id)).then(closeModal)
    };

    useEffect(() => {
        if (googleResponse) {
            if (!errors[0]) createNewAddress();
        }
    }, [googleResponse, errors]);


    return (
        <div className="address-form-container">
            <header className="header">
                <button id="cancel-x" onClick={closeModal}>X</button>
                Add an Address
            </header>
            <li className="header-divider"></li>
            <form className='address-modal-container' onSubmit={handleSubmit}>
                <div className='review-errors'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error.split(':')[1]}</div>
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
                    <label className='form-label'>Secondary Address</label>
                    <input
                        type='text'
                        name='secondaryAddress'
                        placeholder='Secondary Address'
                        onChange={updateSecondaryAddress}
                        value={secondaryAddress}
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
