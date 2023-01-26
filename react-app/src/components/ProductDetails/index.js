import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetails } from '../../store/products';
import { addItemToCart } from '../../store/cart';

export default function ProdcutDetails () {
    const dispatch = useDispatch();
    const {productId} = useParams();
    const product = useSelector((state) => state.products[productId]);

    useEffect(() => {
        dispatch(getProductDetails(productId))
    }, [dispatch])

    if(!product) return null;

    return (
        <div>
            <h3>{product.name}</h3>
            <span>{product.description}</span>
            <span>{product.origin}</span>
            <span>{product.price}</span>
        </div>
    )
}
