import React, { useState, useEffect, useCallback } from "react";
import { toJS } from 'mobx';
import { v4 as uuid } from 'uuid';




function ProductAdd({ store, showAside, setShowAside }) {

    // states
    const [loading, setLoading] = useState(true);
    const [brandsData, setBrandsData] = useState([]);

    const [productTypeOption, setProductTypeOption] = useState('desktop');


    // defining store items
    const { brands, desktop, laptops, keyboards, headphones, mouse, products } = store;
    const brandsJS = toJS(brands);
    const productsJS = toJS(products);

    

const memoizedCallback = useCallback(
        ()=> {
            
            setTimeout(() => {
            setLoading(false);
            
                setBrandsData(brandsJS);
                
              
        }, 100)
        },
        [brandsData]
    )

    
    useEffect(() => {
        
            memoizedCallback();
        
            
    
    },[brandsData])
    

    // aside
    let toggleAside = () => {
        showAside = !showAside;
        setShowAside(showAside);
    }

    const handleAddProduct = () => {

    /*
        const name = prompt("Name of the pet");
        const price = prompt("Type of the pet");
        
        const ownerId = prompt("Owner's Id of the pet");

        const product = store.createProduct({ id: Date.now(), name, breed, type });
        store.assignOwnerToPet(ownerId, pet.id);
    */
    };

    // get brand with id = 2
    // console.log(brandsData.filter((brand) => brand.id==2));

    

    const handleProductType = (e) => {
        setProductTypeOption(e.target.value);
    

    }

    

return(
    <>
                {showAside && loading && (
                         <div className='aside'>
                         <div className='aside__box'>
                                 <h2 className='aside__box__title'>Loading</h2>
                        </div>
                        </div>
                )}

                {showAside && !loading && (
                    
                    <div className='aside'>
                    <div className='aside__box'>
                            <button className="button button--close" onClick={toggleAside}>
                                <img className="close" src={`./icons/close.png`} />
                            </button>
                            <h2 className='aside__box__title'>Add Product</h2>
        
                            <form className='form'>
                                <label for='productBrand'>Brand:</label>
                                <select className='form__select' id='productBrand' name='productBrand'>
                                    {brandsData.map((brand) => {
                                        return (
                                            <option className='form__option'>{brand.name}</option>
                                        )
                                    })}
                                    
                                </select>

                                <label className='form__label' for='name'>Name:</label>
                                <input className='form__input' name='name' id='name'/>
                                <label className='form__label' for='price'>Price:</label>
                                <input className='form__input' name='price' id='price'/>
                
                                
                                <label for='productType'>Type:</label>
                                <select value={productTypeOption} onChange={handleProductType} className='form__select' defaultValue='desktop' id='productType' name='productType'>
                                    <option className='form__option' value="desktop">Desktop</option>
                                    <option className='form__option' value="laptop">Laptop</option>
                                    <option className='form__option' value="keyboard">Keyboard</option>
                                    <option className='form__option' value="headphone">Headphones</option>
                                    <option className='form__option' value="mouse">Mouse</option>
                                    
                                </select>

                                <button className='button button--form button--form--primary'>Add Product</button>
                                <button className='button button--form button--form--secondary' onClick={toggleAside}>Cancel</button>
                
                                

                            </form>
                    </div>
                </div>

                        
                    
                )}

   
    </>
)





}

export default ProductAdd;