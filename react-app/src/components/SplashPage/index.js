import React from 'react';
import splash1 from '../../assets/Splash1.png';
import './SplashPage.css';

export default function SplashPage() {
    return (
        <div className='splash-page-container'>
            <img className='splash-img' src={splash1} alt='splash2' />
            <div className='splash-header-container'>
                <div className='top-header'>
                    <h1 className='splash-header'>CHEF - DRIVEN</h1>
                    <h1 className='splash-header'>CHEF - CURATED</h1>
                    <h1 className='splash-header'>MARKETPLACE</h1>
                    <li className='splash-header-divider' />
                </div>
                <h2 className='splash-header'>FRESH LOCAL SUSTAINABLE</h2>
                <h1 className='splash-header'>HOME DELIVERY</h1>
                <li className='splash-header-divider' />
            </div>
        </div>
    )
}
