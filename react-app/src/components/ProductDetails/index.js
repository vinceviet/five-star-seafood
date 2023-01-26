import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetails } from '../../store/products';
import { addItemToCart } from '../../store/cart';
import OpenModalMenuItem from '../Modal/OpenModalMenuItem';

export default function ProdcutDetails() {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef()
    const product = useSelector((state) => state.products[productId]);
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

    return (
        <>
            <div>
                <h3>{product.name}</h3>
                <span>{product.description}</span>
                <span>{product.origin}</span>
                <span>{product.price}</span>
            </div>
            <div className="reviews">
                <Reviews />
            </div>
            <div className="review-buttons">
                {sessionUser && (
                    <>
                        <div className="detail-page-buttons">
                            <OpenModalMenuItem
                                itemText="Create a Review"
                                onItemClick={closeMenu}
                                modalComponent={<CreateReviewModal productId={productId} user={sessionUser} />}
                            />
                        </div>
                        {sessionUser && reviews.find(review => sessionUser.id === review.userId) && (
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
        </>
    )
}
