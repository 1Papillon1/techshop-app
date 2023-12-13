import React, { useEffect } from 'react';
import Navigation from "../components/navigation";
import Landing from "../components/landing";


export default function Root() {

    useEffect(() => {
      document.title = 'HOME | TechShop'
    }, [])

    return (
      <>
        <Navigation />
        <Landing />
      </>
    );
  }