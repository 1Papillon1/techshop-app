import React, { useState, useEffect, useCallback } from "react";
import { toJS } from 'mobx';
import { v4 as uuid } from 'uuid';
import { observer } from "mobx-react";




function ProductCreateEdit({ store, showAside, setShowAside }) {

    // states

    
    const [name, setProductName] = useState('');
    const [price, setProductPrice] = useState();
    const [brand, setProductBrand] = useState([]);
    const [brandId, setProductBrandId] = useState();
    const [type, setProductTypeOption] = useState('desktop');

    const [loading, setLoading] = useState(true);
    const [brandsData, setBrandsData] = useState([]);


    // defining store items
    const { brands, products } = store;
    const brandsJS = toJS(brands);
    

    

const memoizedCallback = useCallback(
        ()=> {
            
            setTimeout(() => {
                if (store.brands) {
            setLoading(false);
            
                setBrandsData(brandsJS);
                
                setProductBrandId(1);
                
                }
              
            
        }, 100)
        },
        [brandsData, products]
        
    )

    
    useEffect(() => {
        
            memoizedCallback();
        
            
    
    },[brandsData, products])
    
/*
useEffect(() => {
    setTimeout(() => {
    if (store.products) {
        setLoading(false);
        
    }
    }, 400)
}, [store.products])
*/


    // aside
    let toggleAside = () => {
        showAside = !showAside;
        setShowAside(showAside);
    }


    // add product function
    const handleAddProduct = () => {
        let small_id = uuid().slice(0,5);

        

        
            store.createProduct({ id: small_id, name, price, type, brandId });
        

    console.log("Product added to Store. Brand: " + brand + "Name: ", name, ", Price: $" + price + " type");

    setProductName('');
    setProductPrice('');
    setProductBrand([]);
    setProductBrandId(1);
    setProductTypeOption('desktop');
    

    };

    
    
    const handleProductName = (e) => {
        setProductName(e.target.value);
    

    }

    const handleProductPrice = (e) => {
        setProductPrice(e.target.value);
    

    }
    

    const handleProductType = (e) => {
        setProductTypeOption(e.target.value);
    

    }


    const handleProductBrand = (e) => {
        setProductBrand(e.target.value);

        

        const chosenBrand = brands.filter((brand) => brand.name==(e.target.value));

        setProductBrandId(chosenBrand[0].id);
        
        
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
        
                            <div className='form'>
                                <label for='productBrand'>Brand:</label>
                                <select value={brand} onChange={handleProductBrand} className='form__select' id='productBrand' name='productBrand'>
                                    {brandsData.map((brand) => {
                                        return (
                                            <option className='form__option'>{brand.name}</option>
                                        )
                                    })}
                                    
                                </select>

                                <label className='form__label' for='name'>Name:</label>
                                <input className='form__input' name='name' id='name' value={name} onChange={handleProductName}/>
                                <label className='form__label' for='price'>Price:</label>
                                <input type='number' className='form__input' name='price' id='price' value={price} onChange={handleProductPrice}/>
                
                                
                                <label for='productType'>Type:</label>
                                <select value={type} onChange={handleProductType} className='form__select' defaultValue='desktop' id='productType' name='productType'>
                                    <option className='form__option' value="desktop">Desktop</option>
                                    <option className='form__option' value="laptop">Laptop</option>
                                    <option className='form__option' value="keyboard">Keyboard</option>
                                    <option className='form__option' value="headphones">Headphones</option>
                                    <option className='form__option' value="mouse">Mouse</option>
                                    
                                </select>

                                <button className='button button--form button--form--primary' onClick={handleAddProduct}>Add Product</button>
                                <button className='button button--form button--form--secondary' onClick={toggleAside}>Cancel</button>
                
                                

                            </div>
                    </div>
                </div>

                        
                    
                )}

   
    </>
)





}

export default observer(ProductCreateEdit);