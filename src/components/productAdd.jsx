import React, { useState, useEffect, useCallback } from "react";
import { toJS } from 'mobx';





function ProductAdd({ store, showAside, setShowAside }) {

    // states
    const [loading, setLoading] = useState(true);
    const [brandsData, setBrandsData] = useState([]);

    const [productsData, setProductsData] = useState([]);


    // defining store items
    const { brands, desktop, laptops, keyboards, headphones, mouse, products, getProductsByBrand } = store;
    const brandsJS = toJS(brands);
    const productsJS = toJS(products);

    

const memoizedCallback = useCallback(
        ()=> {
            
            setTimeout(() => {
            setLoading(false);
            
                setBrandsData(brandsJS);
                setProductsData(productsJS);
              
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

    {store.showStoreDetails()}

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
                                <label className='form__label'>Name</label>
                                <input className='form__input' name='name' id='name'/>
                                <label className='form__label'>Price</label>
                                <input className='form__input' name='price' id='price'/>
                
                                <select className='form__select'>
                                    {brandsData.map((brand) => {
                                        return (
                                            <option>{brand.name}</option>
                                        )
                                    })}
                                    
                                </select>
                
                            </form>
                    </div>
                </div>

                        
                    
                )}

   
    </>
)





}

export default ProductAdd;