import React, { useState, useEffect, useCallback } from "react";
import { toJS } from 'mobx';
import { v4 as uuid } from 'uuid';
import { observer } from "mobx-react";




function ProductCreateEdit({ store, showAside, setShowAside }) {

    // defining store items
    const { brands, products, currentProduct } = store;
    const brandsJS = toJS(brands);

    // states

    const [name, setProductName] = useState('');
    const [price, setProductPrice] = useState(0);
    const [type, setProductTypeOption] = useState('desktop');
    const [brand, setProductBrand] = useState([]);

    

    const [brandId, setProductBrandId] = useState();
    const [brandsData, setBrandsData] = useState([]);

    const [loading, setLoading] = useState(true);


    
    

    

    
    
    
    

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
    

    

    // aside
    let toggleAside = () => {
        
        showAside = !showAside
        setShowAside(showAside);
        
    }


    // add product function
    const handleAddProduct = () => {
        let small_id = uuid().slice(0,5);

        

        
            store.createProduct({ id: small_id, name, price, type, brand: store.selectedBrandId });
        

    

    setProductName('');
    setProductPrice('');
    setProductBrand([]);
    setProductTypeOption('desktop');
    
    store.setFiltering();
    toggleAside();
    
    };

    const handleUpdateProduct = () => {
        store.updateProduct();
        toggleAside();
        
        store.setFiltering();
        
    }

    

    
    
    const handleProductName = (e) => {
        if (store.productActions === 'add') {
        setProductName(e.target.value);
        } else (
            currentProduct.name = e.target.value
        )
    

    }

    const handleProductPrice = (e) => {
        if (store.productActions === 'add') {
        setProductPrice(e.target.value);
        } else (
            currentProduct.price = e.target.value
        )
    

    }
    

    const handleProductType = (e) => {
        if (store.productActions === 'add') {
        setProductTypeOption(e.target.value);
        } else (
            currentProduct.type = e.target.value
        )
    

    }


    const handleProductBrand = (e) => {
        let chosenBrand = brands.filter((brand) => brand.name==(e.target.value));
        
        store.selectedBrand = brands.filter((brand) => brand.name==(e.target.value));
        if (store.productActions === 'add') {
        setProductBrand(e.target.value);
        setProductBrandId(chosenBrand[0].id);
        
        } else (
            currentProduct.brand = chosenBrand[0].id
        )

        store.selectedBrandId = store.selectedBrand[0].id;
        
        
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


                

                {showAside && !loading && store.productActions === 'add' && (
                    
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

            
                {showAside && !loading && store.productActions === 'edit' && (
                    
                    <div className='aside'>
                    <div className='aside__box'>
                            <button className="button button--close" onClick={toggleAside}>
                                <img className="close" src={`./icons/close.png`} />
                            </button>
                            <h2 className='aside__box__title'>Edit Product {store.currentBrand[0].name}</h2>
        
                            <div className='form'>
                                <label for='productBrand'>Brand:</label>
                                <select value={store.currentBrand[0].name} onChange={handleProductBrand} className='form__select' id='productBrand' name='productBrand'>
                                    {brandsData.map((brand) => {
                                        return (
                                            <option className='form__option' value={brand.name}>{brand.name}</option>
                                        )
                                    })}
                                    
                                </select>

                                <label className='form__label' for='name'>Name:</label>
                                <input className='form__input' name='name' id='name' value={currentProduct.name} onChange={handleProductName}/>
                                <label className='form__label' for='price'>Price:</label>
                                <input type='number' className='form__input' name='price' id='price' value={currentProduct.price} onChange={handleProductPrice}/>
                
                                
                                <label for='productType'>Type:</label>
                                <select value={currentProduct.type} onChange={handleProductType} className='form__select' defaultValue='desktop' id='productType' name='productType'>
                                    <option className='form__option' value="desktop">Desktop</option>
                                    <option className='form__option' value="laptop">Laptop</option>
                                    <option className='form__option' value="keyboard">Keyboard</option>
                                    <option className='form__option' value="headphones">Headphones</option>
                                    <option className='form__option' value="mouse">Mouse</option>
                                    
                                </select>

                                <button className='button button--form button--form--primary' onClick={() => handleUpdateProduct(currentProduct)}>Update Product</button>
                                
                                
                
                                

                            </div>
                    </div>
                </div>

                        
                    
                )}

   
    </>
)





}

export default observer(ProductCreateEdit);