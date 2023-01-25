import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../../store/products';
import { addItemToCart } from '../../store/cart';

export default function Products() {
    const dispatch = useDispatch()
    const { category } = useParams()
    const [loaded, setLoaded] = useState(false)
    const products = Object.values(useSelector((state) => state.products));

    useEffect(() => {
        dispatch(getAllProducts(category)).then(() => setLoaded(true));
    }, [dispatch, category, loaded])

    // if (!products) return null;

    const handleAddItem = async (e, product) => {
        e.preventDefault();
        await dispatch(addItemToCart(product))
        // setLoaded(false)
    }

    // if (!loaded) {
    //     return (
    //         <div>
    //             {products.map((product) =>
    //                 <div>
    //                     <div>{product.name}</div>
    //                     <button>Add to Cart</button>
    //                 </div>
    //             )}
    //         </div>
    //     )
    // }

    return (
        <div>
            {products.map((product) =>
                <div>
                    <div>{product.name}</div>
                    <button onClick={(e) => handleAddItem(e, product)}>Add to Cart</button>
                </div>
            )}
        </div>
    )

}
