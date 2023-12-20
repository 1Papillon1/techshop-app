import React, { useEffect, useState } from 'react';
import Navigation from "../components/navigation";
import Products from '../components/products';
import ProductCreateEdit from '../components/productCreateEdit';
import { set, toJS } from 'mobx';


export default function Shop({ store }) {
  let [showAside, setShowAside] = useState(false);

  


    useEffect(() => {
      document.title = 'SHOP | TechShop'
    }, [])

    

    return (
      <>
        <ProductCreateEdit store={store} showAside={showAside} setShowAside={setShowAside}/>
        <Navigation />
        <Products store={store} showAside={showAside} setShowAside={setShowAside}/>
        
      </>
    );
  }

