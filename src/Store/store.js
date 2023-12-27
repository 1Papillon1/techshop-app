import { action, autorun, computed, makeObservable, observable, runInAction, configure } from "mobx";
import firebase from "../services/firebase";
import { toJS } from 'mobx';
import { v4 as uuid } from 'uuid';
import { toHaveDisplayValue } from "@testing-library/jest-dom/matchers";


configure({
    enforceActions: "never"
})


export const refBrands = firebase.firestore().collection("Brands");

export const refProducts = firebase.firestore().collection("Products");

export const small_id = uuid().slice(0,8);

class Store {

    state = "pending";

    brands = [];
    products = [];

    // For creating and editing
    currentProduct = [];
    currentBrand = [];
    selectedBrand = [];
    selectedBrandId = 1;
    productActions = "";

    // For filtering
    brandIds = [];
    selectedBrands = [];
    selectedBrandsId = [];
    checkedTypes = [];


    oldProducts = [];
    filteredProducts = [];
    sortedProducts = [];

    sortOption = "ascending";

    
    searchState = false;
    searchValue = "";

    // For pagination
    currentProducts = null;
    currentProductsFiltered = null;
    currentPage = 1;
    recordsPerPage = 4;
    nPages = 0;
    indexOfLastRec = 0;
    indexOfFirstRec = 0;

    // const nPages = Math.ceil(store.products.length / recordsPerPage);
    

    constructor () {
        
        makeObservable(this, {
            state: observable,

            products: observable,
            currentProduct: observable,
            oldProducts: observable,
            filteredProducts: observable,
            sortedProducts: observable,
            productActions: observable,
            sortOption: observable,
            searchValue: observable,
            searchState: observable,

            brands: observable,
            selectedBrands: observable,
            selectedBrandId: observable,
            checkedTypes: observable,
            brandIds: observable,
            selectedBrandsId: observable,

            currentProducts: observable,


            totalProducts: computed,
            storeDetails: computed,
            filtering: computed,



            getProductsData: action,
            getProductsByBrand: action,
            assignBrandToProduct: action,


            createProduct: action,
            deleteProduct: action,

        });
      
        
        
        
       
        runInAction(() => {
            this.getBrandsData();
            this.getProductsData();
            this.getCurrentProductsData();
        });
        
        autorun(() => {
            this.setSorted();
            this.setPagination();
        })
    }


    

    getCurrentProductsData() {
        this.indexOfLastRec = this.currentPage*this.recordsPerPage;
        this.indexOfFirstRec = this.indexOfLastRec-this.recordsPerPage;
        this.currentProducts = this.products;
        
        
    }

    

    

    get searched() {

        

        if (this.searchState) {
            this.products = this.oldProducts.filter((item) => item.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1);
            
        } else if (!this.searchState) {
            this.products = this.oldProducts;
        }

        
    }

    setSearched() {
        return this.searched;
    }

    get sorted() {
        
        if (this.filteredProducts.length > 0) {
            if (this.sortOption === "descendingName") {
                this.sortedProducts = this.filteredProducts.slice().sort((a, b) => 
                (
                    a.name > b.name ? -1 : 1
                ))
            } else if (this.sortOption === "ascendingPrice") {

                this.sortedProducts = this.filteredProducts.slice().sort((a, b) => 
                (
                    a.price < b.price ? -1 : 1
                ))

            } else if (this.sortOption === "descendingPrice") {
                
                this.sortedProducts = this.filteredProducts.slice().sort((a, b) => 
                (
                    a.price > b.price ? -1 : 1
                ))

            } else {
                this.sortedProducts = this.filteredProducts.slice().sort((a, b) => 
                (
                    a.name < b.name ? -1 : 1
                ))
            }
            console.log(this.sortedProducts);
            this.filteredProducts = this.sortedProducts;
            this.currentProductsFiltered = (toJS(this.filteredProducts)).slice(this.indexOfFirstRec, this.indexOfLastRec);
        } else {
            if (this.sortOption === "descendingName") {
                this.sortedProducts = this.products.slice().sort((a, b) => 
                (
                    a.name > b.name ? -1 : 1
                ))
            } else if (this.sortOption === "ascendingPrice") {

                this.sortedProducts = this.products.slice().sort((a, b) => 
                (
                    a.price < b.price ? -1 : 1
                ))

            } else if (this.sortOption === "descendingPrice") {
                
                this.sortedProducts = this.products.slice().sort((a, b) => 
                (
                    a.price > b.price ? -1 : 1
                ))

            } else {
                this.sortedProducts = this.products.slice().sort((a, b) => 
                (
                    a.name < b.name ? -1 : 1
                ))
            }
            this.products = this.sortedProducts
        }
            
    }

    setSorted() {
        return this.sorted;
    }
    

    get filtering() {
        if (this.checkedTypes.length > 0) {

            
            
            this.filteredProducts = this.products.filter((product) => {
                
                return this.checkedTypes.includes(product.type);
            
            });

            if (this.selectedBrandsId.length > 0) {
                this.filteredProducts = this.filteredProducts.filter((product) => {
            
                    return this.selectedBrandsId.includes(product.brand);
                
                });
            }

            

        } else if (this.selectedBrandsId.length > 0) {

            if (this.checkedTypes.length > 0) {
                this.filteredProducts = this.products.filter((product) => {
            
                    return this.selectedBrandsId.includes(product.brand);
                
                });
            } else {
            this.filteredProducts = this.products.filter((product) => {
            
                return this.selectedBrandsId.includes(product.brand);
                
            });
            console.log(this.selectedBrandsId);
            }
        
        } else {
            this.filteredProducts = [];
        }
        
        this.currentPage = 1;
        this.indexOfLastRec = this.currentPage*this.recordsPerPage;
        this.indexOfFirstRec = this.indexOfLastRec-this.recordsPerPage;
        
        this.currentProductsFiltered = (toJS(this.filteredProducts)).slice(this.indexOfFirstRec, this.indexOfLastRec);

        
        
        /* else if (this.checkedTypes.length > 0) {
            this.filteredProducts = this.products.filter((product) => {
                return this.checkedTypes.includes(product.type)
            }).filter((product) => {
                return this.selectedBrandsId.includes(product.brand);
            })
        } else if (this.selectedBrandsId.length > 0) {
            this.filteredProducts = this.products.filter((product) => {
                return this.selectedBrandsId.includes(product.brand);
            }).filter((product) => {
                return this.selectedBrandsId.includes(product.brand);
            })
        */

            /*
            console.log(this.products.filter((product) => {
                return this.selectedBrandsId.includes(product.brand);
            }).filter((product) => {
                return this.selectedBrandsId.includes(product.brand);
            }));
            */

            /*
           console.log(this.checkedTypes.filter((type) => {
            return this.brands.includes(type.name)
           }));
           */

           
        
    }

    setFiltering() {
        return this.filtering;
        
    }


    get totalBrands() {
        return this.brands.length;
    }

    

    get totalProducts() {
        return this.products.length;
    }


    
    

    // Brand
    getBrandsData() {
        refBrands.onSnapshot((QuerySnapshot) => {
            QuerySnapshot.forEach((doc) => {
                this.brands.push(doc.data());
                
                
            })
        })
    }

    getProductsData(){

        refProducts.onSnapshot((QuerySnapshot) => {
            QuerySnapshot.forEach((doc) => {
             this.products.push(doc.data());
             this.oldProducts.push(doc.data());
             
            });
            
        })
        
        
        
    }


    createBrand(brand = {id: small_id, name: ""}) {
        this.brands.push(brand);
    }

    updateBrand(id, update) {
        const brandIndexAtId = this.brands.findIndex((brand) => brand.id === id);
        if (brandIndexAtId > -1 && update) {
            this.brands[brandIndexAtId] = update;
        }
    }

    // get product by brand id
    getProductsByBrand(id) {
        return this.products.filter((product) => {
            return product.brand && product.brand.id === id;
        })
    }

    
    // assign brand using brand id to a pet using petId
    assignBrandToProduct(brandId, productId) {
        const productIndexAtId = this.products.findIndex((product) => product.id === productId);
        const brandIndexAtId = this.brands.findIndex((product) => product.id === brandId);
        if (productIndexAtId > -1 && brandIndexAtId > -1) {
            this.products[productIndexAtId].brand = this.brands[brandIndexAtId];
        }
    }
    

   


    createProduct(product = {id: small_id, name: "", price: "", type: "",  brand: null}) {
        
        this.products.push(product);
        console.log('New product in the store!');
        this.showStoreDetails();
    }

    updateProduct() {
        const productIndexAtId = this.products.findIndex((product) => product.id === this.currentProduct.id);
        
            this.products[productIndexAtId].name = this.currentProduct.name;
            this.products[productIndexAtId].price = this.currentProduct.price;
            this.products[productIndexAtId].brand = this.currentProduct.brand;
            this.products[productIndexAtId].type = this.currentProduct.type;
        
    }

    deleteProduct(productId) {
        const productIndexAtId = this.products.findIndex((product) => product.id === productId);
        this.products.splice(productIndexAtId, 1);
        console.log(productIndexAtId);
        console.log('Product deleted from the store!')
        this.showStoreDetails();
      }



    


    // GET ALL DATA

    

    get storeDetails() {
        return `We have ${this.totalProducts} total products and ${this.totalBrands} total brands.`
    }
    

    showStoreDetails() {
        console.log(this.storeDetails);
    }

    

}



export default Store;