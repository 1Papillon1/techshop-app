import { action, autorun, computed, makeObservable, observable, runInAction, configure } from "mobx";
import firebase from "../services/firebase";
import { toJS } from 'mobx';
import { v4 as uuid } from 'uuid';


configure({
    enforceActions: "never"
})


export const refBrands = firebase.firestore().collection("Brands");

export const refDesktops = firebase.firestore().collection("Desktop");
export const refLaptops = firebase.firestore().collection("Laptops");
export const refKeyboards = firebase.firestore().collection("Keyboards");
export const refHeadphones = firebase.firestore().collection("Headphones");
export const refMice = firebase.firestore().collection("Computer Mice");

export const small_id = uuid().slice(0,8);

class Store {

    
    brands = [];

    desktops = [];
    laptops = [];
    keyboards = [];
    headphones = [];
    mice = [];
    products = [];
    state = "pending";

    
    

    constructor () {
        
        makeObservable(this, {
            desktops: observable,
            laptops: observable,
            keyboards: observable,
            headphones: observable,
            mice: observable,
            products: observable,
            state: observable,
            totalDesktops: computed,
            totalLaptops: computed,
            totalKeyboards: computed,
            totalHeadphones: computed,
            totalMice: computed,
            storeDetails: computed,

            getDesktopsData: action,
            getLaptopsData: action,
            getKeyboardsData: action,
            getHeadphonesData: action,
            getMiceData: action,
            
            getProductsByBrand: action,
            assignBrandToProduct: action,

            createDesktop: action,
            createHeadphone: action,
            createKeyboard: action,
            createLaptop: action, 
            createMouse: action,
        });
      
        
        
        runInAction(() => {
            this.getDesktopsData();
            this.getLaptopsData();
            this.getKeyboardsData();
            this.getHeadphonesData();
            this.getMiceData();
            this.getProductsData();
        })
        
       
        
        
        
    }

   

    get totalBrands() {
        return this.brands.length;
    }

    get totalDesktops() {
        return this.desktops.length;
    }

    get totalLaptops() {
        return this.laptops.length;
    }

    get totalKeyboards() {
        return this.keyboards.length;
    }

    get totalHeadphones() {
        return this.headphones.length;
    }

    get totalMice() {
        return this.mice.length;
    }


    
    get storeDetails() {
        return `We have 
        ${this.totalDesktops} total desktops,
        ${this.totalLaptops} total laptops,
        ${this.totalKeyboards} total keyboards,
        ${this.totalHeadphones} total headphones,
        ${this.totalMice} total computer mice,
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
    getProductsByBrand(brandId) {
        return this.products.filter((product) => {
            return product.brand && product.brand.id === brandId;
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
    

    // Desktop
    getDesktopsData() {
        
        refDesktops.onSnapshot((QuerySnapshot) => {
            QuerySnapshot.forEach((doc) => {
                this.desktops.push(doc.data());
                
            });
            
        })
    }


    createDesktop(desktop = {id: small_id, name: "", price: "", brand: null}) {
        this.desktops.push(desktop);
    }

    updateDesktop(id, update) {
        const desktopIndexAtId = this.desktops.findIndex((desktop) => desktop.id === id);
        if (desktopIndexAtId > -1 && update) {
            this.desktops[desktopIndexAtId] = update;
        }
    }


    // Laptop
    getLaptopsData() {
        refLaptops.onSnapshot((QuerySnapshot) => {
            QuerySnapshot.forEach((doc) => {
                this.laptops.push(doc.data());
            })
        })
    }

    createLaptop(laptop = {id: small_id, name: "", price: "", brand: null}) {
        this.laptops.push(laptop);
    }

    updateLaptop(id, update) {
        const laptopIndexAtId = this.laptops.findIndex((laptop) => laptop.id === id);
        if (laptopIndexAtId > -1 && update) {
            this.laptops[laptopIndexAtId] = update;
        }
    }


    // Keyboard
    getKeyboardsData() {
        refKeyboards.onSnapshot((QuerySnapshot) => {
            QuerySnapshot.forEach((doc) => {
                this.keyboards.push(doc.data());
            })
        })
    }

    createKeyboard(keyboard = {id: small_id, name: "", price: "", brand: null}) {
        this.keyboards.push(keyboard);
    }

    updateKeyboards(id, update) {
        const keyboardIndexAtId = this.keyboards.findIndex((keyboard) => keyboard.id === id);
        if (keyboardIndexAtId > -1 && update) {
            this.keyboards[keyboardIndexAtId] = update;
        }
    }

    // Headphones
    getHeadphonesData() {
        refHeadphones.onSnapshot((QuerySnapshot) => {
            QuerySnapshot.forEach((doc) => {
                this.headphones.push(doc.data());
            })
        })
    }

    createHeadphone(headphone = {id: small_id, name: "", price: "", brand: null}) {
        this.headphones.push(headphone);
    }

    updateHeadphones(id, update) {
        const headphoneIndexAtId = this.headphones.findIndex((headphone) => headphone.id === id);
        if (headphoneIndexAtId > -1 && update) {
            this.headphones[headphoneIndexAtId] = update;
        }
    }

    // Mouse
    getMiceData() {
        refMice.onSnapshot((QuerySnapshot) => {
            QuerySnapshot.forEach((doc) => {
                this.mice.push(doc.data());
            })
        })
    }

    createMouse(mouse = {id: small_id, name: "", price: "", brand: null}) {
        this.mice.push(mouse);
    }

    updateMouse(id, update) {
        const mouseIndexAtId = this.mice.findIndex((mouse) => mouse.id === id);
        if (mouseIndexAtId > -1 && update) {
            this.mice[mouseIndexAtId] = update;
        }
    }


    // GET ALL DATA

    getProductsData(){
        refBrands.onSnapshot((QuerySnapshot) => {
            QuerySnapshot.forEach((doc) => {
                this.brands.push(doc.data());
            })
        })

        refDesktops.onSnapshot((QuerySnapshot) => {
            QuerySnapshot.forEach((doc) => {
                this.products.push(doc.data());
                
            });
            
        })


        refLaptops.onSnapshot((QuerySnapshot) => {
            QuerySnapshot.forEach((doc) => {
                this.products.push(doc.data());
            })
        })

        refKeyboards.onSnapshot((QuerySnapshot) => {
            QuerySnapshot.forEach((doc) => {
                this.products.push(doc.data());
            })
        })

        refHeadphones.onSnapshot((QuerySnapshot) => {
            QuerySnapshot.forEach((doc) => {
                this.products.push(doc.data());
            })
        })
        
        refMice.onSnapshot((QuerySnapshot) => {
            QuerySnapshot.forEach((doc) => {
                this.products.push(doc.data());
            })
        })
        this.state = 'finished';
    }

    

    showStoreDetails() {
        if(this.state=='finished') {
        console.log(`We have
        ${this.totalBrands} total brands,
        ${this.totalDesktops} total desktops,
        ${this.totalLaptops} total laptops,
        ${this.totalKeyboards} total keyboards,
        ${this.totalHeadphones} total headphones,
        ${this.totalMice} total computer mice,
        `);
        }
    }

    

}



export default Store;