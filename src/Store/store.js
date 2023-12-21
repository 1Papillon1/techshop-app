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
    currentProduct = [];

    currentBrand = [];


    productActions = "";

    
    

    constructor () {
        
        makeObservable(this, {
            products: observable,
            currentProduct: observable,
            brands: observable,
            state: observable,
            productActions: observable,

            totalProducts: computed,
            storeDetails: computed,

            getProductsData: action,
            getProductsByBrand: action,
            assignBrandToProduct: action,

            createProduct: action,
            deleteProduct: action,

        });
      
        
        
        
       
        runInAction(() => {
            this.getBrandsData();
            this.getProductsData();
        });
        
        
    }

   

    get totalBrands() {
        return this.brands.length;
    }

    

    get totalProducts() {
        return this.products.length;
    }


    
    get storeDetails() {
        return `We have 
        ${this.totalProducts} total products,
        
        `
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

    updateProduct(currentProduct) {
        const productIndexAtId = this.products.findIndex((product) => product.id === currentProduct.id);
        
            this.products[productIndexAtId].name = currentProduct.name;
            this.products[productIndexAtId].price = currentProduct.price;
            this.products[productIndexAtId].brand = currentProduct.brand;
            this.products[productIndexAtId].type = currentProduct.type;
        
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