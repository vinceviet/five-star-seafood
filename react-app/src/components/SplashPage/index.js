import React from 'react';
import splashb1 from '../../assets/splashb-1.png';
import splashb2 from '../../assets/splashb-2.png';
import splashb3 from '../../assets/splashb-3.png';
import splashb4 from '../../assets/splashb-4.png';
import './SplashPage.css';

export default function SplashPage() {
    return (
        <div>
            <div className='splash-header-container'>
                <div className='top-header'>
                    <h1 className='splash-header1'>CHEF - DRIVEN</h1>
                    <h1 className='splash-header'>CHEF - CURATED</h1>
                    <h1 className='splash-header3'>MARKETPLACE</h1>
                    <li className='splash-header-divider' />
                </div>
                <h2 className='splash-header'>FRESH LOCAL SUSTAINABLE</h2>
                <h1 className='splash-header5'>HOME DELIVERY</h1>
                <li className='splash-header-divider-bottom' />
            </div>
            <div className='splash-bottom'>
                <div className='splash-bottom-row'>
                    <div className='splash-bottom-info-container'>
                        <h3 className='bottom-headers'>PRISTINE SEAFOOD</h3>
                        <p className='bottom-info'>We foster relationships with local fishermen to deliver the freshest product possible.</p>
                    </div>
                    <img className='bottom-img' src={splashb2} alt='splashb-img' />
                    <div className='splash-bottom-info-container'>
                        <h3 className='bottom-headers'>WITH AN EYE FOR SUSTAINABILITY</h3>
                        <p className='bottom-info'>Our local fishermen and farmers are prized for their sustainable practices.</p>
                    </div>
                    <img className='bottom-img' src={splashb4} alt='splashb-img' />
                </div>
                <div className='splash-bottom-row'>
                    <img className='bottom-img' src={splashb1} alt='splashb-img' />
                    <div className='splash-bottom-info-container'>
                        <h3 className='bottom-headers'>EACH INGREDIENT IS CHOSEN BY OUR CHEFS</h3>
                        <p className='bottom-info'>We source and buy the ingredients we love to cook with and make them available to everyone!</p>
                    </div>
                    <img className='bottom-img' src={splashb3} alt='splashb-img' />
                    <div className='splash-bottom-info-container'>
                        <h3 className='bottom-headers'>DELIVERED TO YOUR DOOR</h3>
                        <p className='bottom-info'>Same-day & next-day contactless delivery is available.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
