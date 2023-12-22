import React, { useState, useEffect, useCallback } from "react";
import { toJS } from 'mobx';
import Pagination from "./pagination";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import Select from "react-select";


import desktopImage from '../images/products/desktop/list-desktop.jpg';












function Products({ store, showAside, setShowAside }) {

        
    
    

    // states
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])

    // define store products
    const { brands, brandNames, selectedBrand, products,  sortedProducts, currentProducts } = store;


    // filtering 
    const [price, setPrice] = useState();
    const [currentBrands, setCurrentBrands] = useState([]);


    



const memoizedCallback = useCallback(
    
    ()=> {
        
        
        setTimeout(() => {
            


        if (currentProducts) {
        setLoading(false);
        store.selectedBrand = store.brands[0];
        
        store.currentProducts = (toJS(store.products)).slice(store.indexOfFirstRec, store.indexOfLastRec);
        store.nPages = Math.ceil(store.products.length / store.recordsPerPage);
        }
    }, 500)
    },
    [products, sortedProducts, brands]
)


   
useEffect(() => {

    
    memoizedCallback();
}, [products, sortedProducts, brands, currentProducts])

    
    
    
    // search bar
    const [searchValue, setSearchValue] = useState('');
    

    const handleInputChange = (e) => {
        store.searchValue = e.target.value;
        
        if (store.searchValue.length === 0) {
            store.searchState = false;
        } else {
            store.searchState = true;
        }

        store.setSearched();
    }

    // sorting
    

    const handleSort = (e) => {
        store.sortOption = e.target.value;
        
       
        store.setSorted()
        
        console.log(store.currentProducts);
    }

    // filtering

    const handleChecked = (e) => {

        let value = '';
        let indexOf = 0;


            if (e.target.checked) {
            value = e.target.value;
            store.checkedTypes.push(value);
            console.log(store.checkedTypes);
            } else {
                value = e.target.value;
                indexOf = store.checkedTypes.indexOf(value);

                store.checkedTypes.slice(indexOf, 1);
                
            }
        

        store.setFiltering();
        

       

        
    }

    const handleBrandChange = (values) => {
        
        store.selectedBrands = toJS(values);
        store.selectedBrandsId = (toJS(store.selectedBrands)).map((prod) => {
            return prod.id;
        });
        
        /*
        store.filteredProducts = store.products.filter((product) => {
            return store.selectedBrandsId.includes(product.brand);
        });
        */

        store.setFiltering();
        
    }
    
    
    
    

    // aside
    let toggleAsideCreate = () => {
        showAside = !showAside;
        setShowAside(showAside);
        store.productActions = 'add';
    }

    let toggleAsideEdit = () => {
        showAside = !showAside;
        setShowAside(showAside);

        store.productActions = 'edit';
        
        store.currentBrand = brands.filter((brand) => brand.id == (store.currentProduct.brand));
        console.log(store.currentBrand[0].name);
        
    }

    // delete
    const handleDeleteProduct = (product) => {

        store.deleteProduct(product);
        
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
                    <h2 className='sidebar__box__title'>Filtering</h2>

                    <div className='sidebar__group'>
                        <label for='sorting' className='sidebar__box__label'>
                            Sort By :
                        </label>
                        <select value={store.sortOption} onChange={handleSort} className='sidebar__box__select' defaultValue='default' id='sorting' name='sorting'>
                            
                        <option className='sidebar__box__option' value="descendingName">Name (Desc)</option>
                        <option className='sidebar__box__option' value="ascendingName">Name (Asc)</option>
                        <option className='sidebar__box__option' value="descendingPrice">Price (Desc)</option>
                        <option className='sidebar__box__option' value="ascendingPrice">Price (Asc)</option>
                        
                            
                            
                        </select>
                    </div>

                    <div className='sidebar__group'>
                        <h2 className='sidebar__box__subtitle'>Types</h2>
                        
                        <input className='sidebar__group__checkbox' type='checkbox' id='desktops' name='desktops' value='desktop' onClick={handleChecked}/>
                        <label for='desktops' className='sidebar__group__label'>Desktops</label>
                        <br />
                        <input className='sidebar__group__checkbox' type='checkbox' id='laptops' name='laptops' value='laptop' onClick={handleChecked}/>
                        <label for='laptops' className='sidebar__group__label'>Laptops</label>
                        <br />
                        <input className='sidebar__group__checkbox' type='checkbox' id='keyboards' name='keyboards' value='keyboard' onClick={handleChecked}/>
                        <label for='keyboards' className='sidebar__group__label'>Keyboards</label>
                        <br />
                        <input className='sidebar__group__checkbox' type='checkbox' id='headphones' name='headphones' value='headphones' onClick={handleChecked}/>
                        <label for='headphones' className='sidebar__group__label'>Headphones</label>
                        <br />
                        <input className='sidebar__group__checkbox' type='checkbox' id='mice' name='mice' value='mouse' onClick={handleChecked}/>
                        <label for='mice' className='sidebar__group__label'>Computer Mice</label>
                    </div>

                    <div className='sidebar__group'>
                    <h2 className='sidebar__box__subtitle'>Brands</h2>
                    <Select
                        value={store.selectedBrands}
                        onChange={(option) => {handleBrandChange(option)}}
                        options={store.brands}
                        getOptionLabel ={(option)=>option.name}
                        getOptionValue ={(option)=>option.name}
                        isMulti
                        joinValues
                        
                    />
                    </div>

                </div>
            </div>
            <button className='button button--primary button--primary--right' onClick={toggleAsideCreate}>Add Product</button>


            <div className='options'>
               <input 
               className='options__input' 
               value={store.searchValue}
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

                

                {!loading && store.products.length > 0 && store.filteredProducts.length === 0 && (
                    <div className='flex flex--2'>
                        
                        {store.currentProducts.map(product => (
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
                                    <button className='flex__box__button flex__box__button--primary' onClick={() => toggleAsideEdit(store.currentProduct=product)}>Edit</button>
                                    <button className='flex__box__button flex__box__button--secondary' onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                                </div>
                            </div>
                        ))}

                <Pagination 
                        
                        nPages={store.nPages}
                        currentPage={store.currentPage}
                        setCurrentPage={(currentPage) => {
                            store.currentPage=currentPage;
                            store.indexOfLastRec = store.currentPage*store.recordsPerPage;
                            store.indexOfFirstRec = store.indexOfLastRec-store.recordsPerPage;
                            store.currentProducts = (toJS(store.products)).slice(store.indexOfFirstRec, store.indexOfLastRec);
                            
                            
                        }}
                    />
                    </div>
                        )}

                
                    {!loading && store.filteredProducts.length > 0 && (
                         <div className='flex flex--2'>
                            

                            {store.filteredProducts.map(product => {
                                return (
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
                                            
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    )}

            </div>

        </div>
        
    )
}

export default observer(Products);