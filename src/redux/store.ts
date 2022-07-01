import { configureStore } from "@reduxjs/toolkit";
import retailerReducer from '../redux/retailerslice';
import wholesaleReducer from '../redux/wholesaleslice';
const store = configureStore({
    reducer:{
      retailer : retailerReducer,
      wholesale: wholesaleReducer
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch