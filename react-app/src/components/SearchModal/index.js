import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { searchForProducts } from '../../store/search';
import { getProductDetails } from '../../store/products';
import { loadCartItems, addItemToCart } from '../../store/cart';
import { useModal } from '../Context/Modal';
import './SearchModal.css';

export default function SearchModal() {
    const dispatch = useDispatch();
    const { closeModal } = useModal()
    const [query, setQuery] = useState('')
    const [loading, setloading] = useState(false)
    const res = useSelector((state) => state.search.products)

    useEffect(() => {
        setloading(true);
        dispatch(searchForProducts(query.toString()))
    }, [query])

    const handleSearch = (id) => {
        dispatch(getProductDetails(id))
    }

    const handleAddItem = (e, item) => {
        e.preventDefault();
        dispatch(addItemToCart(item)).then(() => dispatch(loadCartItems()))
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
                <form onSubmit={(e) => e.preventDefault()}>
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
                {!res && (
                    <span className='no-match'>No products matching this search</span>
                )}
                {res && res.map(item =>
                    <div className='results-cards'>
                        <NavLink to={`/products/${item.id}`} exact={true} onClick={handleSearch(item.id)}>
                            <img className='search-img' src={item.productImages[0].imageUrl} alt='search-item' />
                        </NavLink>
                        <NavLink to={`/products/${item.id}`} exact={true} className='search-name' onClick={handleSearch(item.id)}>{item.name}</NavLink>
                        <div className='search-add-to-cart'>
                            <span>${item.price}</span>
                            <button className='search-add-button' onClick={(e) => handleAddItem(e, item)}>ADD TO CART</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )

}
