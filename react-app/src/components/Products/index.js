import React, { useEffect, useState, useRef } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../../store/products';
import { addItemToCart } from '../../store/cart';
import CartModal from '../CartModal';
import OpenCartMainPageModal from '../Modal/OpenCartMainPageModal';
import './Products.css';
import seafood from '../../assets/seafood.png';
import meat from '../../assets/meat.png';
import produce from '../../assets/produce.png';
import dairy from '../../assets/dairy.png';
import meals from '../../assets/meal.png';
import bakery from '../../assets/bakery.png';
import pantry from '../../assets/pantry.png';
import star from '../../assets/star.png';


export default function Products() {
    const dispatch = useDispatch();
    const { category } = useParams();
    const products = Object.values(useSelector((state) => state.products));
    const ulRef = useRef();
    const [showMenu, setShowMenu] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(true);

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    // const closeMenu = () => setShowMenu(false);

    useEffect(() => {
        dispatch(getAllProducts(category));
    }, [dispatch, category])


    const handleAddItem = async (e, product) => {
        e.preventDefault();
        await dispatch(addItemToCart(product))
    }

    if (!products) return null;

    return (
        <>
            <div>
                {category === 'seafood' && (
                    <div className='product-banner'>
                        <img className='banner-img' src={seafood} alt='seafood' />
                        <h1 className='category-banner'>FRESH SEAFOOD</h1>
                    </div>
                )}
                {category === 'meat' && (
                    <div className='product-banner'>
                        <img className='banner-img' src={meat} alt='meat' />
                        <h1 className='category-banner'>MEAT</h1>
                    </div>
                )}
                {category === 'produce' && (
                    <div className='product-banner'>
                        <img className='banner-img' src={produce} alt='produce' />
                        <h1 className='category-banner'>PRODUCE</h1>
                    </div>
                )}
                {category === 'dairy' && (
                    <div className='product-banner'>
                        <img className='banner-img' src={dairy} alt='dairy' />
                        <h1 className='category-banner'>DAIRY</h1>
                    </div>
                )}
                {category === 'meals' && (
                    <div className='product-banner'>
                        <img className='banner-img' src={meals} alt='meals' />
                        <h1 className='category-banner'>MEALS & KITS</h1>
                    </div>
                )}
                {category === 'bakery' && (
                    <div className='product-banner'>
                        <img className='banner-img' src={bakery} alt='bakery' />
                        <h1 className='category-banner'>BAKERY</h1>
                    </div>
                )}
                {category === 'pantry' && (
                    <div className='product-banner'>
                        <img className='banner-img' src={pantry} alt='pantry' />
                        <h1 className='category-banner'>PANTRY</h1>
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
                {category === 'produce' && (
                    <h3 className='sub-category-header'>Fruit</h3>
                )}
                {category === 'dairy' && (
                    <h3 className='sub-category-header'>Milk</h3>
                )}
                {category === 'meals' && (
                    <h3 className='sub-category-header'>Boxes & Kits</h3>
                )}
                {category === 'bakery' && (
                    <h3 className='sub-category-header'>Pies</h3>
                )}
                {category === 'pantry' && (
                    <h3 className='sub-category-header'>Asian</h3>
                )}
                <div className='product-cards-container'>
                    {products.map((product) =>
                        <div className='product-card' key={product.id}>
                            <NavLink to={`/products/${product.id}`} exact={true} className='nav-link'>
                                <img className='product-img' src={product.productImages[0].imageUrl} alt='img' />
                            </NavLink>
                            <div className='product-info'>
                                <span id='product-origin'>{product.origin.toUpperCase()}</span>
                                <NavLink to={`/products/${product.id}`} exact={true} className='product-card-link'>{product.name} {product.description}</NavLink>
                                <li className='info-divider' />
                                <div className='inner-info'>
                                    <span id='product-price'>$ {product.price}</span>
                                    <div className='product-page-avgrating'>
                                        <span className='the-stars'>{Array(Math.floor(product.avgStarRating)).fill().map((_, i) => (
                                            <img key={i} className='star-img' src={star} alt='star' />
                                        ))}</span>
                                        <span>({product.numReviews})</span>
                                    </div>
                                </div>
                            </div>
                            <div className='product-page-buttons'>
                                <button className='add-to-cart' onClick={(e) => handleAddItem(e, product)}>
                                    <OpenCartMainPageModal
                                        itemText='ADD TO CART'
                                        onItemClick={() => setIsCartOpen(true)}
                                        modalComponent={<CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}
                                    />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )

}
