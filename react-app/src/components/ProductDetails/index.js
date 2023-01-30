import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetails } from '../../store/products';
import { addItemToCart } from '../../store/cart';
import OpenModalMenuItem from '../Modal/OpenModalMenuItem';
import Reviews from '../Reviews';
import CreateReviewModal from '../CreateReviewModal';
import EditReviewModal from '../EditReviewModal';
import DeleteReviewModal from '../DeleteReviewModal';
import './ProductDetails.css';

export default function ProdcutDetails() {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef()
    const product = useSelector((state) => state.products[productId]);
    const reviews = useSelector((state => state.reviews))
    const sessionUser = useSelector(state => state.session.user);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

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

    const closeMenu = () => setShowMenu(false);

    useEffect(() => {
        dispatch(getProductDetails(productId))
    }, [dispatch])

    if (!product) return null;
    if (!reviews) return null;

    const reviewList = Object.values(reviews);


    const handleAddItem = async (e, product) => {
        e.preventDefault();
        await dispatch(addItemToCart(product))
    }

    return (
        <div className='details-container'>
            <div className='details-info-container'>
                <div className='details-img'>
                    <img className='details-img' src={product.productImages[0].imageUrl} alt='product-img' />
                </div>
                <div className='details-info'>
                    <span>{product.origin}</span>
                    <h3 className='details-name'>{product.name} {product.description}</h3>
                    <span>avgRating: {product.avgStarRating} ({product.numReviews})</span>
                    <span className='details-price'>${product.price}</span>
                    <div className='details-button-container'>
                        <button className='details-add-to-cart' onClick={(e) => handleAddItem(e, product)}>ADD TO CART</button>
                    </div>
                </div>
            </div>
            <div>
                <Reviews product={product} />
            </div>
            <div className="review-buttons">
                {sessionUser && (
                    <>
                        {sessionUser && !reviewList.find(review => sessionUser.id === review.userId) && (
                            <div className="detail-page-buttons">
                                <OpenModalMenuItem
                                    itemText="Write a Review"
                                    onItemClick={closeMenu}
                                    modalComponent={<CreateReviewModal productId={productId} />}
                                />
                            </div>
                        )}
                        {sessionUser && reviewList.find(review => sessionUser.id === review.userId) && (
                            <div className="detail-page-buttons">
                                <OpenModalMenuItem
                                    itemText="Edit Review"
                                    onItemClick={closeMenu}
                                    modalComponent={<EditReviewModal reviews={reviews} user={sessionUser} productId={productId} />}
                                />
                            </div>
                        )}
                        {sessionUser && reviewList.find(review => sessionUser.id === review.userId) && (
                            <div className="detail-page-buttons">
                                <OpenModalMenuItem
                                    itemText="Delete Review"
                                    onItemClick={closeMenu}
                                    modalComponent={<DeleteReviewModal reviews={reviews} user={sessionUser} productId={productId} />}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
