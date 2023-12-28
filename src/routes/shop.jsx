import React, { useEffect, useState } from 'react';
import Navigation from "../components/navigation";
import Products from '../components/products';
import ProductCreateEdit from '../components/productCreateEdit';
import ProductsFilter from '../components/productsFilter';



export default function Shop({ store }) {
  let [showAside, setShowAside] = useState(false);
  let [showSidebar, setShowSidebar] = useState(false);

  


    useEffect(() => {
      document.title = 'SHOP | TechShop'
    }, [])

    

    return (
      <>
        <ProductCreateEdit store={store} showAside={showAside} setShowAside={setShowAside}/>
        <Navigation />
        <ProductsFilter store={store} showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
        <Products store={store} showSidebar={showSidebar} setShowSidebar={setShowSidebar} showAside={showAside} setShowAside={setShowAside}/>
        
      </>
    );
  }

