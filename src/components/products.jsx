import React, { useState, useEffect, useCallback } from "react";
import { toJS } from 'mobx';
import Pagination from "./pagination";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import Select from "react-select";


import desktopImage from '../images/products/desktop/list-desktop.jpg';












function Products({ store, showSidebar, setShowSidebar, showAside, setShowAside }) {

        
    
    

    // states
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])

    // define store products
    const { oldProducts, brands, brandNames, selectedBrand, selectedBrandsId, products,  sortedProducts, currentProducts, filteredProducts, currentProductsFiltered } = store;


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
    [oldProducts, products, sortedProducts, brands, currentProducts, filteredProducts, currentProductsFiltered]
)


   
useEffect(() => {

    
    memoizedCallback();
}, [oldProducts, products, sortedProducts, brands, currentProducts, filteredProducts, currentProductsFiltered])

    
    
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

    // sidebar 
    let toggleSidebar = () => {
        showSidebar = !showSidebar;
        setShowSidebar(showSidebar);
        
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

            {!showSidebar && (
                
                    <button className="button button--sidebar" onClick={toggleSidebar}>Filtering</button>
                
            )}
            <div className='options'>
               <input 
               className='options__input' 
               value={store.searchValue}
               onChange={handleInputChange}
               type="text" 
               placeholder="Search For A Product" />
               
            </div>
            
            <button className='button button--primary button--primary--right' onClick={toggleAsideCreate}>Add Product</button>
            
            
            <div className='container'>
                
                {loading && (
                        <div className='flex flex--2'>
                            <div class='flex__box flex__box--list'>
                                <h2 className='flex__box__title'>Loading...</h2>
                            </div>
                        </div>
                )}

                
                

                {!loading && store.products.length > 0 && store.filteredProducts.length == 0 && (
                    
                    

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
                            

                            {store.currentProductsFiltered.map(product => (
                                
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
                                
                            ))}
                        
                        
                        {store.filteredProducts.length > 4 && (

                        <Pagination 
                        
                            nPages={store.nPages = Math.ceil(store.filteredProducts.length / store.recordsPerPage)}
                            currentPage={store.currentPage}
                            setCurrentPage={(currentPage) => {
                            store.currentPage=currentPage;
                            store.indexOfLastRec = store.currentPage*store.recordsPerPage;
                            store.indexOfFirstRec = store.indexOfLastRec-store.recordsPerPage;
                            store.currentProductsFiltered = (toJS(store.filteredProducts)).slice(store.indexOfFirstRec, store.indexOfLastRec);
                            
                            }}
                        />
                            
                        )}
                


                        </div>
                    )}

            </div>

        </div>
        
    )
}

export default observer(Products);