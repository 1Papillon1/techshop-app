import React, { useEffect, useState } from 'react';
import Navigation from "../components/navigation";
import Products from '../components/products';
import { toJS } from 'mobx';


export default function Shop({ store }) {

    useEffect(() => {
      document.title = 'SHOP | TechShop'
    }, [])

    

    return (
      <>
        <Navigation />
        <Products store={store}/>
      </>
    );
  }

