import React, { useState } from "react";
import { observer } from "mobx-react";
import Select from "react-select";

import { Link } from "react-router-dom";
import { toJS } from "mobx";



function ProductsFilter({ store, showSidebar, setShowSidebar }) {

 

 // sorting
 

 const handleSort = (e) => {
     store.sortOption = e.target.value;
     
    
     store.setSorted()
     
     console.log(store.currentProducts);
 }

 // filtering

 const handleChecked = (e) => {

     store.filterState = true;
     let value = '';
     let indexOf = 0;


         if (e.target.checked) {
         value = e.target.value;
         store.checkedTypes.push(value)
         

         } else {

             value = e.target.value;
             indexOf = store.checkedTypes.indexOf(value);



             store.checkedTypes.splice(indexOf, 1);
             
             
         }

     
         

     store.setFiltering();
     store.setSearched();

     console.log(store.filteredProducts.length);
     
     
     
 }

 const handleBrandChange = (values) => {
     store.filterState = true;

     store.selectedBrands = toJS(values);
     store.selectedBrandsId = (toJS(store.selectedBrands)).map((prod) => {
         return prod.id;
     });

     store.setFiltering();
     store.setSearched();
     

    

     

     store.indexOfLastRec = store.currentPage*store.recordsPerPage;
     store.indexOfFirstRec = store.indexOfLastRec-store.recordsPerPage;
     
     
     
 }

 // aside
 let toggleSidebar = () => {
    showSidebar = !showSidebar;
    setShowSidebar(showSidebar);
}

    

    return(
        <>
            {showSidebar && (
                <div className='sidebar'>
                    <div className='sidebar__box'>
                        <button className="button button--close" onClick={toggleSidebar}>
                            <img className="close" src={`./icons/close.png`} />
                        </button>
                        <h2 className='sidebar__box__title'>Filtering</h2>

                        <div className='sidebar__group'>
                            <label for='sorting' className='sidebar__box__label'>
                                Sort By :
                            </label>
                            <select value={store.sortOption} onChange={handleSort} className='sidebar__box__select' defaultValue='default' id='sorting' name='sorting'>
                                
                            <option className='sidebar__box__option' value="descendingName">Name (Desc)</option>
                            <option className='sidebar__box__option' value="ascendingName">Name (Asc)</option>
                            <option className='sidebar__box__option' value="descendingPrice">Price (Desc)</option>
                            <option className='sidebar__box__option' value="ascendingPrice">Price (Asc)</option>
                            
                                
                                
                            </select>
                        </div>

                        <div className='sidebar__group'>
                            <h2 className='sidebar__box__subtitle'>Types</h2>
                            
                            <input className='sidebar__group__checkbox' type='checkbox' id='desktops' name='desktops' value='desktop' onClick={handleChecked}/>
                            <label for='desktops' className='sidebar__group__label'>Desktops</label>
                            <br />
                            <input className='sidebar__group__checkbox' type='checkbox' id='laptops' name='laptops' value='laptop' onClick={handleChecked}/>
                            <label for='laptops' className='sidebar__group__label'>Laptops</label>
                            <br />
                            <input className='sidebar__group__checkbox' type='checkbox' id='keyboards' name='keyboards' value='keyboard' onClick={handleChecked}/>
                            <label for='keyboards' className='sidebar__group__label'>Keyboards</label>
                            <br />
                            <input className='sidebar__group__checkbox' type='checkbox' id='headphones' name='headphones' value='headphones' onClick={handleChecked}/>
                            <label for='headphones' className='sidebar__group__label'>Headphones</label>
                            <br />
                            <input className='sidebar__group__checkbox' type='checkbox' id='mice' name='mice' value='mouse' onClick={handleChecked}/>
                            <label for='mice' className='sidebar__group__label'>Computer Mice</label>
                        </div>

                        <div className='sidebar__group'>
                        <h2 className='sidebar__box__subtitle'>Brands</h2>
                        <Select
                            value={store.selectedBrands}
                            onChange={(option) => {handleBrandChange(option)}}
                            options={store.brands}
                            getOptionLabel ={(option)=>option.name}
                            getOptionValue ={(option)=>option.name}
                            isMulti
                            joinValues
                            
                        />
                        </div>

                    </div>
                </div>
            )}

            


            
        </>
    )







}

export default observer(ProductsFilter);