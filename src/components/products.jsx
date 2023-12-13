import React, { useState, useEffect } from "react";
import { toJS } from 'mobx';

function Products({ store }) {

    // states
    const [loading, setLoading] = useState(false);
    const [desktopData, setDesktopData] = useState([]);

    const { desktop } = store;

    // functions 
    const showData = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setDesktopData((toJS(desktop)));
        })
    }
    console.log(desktopData);

    useEffect(() => {
        showData();
    }, [])

    console.log(desktopData);
    return (
        <div className='layout'>
            {store.getData()}
            {loading && (
                <div className='flex'>
                    <h2>Loading</h2>
                </div>
            )}

            {desktopData.length > 0 && (
                <div className='flex'>
                    {desktopData.map(item => (
                        <div className='flex__box'>
                            <h2>{item.name}</h2>
                            <h3>{item.price}</h3>
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}

export default Products;