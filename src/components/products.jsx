import React, { useState, useEffect, useCallback } from "react";
import { toJS } from 'mobx';
import Pagination from "./pagination";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

import desktopImage from '../images/products/desktop/list-desktop.jpg';





function Products({ store, showAside, setShowAside }) {

        

    

    // states
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])

    // define store products
    const { brands, products, deleteProduct } = store;
    const brandsJS = toJS(brands);
    const productData = products;

    // filtering 
    const [price, setPrice] = useState();


    // sorting
    const dataAscending = [...data].sort((a, b) =>
        a.name > b.name ? 1 : -1,
    );

    const dataDescending = [...data].sort((a, b) =>
        a.name < b.name ? 1 : -1,
    );

    const dataAscendingPrice = [...data].sort((a, b) =>
        a.price >= b.price ? 1 : -1,
        
    );

    const dataDescendingPrice = [...data].sort((a, b) =>
        a.price <= b.price ? 1 : -1,
    );

    
   /*

    
    const memoizedCallback = useCallback(
        ()=> {
            
            const filteredItems = data.filter((product) =>
                product.name.toLowerCase().includes(searchValue.toLowerCase())
            );
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
                
            } else if (searchValue.length > 0) {
                setData(filteredItems);
            }
            
            else {
             // setData(productsJS.slice(indexOfFirstRec,indexOfLastRec));
             setData(toJS(productData));
            
                
            }
            
        }, 100)
        },
        [data]
    )


*/

const memoizedCallback = useCallback(
    ()=> {
        
        
        setTimeout(() => {
        if (products) {
        setLoading(false);
        }
        
        
    }, 500)
    },
    [products]
)


   
useEffect(() => {

    
    memoizedCallback();
}, [products])

    
    
    
    // search bar
    const [searchValue, setSearchValue] = useState('');
    const [dataFiltered, setDataFiltered] = useState([]);

    const handleInputChange = (e) => {
        const searchValue = e.target.value;
        setSearchValue(searchValue);

       setSortOption('default');
        
    }

    // sorting
    const [sortOption, setSortOption] = useState('default');

    const handleSort = (e) => {
        setSortOption(e.target.value);
        

    }
    
    
    
    

    // aside
    let toggleAside = () => {
        showAside = !showAside;
        setShowAside(showAside);
        
    }

    // delete
    const handleDeleteProduct = (product) => {

        store.deleteProduct(product);
        
    }

    // edit 
    /*
    const handleUpdateProduct = (pet) => {
        pet.name = prompt("Name of the pet", pet.name);
        pet.type = prompt("Type of the pet", pet.type);
        pet.breed = prompt("Breed of the pet", pet.breed);
        const ownerId = prompt("Owner's Id of the pet", pet.owner?.id);
        store.updatePet(pet.id, pet);
        if (ownerId !== pet.owner?.id) {
          store.assignOwnerToPet(ownerId, pet.id);
        }
      };
      */
    
    
        
    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(4);

    const indexOfLastRec = currentPage*recordsPerPage;
    const indexOfFirstRec = indexOfLastRec-recordsPerPage;

    const nPages = Math.ceil(data.length / recordsPerPage);
    

    
    
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
                    <h2 className='sidebar__box__title'>Filtering</h2>

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
            <button className='button button--primary button--primary--right' onClick={toggleAside}>Add Product</button>


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

                

                {!loading && products.length > 0 &&(
                    <div className='flex flex--2'>
                        
                        {products.map(product => (
                            <div className='flex__box flex__box--list'>
                                <img className='flex__box__image' src={desktopImage} alt="image did not load" srcset="" />
                                <h2 className='flex__box__title'>{product.name}</h2>
                                <h3 className='flex__box__subtitle'>€{product.price}</h3>

                                <div className='flex__box__footer'>
                                    <Link to={{pathname: "/products/product"}}>
                                        <button className='flex__box__button' onClick={() => {
                                            store.currentProduct = product;
                                        }}>
                                            View
                                        </button>
                                        
                                    
                                    </Link>
                                    <button className='flex__box__button flex__box__button--primary'>Edit</button>
                                    <button className='flex__box__button flex__box__button--secondary' onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                                </div>
                            </div>
                        ))}

                <Pagination 
                        nPages={nPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                    </div>
                        )}

                
                    
                        
                   


            </div>

        </div>
        
    )
}

export default observer(Products);