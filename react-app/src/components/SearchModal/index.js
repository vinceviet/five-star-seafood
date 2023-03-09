import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { searchForProducts } from '../../store/search';
import { loadCartItems, addItemToCart } from '../../store/cart';
import { useModal } from '../Context/Modal';
import './SearchModal.css';

export default function SearchModal() {
    const dispatch = useDispatch();
    const { closeModal } = useModal()
    const [query, setQuery] = useState('')
    const res = useSelector((state) => state.search.products)

    useEffect(() => {
        dispatch(searchForProducts(query.toString()))
    }, [query])

    const handleAddItem = (e, item) => {
        e.preventDefault();
        dispatch(addItemToCart(item)).then(() => dispatch(loadCartItems()))
        alert(`${item.name} has been added to the cart`)
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
                {res && res.slice(0, 8).map(item =>
                    <div className='results-cards' key={item.id}>
                        <NavLink to={`/products/${item.id}`} exact={true} onClick={closeModal}>
                            <img className='search-img' src={item.productImages[0].imageUrl} alt='search-item' />
                        </NavLink>
                        <div className='search-info'>
                            <NavLink to={`/products/${item.id}`} exact={true} className='search-name' onClick={closeModal}>{item.name}</NavLink>
                            <span>${item.price}</span>
                        </div>
                        <div className='search-add-to-cart'>
                            <button className='search-add-button' onClick={(e) => handleAddItem(e, item)}>ADD TO CART</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )

}
