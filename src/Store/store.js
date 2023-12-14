import { action, autorun, computed, makeObservable, observable, runInAction, configure } from "mobx";
import firebase from "../services/firebase";
import { toJS } from 'mobx';


configure({
    enforceActions: "never"
})




export const refDesktop = firebase.firestore().collection("Desktop");
export const refLaptops = firebase.firestore().collection("Laptops");
export const refKeyboards = firebase.firestore().collection("Keyboards");
export const refHeadphones = firebase.firestore().collection("Headphones");
export const refMouse = firebase.firestore().collection("Computer Mice");



class Store {

    
    

    desktop = [];
    laptops = [];
    keyboards = [];
    headphones = [];
    mouse = [];
    state = "pending";

    
    

    constructor () {
        
        makeObservable(this, {
            desktop: observable,
            laptops: observable,
            keyboards: observable,
            headphones: observable,
            mouse: observable,
            state: observable,
            totalDesktop: computed,
            totalLaptops: computed,
            totalKeyboards: computed,
            totalHeadphones: computed,
            totalMouse: computed,
            storeDetails: computed,
            getDesktopData: action,
            getLaptopsData: action,
            getKeyboardsData: action,
            getHeadphonesData: action,
            getMouseData: action,
        });
      
        
        
        runInAction(() => {
            this.getDesktopData();
            this.getLaptopsData();
            this.getKeyboardsData();
            this.getHeadphonesData();
            this.getMouseData();
        })
        
       
        
        
        
    }

   

    

    get totalDesktop() {
        return this.desktop.length;
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

    get totalMouse() {
        return this.mouse.length;
    }


    
    get storeDetails() {
        return `We have 
        ${this.totalDesktop} total desktops,
        ${this.totalLaptops} total laptops,
        ${this.totalKeyboards} total keyboards,
        ${this.totalHeadphones} total headphones,
        ${this.totalMouse} total mouse,
        `
    }

    getDesktopData() {
        
        refDesktop.onSnapshot((QuerySnapshot) => {
            QuerySnapshot.forEach((doc) => {
                this.desktop.push(doc.data());
                
            });
            
        })
    }

    getLaptopsData() {
        refLaptops.onSnapshot((QuerySnapshot) => {
            QuerySnapshot.forEach((doc) => {
                this.laptops.push(doc.data());
            })
        })
    }

    getKeyboardsData() {
        refKeyboards.onSnapshot((QuerySnapshot) => {
            QuerySnapshot.forEach((doc) => {
                this.keyboards.push(doc.data());
            })
        })
    }

    getHeadphonesData() {
        refHeadphones.onSnapshot((QuerySnapshot) => {
            QuerySnapshot.forEach((doc) => {
                this.headphones.push(doc.data());
            })
        })
    }

    getMouseData() {
        refMouse.onSnapshot((QuerySnapshot) => {
            QuerySnapshot.forEach((doc) => {
                this.mouse.push(doc);
            })
            this.state = 'finished';
        })
    }

    getData() {
        console.log(this.desktop);
    }

    showStoreDetails() {
        if(this.state=='finished') {
        console.log(`We have 
        ${this.totalDesktop} total desktops,
        ${this.totalLaptops} total laptops,
        ${this.totalKeyboards} total keyboards,
        ${this.totalHeadphones} total headphones,
        ${this.totalMouse} total computer mice,
        `);
        }
    }

    

}



export default Store;