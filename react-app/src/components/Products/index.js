import React, { useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../../store/products';
import { addItemToCart } from '../../store/cart';
import './Products.css';
import seafood from '../../assets/seafood.png';

export default function Products() {
    const dispatch = useDispatch();
    const { category } = useParams();
    // const [loaded, setLoaded] = useState(false);
    const products = Object.values(useSelector((state) => state.products));

    useEffect(() => {
        dispatch(getAllProducts(category));
    }, [dispatch, category])

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
        <div className='products-containter'>
            <div className='product-banner'>
                {category === 'seafood' && (
                    <img className='banner-img' src={seafood} alt='seafood' />
                )}
            </div>
            <div className='product-cards-container'>
                {products.map((product) =>
                    <div className='product-card'>
                        <NavLink to={`/products/${product.id}`} exact={true}>
                            <div>{product.name}</div>
                            <button onClick={(e) => handleAddItem(e, product)}>Add to Cart</button>
                        </NavLink>
                    </div>
                )}
            </div>
        </div>
    )

}
