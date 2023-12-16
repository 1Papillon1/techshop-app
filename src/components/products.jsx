import React, { useState, useEffect } from "react";
import { toJS } from 'mobx';

import desktopImage from '../images/products/desktop/list-desktop.jpg';
import laptopsImage from '../images/products/desktop/list-laptop.jpg';
import keyboardsImage from '../images/products/desktop/list-keyboard.jpg';
import headphonesImage from '../images/products/desktop/list-headphones.jpg';
import mouseImage from '../images/products/desktop/list-mouse.jpg';




function Products({ store }) {

    // states
    const [loading, setLoading] = useState(true);
    const [desktopData, setDesktopData] = useState([]);
    const [laptopsData, setLaptopsData] = useState([]);
    const [keyboardsData, setKeyboardsData] = useState([]);
    const [headphonesData, setHeadphonesData] = useState([]);
    const [mouseData, setMouseData] = useState([]);
    const [data, setData] = useState([])

    // define store products
    const { desktop, laptops, keyboards, headphones, mouse, products } = store;

    // functions 
    const showData = () => {
        setTimeout(() => {
            setLoading(false);

            /*
            setDesktopData(toJS(desktop));
            setLaptopsData(toJS(laptops));
            setKeyboardsData(toJS(keyboards));
            setMouseData(toJS(mouse));
            setHeadphonesData(toJS(headphones));
            */

            setData(toJS(products));
        })

        
    }
    
    // search bar
    const [searchValue, setSearchValue] = useState('');
    const [dataFiltered, setDataFiltered] = useState([]);

    const handleInputChange = (e) => {
        const searchValue = e.target.value;
        setSearchValue(searchValue);

        
        const filteredItems = data.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
        );
    
        setDataFiltered(filteredItems);
        
    }

    useEffect(() => {
        showData();
        
    }, [data])

    
    console.log(dataFiltered);
    
    
    return (
        <div className='layout'>
            <div className='panel'>
                <h2 className='panel__title'>Search our Shop for High Quality Products</h2>
                <h3 className='panel__subtitle'>Welcome to TechShop. We offer you the best 
                electronic products for the best prices and discounts. Get discounts for every 
                next product you buy.</h3>
            </div>

            <div className='options'>
               <input 
               className='options__input' 
               value={searchValue}
               onChange={handleInputChange}
               type="text" 
               placeholder="Search For A Product" />
               
            </div>

            <div className='container'>
                
                {loading && (
                        <div className='flex flex--2'>
                            <h2 className='flex__title'>Loading...</h2>
                        </div>
                )}

                {!loading && dataFiltered.length == 0 && (
                    <div className='flex flex--2'>
                        {data.map(product => (
                            <div className='flex__box flex__box--list'>
                                <img className='flex__box__image' src={desktopImage} alt="image did not load" srcset="" />
                                <h2 className='flex__box__title'>{product.name}</h2>
                                <h3 className='flex__box__subtitle'>€{product.price}</h3>
                            </div>
                        ))}

                        
                    </div>
                )}

                {!loading && dataFiltered.length > 0 && (
                    <div className='flex flex--2'>
                        {dataFiltered.map(product => (
                            <div className='flex__box flex__box--list'>
                                <img className='flex__box__image' src={desktopImage} alt="image did not load" srcset="" />
                                <h2 className='flex__box__title'>{product.name}</h2>
                                <h3 className='flex__box__subtitle'>€{product.price}</h3>
                            </div>
                        ))}

                        
                    </div>
                )}


            </div>

        </div>
        
    )
}

export default Products;