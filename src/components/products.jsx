import React, { useState, useEffect } from "react";
import { toJS } from 'mobx';
import desktopImage from '../images/products/desktop/list-desktop.jpg';

function Products({ store }) {

    // states
    const [loading, setLoading] = useState(false);
    const [desktopData, setDesktopData] = useState([]);

    const { desktop } = store;

    // functions 
    const showData = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setDesktopData((toJS(desktop)));
        })
    }
    

    useEffect(() => {
        showData();
    }, [desktopData])

    
    return (
        <div className='layout'>
            <div className='panel'>
                <h2 className='panel__title'>Search our Shop for High Quality Products</h2>
                <h3 className='panel__subtitle'>Welcome to TechShop. We offer you the best 
                electronic products for the best prices and discounts. Get discounts for every 
                next product you buy.</h3>
            </div>
            
            <div className='container'>
                {desktopData.length > 0 && (
                    <div className='flex flex--2'>
                        {desktopData.map(item => (
                            <div className='flex__box flex__box--list'>
                                <img className='flex__box__image' src={desktopImage} alt="image did not load" srcset="" />
                                <h2 className='flex__box__title'>{item.name}</h2>
                                <h3 className='flex__box__subtitle'>€{item.price}</h3>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
        
    )
}

export default Products;