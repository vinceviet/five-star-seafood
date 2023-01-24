import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../../store/products'

export default function Products() {
    const dispatch = useDispatch()
    const { category } = useParams()
    const products = Object.values(useSelector((state) => state.products));
    console.log("products", products)
    console.log("categoryId", category)


    useEffect(() => {
        dispatch(getAllProducts(category))
    }, [dispatch])

    if(!products) return null;

    return (
        <div>
            {products.map((product) => <div>{product.name}</div>)}
        </div>
    )
}
