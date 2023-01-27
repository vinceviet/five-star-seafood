import React, { useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../../store/products';
import { addItemToCart } from '../../store/cart';
import './Products.css';
import seafood from '../../assets/seafood.png';
import meat from '../../assets/meat.png';

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
        <>
            <div>
                {category === 'seafood' && (
                    <div className='product-banner'>
                        <img className='banner-img' src={seafood} alt='seafood' />
                        <h1 className='category-banner'>FRESH SEAFOOD</h1>
                        {/* <h3 className='category-info'>Our high-quality seafood is always cut on the morning of your order, and carefully wrapped individually. It arrives directly to your door, incredibly fresh and ready to cook, refrigerate, or freeze needed. Click the product photo to learn more.</h3> */}
                    </div>
                )}
                {category === 'meat' && (
                    <div className='product-banner'>
                        <img className='banner-img' src={meat} alt='meat' />
                        <h1 className='category-banner'>MEAT</h1>
                        {/* <h3 className='category-info'>Our high-quality seafood is always cut on the morning of your order, and carefully wrapped individually. It arrives directly to your door, incredibly fresh and ready to cook, refrigerate, or freeze needed. Click the product photo to learn more.</h3> */}
                    </div>
                )}
            </div>
            <div className='products-containter'>
                {category === 'seafood' && (
                    <h3 className='sub-category-header'>Finfish</h3>
                )}
                {category === 'meat' && (
                    <h3 className='sub-category-header'>Poultry</h3>
                )}
                <div className='product-cards-container'>
                    {products.map((product) =>
                        <div className='product-card'>
                            <NavLink to={`/products/${product.id}`} exact={true} className='nav-link'>
                                <img className='product-img' src={product.productImages[0].imageUrl} alt='img' />
                            </NavLink>
                            <div className='product-info'>
                                <span id='product-origin'>{product.origin.toUpperCase()}</span>
                                <NavLink to={`/products/${product.id}`} exact={true} className='product-card-link'>{product.name} {product.description}</NavLink>
                                <li className='info-divider' />
                                <div className='inner-info'>
                                    <span id='product-price'>$ {product.price}</span>
                                    <span>Stars: {product.avgStarRating} ({product.numReviews})</span>
                                </div>
                            </div>
                            <div className='product-page-buttons'>
                                <div className='counter-container'>
                                    <button id='minus' className='product-minus-one'> &mdash; </button>
                                    <span> 1 </span>
                                    <button id='plus' className='product-plus-one'> + </button>
                                </div>
                                <button className='add-to-cart' onClick={(e) => handleAddItem(e, product)}>Add</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )

}
