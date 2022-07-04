import { createSlice } from "@reduxjs/toolkit";
import retailers from '../Jsondetails/retailer.json';

type retailerType = {
    retailerDetails: {
        retailer_name: string,
        retailer_address: string,
        products: productType[]
    }[]
}

type productType = {
    product_id: string,
    product_name: string,
    quantity: number,
    purchase_date : string
}

const initialState: retailerType = {
    retailerDetails:  localStorage['retailers'] ? JSON.parse(localStorage['retailers']) : retailers 
}


if(!localStorage['retailers']){
    localStorage['retailers'] = JSON.stringify(retailers)
}

const retailerslice = createSlice({
    name: 'retailerDetails',
    initialState,
    reducers: {
        addProduct:(state,action) => {
            console.log(action.payload)
            const current_user = action.payload.current_user;
            const newProducts = action.payload.products;
            const retailerdetails = [...state.retailerDetails];           
            newProducts.forEach((product:any)=>{
                product.purchase_date = new Date().toLocaleDateString();
                retailerdetails.find((retailer)=>retailer.retailer_name === current_user)?.products.push(product)
                
            })
           
            localStorage['retailers'] = JSON.stringify(retailerdetails)
            
        }
    }

})
export default retailerslice.reducer;
export const {addProduct} =  retailerslice.actions;