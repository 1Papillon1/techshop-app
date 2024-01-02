import { action, autorun, computed, makeObservable, observable, runInAction, configure } from "mobx";
import firebase from "../services/firebase";
import { toJS } from 'mobx';
import { v4 as uuid } from 'uuid';



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

    // creating and editing
    currentProduct = [];
    currentBrand = [];
    selectedBrand = [];
    selectedBrandId = 1;
    productActions = "";

    // filtering & sorting
    oldProducts = [];
    filterState = false;

        // sorting
        sortState = false;
        sortOption = "ascending";
        sortedProducts = [];

        // filter by
        checkedTypes = [];

        brandIds = [];
        selectedBrands = [];
        selectedBrandsId = [];

        
        minPrice = 0;
        minPriceValue = 0;
        maxPrice =  1000;
        maxPriceValue = 1000;
        
        

        // search
        searchState = false;
        searchValue = "";


    

    // For pagination
    currentProducts = null;

    currentPage = 1;
    recordsPerPage = 4;
    nPages = 1;
    indexOfLastRec = 0;
    indexOfFirstRec = 0;

    
    

    constructor () {
        
        makeObservable(this, {
            state: observable,

            products: observable,
            currentProduct: observable,
            oldProducts: observable,
            sortedProducts: observable,
            productActions: observable,
            sortOption: observable,
            searchValue: observable,
            searchState: observable,
            sortState: observable,

            brands: observable,

            selectedBrands: observable,
            selectedBrandId: observable,
            brandIds: observable,
            selectedBrandsId: observable,

            minPrice: observable,
            maxPrice: observable,
            minPriceValue: observable,
            maxPriceValue: observable,

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
            this.setPagination();
        })
    }


    

    getCurrentProductsData() {
        this.indexOfLastRec = this.currentPage*this.recordsPerPage;
        this.indexOfFirstRec = this.indexOfLastRec-this.recordsPerPage;
        this.currentProducts = (toJS(this.products)).slice(this.indexOfFirstRec, this.indexOfLastRec);

       
    }

    

    
// search
    get searched() {
        if (this.searchState) {
            
            this.products = this.oldProducts.filter((item) => item.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1);
            this.nPages = Math.ceil(this.products.length / this.recordsPerPage);
            this.currentProducts = (toJS(this.products)).slice(this.indexOfFirstRec, this.indexOfLastRec);

        } else if (!this.searchState) {
            this.products = this.oldProducts;
            this.currentProducts = (toJS(this.products)).slice(this.indexOfFirstRec, this.indexOfLastRec);
            this.setFiltering();
            
        }
    }
    setSearched() {
        return this.searched;
    }

// sort
    get sorted() {
        this.sortState = true;
        
            if (this.sortOption === "descendingName") {
                this.sortedProducts = this.products.sort((a, b) => 
                (
                    a.name > b.name ? -1 : 1
                ))
                
            } else if (this.sortOption === "ascendingPrice") {

                this.sortedProducts = this.products.sort((a, b) => 
                (
                    a.price < b.price ? -1 : 1
                ))
                

            } else if (this.sortOption === "descendingPrice") {
                
                this.sortedProducts = this.products.sort((a, b) => 
                (
                    a.price > b.price ? -1 : 1
                ))
                

                
            } else if (this.sortOption === "ascendingName") {
                this.sortedProducts = this.products.sort((a, b) => 
                (
                    a.name < b.name ? -1 : 1
                ))
                
            } else {
                this.sortState = false;
            }
            
            
            
            this.products = this.sortedProducts;
            
            this.nPages = Math.ceil(this.products.length / this.recordsPerPage);
            this.currentProducts = (toJS(this.products)).slice(this.indexOfFirstRec, this.indexOfLastRec);


            
            
    }

    setSorted() {
        return this.sorted;
    }
    
// filter by
    get filtering() {
        

        if (this.selectedBrandsId.length === 0 && this.checkedTypes.length === 0 && this.minPriceValue === this.minPrice && this.maxPriceValue === this.maxPrice) {
            this.filterState = false;
        } else if (this.filterState) {

        this.products = this.products.filter((product) =>
            
            (this.checkedTypes.length === 0 || this.checkedTypes.includes(product.type)) &&
            (this.selectedBrandsId.length === 0 || this.selectedBrandsId.includes(product.brand)) &&
            (product.price > this.minPriceValue && product.price < this.maxPriceValue)
        )

        
        }

        else if (this.filterState === false) {
            this.products = this.oldProducts;
            
        }

        
        

        if (this.sortState) {
            this.setSorted();
        }
        
        this.currentPage = 1;
        this.indexOfLastRec = this.currentPage*this.recordsPerPage;
        this.indexOfFirstRec = this.indexOfLastRec-this.recordsPerPage;
        this.nPages = Math.ceil(this.products.length / this.recordsPerPage);
        this.currentProducts = (toJS(this.products)).slice(this.indexOfFirstRec, this.indexOfLastRec);
        
        
        
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


    getProductsByBrand(id) {
        return this.products.filter((product) => {
            return product.brand && product.brand.id === id;
        })
    }

    

    assignBrandToProduct(brandId, productId) {
        const productIndexAtId = this.products.findIndex((product) => product.id === productId);
        const brandIndexAtId = this.brands.findIndex((product) => product.id === brandId);
        if (productIndexAtId > -1 && brandIndexAtId > -1) {
            this.products[productIndexAtId].brand = this.brands[brandIndexAtId];
        }
    }
    

   


    createProduct(product = {id: small_id, name: "", price: "", type: "",  brand: null}) {
        
        this.products.push(product);
        this.oldProducts = this.products;
        console.log('New product in the store!');
        console.log(product);
        this.showStoreDetails();
    }

    updateProduct() {
        const productIndexAtId = this.products.findIndex((product) => product.id === this.currentProduct.id);
        
            this.products[productIndexAtId].name = this.currentProduct.name;
            this.products[productIndexAtId].price = this.currentProduct.price;
            this.products[productIndexAtId].brand = this.currentProduct.brand;
            this.products[productIndexAtId].type = this.currentProduct.type;
        
        this.searchValue = "";
        this.products = this.oldProducts;
    }

    deleteProduct(productId) {
        const productIndexAtId = this.oldProducts.findIndex((product) => product.id === productId);
        this.products.splice(productIndexAtId, 1);
        this.oldProducts = this.products;
        console.log('Product deleted from the store!')
        this.showStoreDetails();
        this.setSorted();
      }



    


    

    get storeDetails() {
        return `We have ${this.totalProducts} total products and ${this.totalBrands} total brands.`
    }
    

    showStoreDetails() {
        console.log(this.storeDetails);
    }

    

}



export default Store;