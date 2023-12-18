import React, { useState, useEffect, useCallback } from "react";
import { toJS } from 'mobx';

import desktopImage from '../images/products/desktop/list-desktop.jpg';
import laptopsImage from '../images/products/desktop/list-laptop.jpg';
import keyboardsImage from '../images/products/desktop/list-keyboard.jpg';
import headphonesImage from '../images/products/desktop/list-headphones.jpg';
import mouseImage from '../images/products/desktop/list-mouse.jpg';




function Products({ store }) {

/*
Napravit posebne varijable za filtriranje koje će definirati 
koji će se podatci prikazivati, npr. za cijenu 
priceRange
*/

    // states
    const [loading, setLoading] = useState(true);
    const [desktopData, setDesktopData] = useState([]);
    const [laptopsData, setLaptopsData] = useState([]);
    const [keyboardsData, setKeyboardsData] = useState([]);
    const [headphonesData, setHeadphonesData] = useState([]);
    const [mouseData, setMouseData] = useState([]);
    const [data, setData] = useState([])

    // define store products
    const { brands, desktop, laptops, keyboards, headphones, mouse, products } = store;
    const brandsJS = toJS(brands);
    const productsJS = toJS(products);

    // filtering 
    const [price, setPrice] = useState();

    // functions 
    /*
    const showData = () => {
        setTimeout(() => {
            
            setLoading(false);
            
            setDesktopData(toJS(desktop));
            setLaptopsData(toJS(laptops));
            setKeyboardsData(toJS(keyboards));
            setMouseData(toJS(mouse));
            setHeadphonesData(toJS(headphones));
            

            setData(toJS(products));
            
        })
        
        
    }
    */

    const dataAscending = [...productsJS].sort((a, b) =>
        a.name > b.name ? 1 : -1,
    );

    const dataDescending = [...productsJS].sort((a, b) =>
        a.name < b.name ? 1 : -1,
    );

    const dataAscendingPrice = [...productsJS].sort((a, b) =>
        a.price > b.price ? 1 : -1,
    );

    const dataDescendingPrice = [...productsJS].sort((a, b) =>
        a.price < b.price ? 1 : -1,
    );



    const memoizedCallback = useCallback(
        ()=> {
            
            
            setTimeout(() => {
            setLoading(false);
            if (sortOption === 'sortName') {
                setData(dataAscending);
            } else if (sortOption === 'sortNameDesc') {
                setData(dataDescending);
            }else if (sortOption === 'sortPrice') {
                setData(dataAscendingPrice);
            } else if (sortOption === 'sortPriceDesc') {
                setData(dataDescendingPrice);
            } else {
                setData(productsJS);
            }
            
        }, 100)
        },
        [data]
    )

    

    useEffect(() => {
        
            memoizedCallback();
        
            
    
    },[data])

    
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

    // sorting
    const [sortOption, setSortOption] = useState('default');

    const handleSort = (e) => {
        setSortOption(e.target.value);
    

    }
    

    
        
        
    
    
  
    
    
    return (
        <div className='layout'>
            <div className='panel'>
                <h2 className='panel__title'>Search our Shop for High Quality Products</h2>
                <h3 className='panel__subtitle'>Welcome to TechShop. We offer you the best 
                electronic products for the best prices and discounts. Get discounts for every 
                next product you buy.</h3>
            </div>

            <div className='sidebar'>
                <div className='sidebar__box'>
                    <h2 className='sidebar__box__title'>Sorting & Filtering</h2>

                    <div className='sidebar__group'>
                        <label for='sorting' className='sidebar__box__label'>
                            Sort By :
                        </label>
                        <select value={sortOption} onChange={handleSort} className='sidebar__box__select' defaultValue='default' id='sorting' name='sorting'>
                            <option className='sidebar__box__option' value="default">Default</option>
                            <option className='sidebar__box__option' value="sortName">Name (Asc)</option>
                            <option className='sidebar__box__option' value="sortNameDesc">Name (Desc)</option>
                            <option className='sidebar__box__option' value="sortPrice">Price (Asc)</option>
                            <option className='sidebar__box__option' value="sortPriceDesc">Price (Desc)</option>
                        </select>
                    </div>

                    <div className='sidebar__group'>
                        <input className='sidebar__group__checkbox' type='checkbox' id='desktops' name='desktops' value='desktops' />
                        <label for='desktops' className='sidebar__group__label'>Desktops</label>
                        <br />
                        <input className='sidebar__group__checkbox' type='checkbox' id='laptops' name='laptops' value='laptops' />
                        <label for='laptops' className='sidebar__group__label'>Laptops</label>
                        <br />
                        <input className='sidebar__group__checkbox' type='checkbox' id='keyboards' name='keyboards' value='keyboards' />
                        <label for='keyboards' className='sidebar__group__label'>Keyboards</label>
                        <br />
                        <input className='sidebar__group__checkbox' type='checkbox' id='headphones' name='headphones' value='headphones' />
                        <label for='headphones' className='sidebar__group__label'>Headphones</label>
                        <br />
                        <input className='sidebar__group__checkbox' type='checkbox' id='mice' name='mice' value='mice' />
                        <label for='mice' className='sidebar__group__label'>Computer Mice</label>
                    </div>

                </div>
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
                            <div class='flex__box flex__box--list'>
                                <h2 className='flex__box__title'>Loading...</h2>
                            </div>
                        </div>
                )}

                {!loading && searchValue.length == 0 && (
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

                {!loading && searchValue.length > 0 && (
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