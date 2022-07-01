import { createSlice } from "@reduxjs/toolkit";
import wholesaleDetails from '../Jsondetails/wholesaleproduct.json'
import { addProduct } from "./retailerslice";


type wholesaleType = {
    products:{
        product_name:string,
        quantity:number,
        product_price:number
    }[]
}

const initialState : wholesaleType = {
    products: localStorage['wholesale'] ? JSON.parse(localStorage['wholesale']) : wholesaleDetails
}

if(!localStorage['wholesale']){
    localStorage['wholesale'] = JSON.stringify(wholesaleDetails)
}

const wholesaleSlice = createSlice({
    name:'wholesale',
    initialState,
    extraReducers : (builder) => {
        builder.addCase(addProduct,(state,action)=>{
            const newProducts = action.payload.products;
            const wholesaleProducts = [...state.products]
            newProducts.forEach((product:any)=>{
                wholesaleProducts.find((wholesaleProduct)=>wholesaleProduct.product_name === product.product_name)!.quantity -= product.quantity
            })
            localStorage['wholesale'] = JSON.stringify(wholesaleProducts)

        })
    },
    reducers:{
        
    }
})

export default wholesaleSlice.reducer;