import React, { useState } from "react";
import { observer } from "mobx-react";

import productImage from '../images/products/desktop/list-desktop.jpg';
import { Link } from "react-router-dom";



function ProductView({ store }) {



    
    let { currentProduct } = store;

    

    return(
        <>
            <div className='layout layout--secondary'>
                <div className='container'>
                    <div className='flex'>

                
                        <div className='card card--single'>
                            <h1 className='card__title card__title--secondary'>{currentProduct.name}</h1>
                            <h2 className='card__subtitle card__subtitle--secondary'>${currentProduct.price}</h2>
                            <div className='card__block'>
                                <h2 className='card__block__subtitle'>Specifications</h2>
                                <p className='card__block__paragraph'>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste impedit laudantium molestiae? 
                                    Quo quas quam obcaecati ipsa animi veniam esse consectetur hic tempora velit, non tenetur 
                                    voluptas dicta illum facilis?
                                </p>
                            </div>
                            <Link to={{pathname: "/products"}}>
                                <button className='button button--primary'>Return to Shop</button>
                            </Link>
                            
                        </div>
                    
                            
                            
                        

                    

                        <div className='flex__box flex__box--secondary flex__box--single'>
                            <span className='caption'>Image by <a className='caption__link' src={productImage}>Freepik</a></span>
                        </div>

                </div>

            </div>

        </div>
        </>
    )







}

export default observer(ProductView);