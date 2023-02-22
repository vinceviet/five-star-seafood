import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { searchForProducts } from '../../store/products';
import { loadCartItems, addOneToCart } from '../../store/cart';
import { useModal } from '../Context/Modal';
import './SearchModal.css';

export default function SearchModal() {
    const dispatch = useDispatch();
    const { closeModal } = useModal()
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])

    const handleSearch = async (e) => {
        e.preventDefault();
        await dispatch(searchForProducts(query));
    };

    const handleAddItem = (e, item) => {
        e.preventDefault();
        dispatch(addOneToCart(item)).then(() => dispatch(loadCartItems()))
    }


    if (!query) {
        return (
            <span>SEARCH ...</span>
        )
    }

}
