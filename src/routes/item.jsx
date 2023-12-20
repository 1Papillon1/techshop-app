import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from "../components/navigation";
import ProductView from '../components/productView';
import { set, toJS } from 'mobx';
import { observer } from 'mobx-react';


function Item({ store }) {

  

  

    useEffect(() => {
      document.title = 'PRODUCT | TechShop'
    }, [])

    

    return (
      <>

        <Navigation />
        <ProductView store={store} />
        
      </>
    );
  }

export default observer(Item);