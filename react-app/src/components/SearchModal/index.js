import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { searchForProducts } from '../../store/search';
import { loadCartItems, addOneToCart } from '../../store/cart';
import { useModal } from '../Context/Modal';
import './SearchModal.css';

export default function SearchModal() {
    const dispatch = useDispatch();
    const { closeModal } = useModal()
    const [query, setQuery] = useState('')
    const [loading, setloading] = useState(false)
    const [results, setResults] = useState([])
    const res = useSelector((state) => state.search.products)

    console.log('res', res)

    useEffect(() => {
        if (!query) return setResults([]);
        setloading(true);
        dispatch(searchForProducts(query.toString()))
            // .then(data => {
            //     console.log('USEEFFFCT data', data)
            //     setResults(data.products);
            //     setloading(false);
            // })
    }, [query])

    const handleAddItem = (e, item) => {
        e.preventDefault();
        dispatch(addOneToCart(item)).then(() => dispatch(loadCartItems()))
    }

    if (!query) {
        return (
            <div className='search-container'>
                <form>
                    <div className='form-input-container'>
                        <label className='form-label' htmlFor='search'></label>
                        <input
                            name='search'
                            type='text'
                            placeholder='Search...'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className='search-input-field'
                        />
                    </div>
                </form>
            </div>
        )
    }
    return (
        <>
            <div className='search-container'>
                <form>
                    <div className='search-input-container'>
                        <label className='form-label' htmlFor='search'></label>
                        <input
                            name='search'
                            type='text'
                            placeholder='Search...'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className='search-input-field'
                        />
                    </div>
                </form>
            </div>
            <div className='results-container'>
                {!results.length < 1 && !loading && (
                    <span>No products matching this search</span>
                )}
            </div>
        </>
    )

}
