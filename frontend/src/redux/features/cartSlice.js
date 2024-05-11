import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems:localStorage.getItem('cartItems')  
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],

    shippingInfo:localStorage.getItem('shippingInfo')  
        ? JSON.parse(localStorage.getItem('shippingInfo'))
        : {},
};

export const cartSlice = createSlice({
    initialState,
    name:"cartSlice",
    reducers:{
        setCartItem: (state, action) => {
            const item = action.payload;

            const isItemExist = state.cartItems.find(
                (i) => i.product === item.product
            );
            if(isItemExist){
                //update the value of cart
                state.cartItems = state.cartItems.map((i) =>
                i.product === isItemExist.product ? item : i
            );
            } else{
                //create new item
                state.cartItems = [...state.cartItems,item]
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        removeCartItem:(state,action) => {
            state.cartItems = state?.cartItems?.filter(
                (i) => i.product !== action.payload
            );

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        saveShippingInfo: (state,action) => {
            state.shippingInfo = action.payload

            localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo))

        },
        clearCart:(state,action) => {
            localStorage.removeItem("cartItems");
            state.cartItems = []; 
        },
    },
});

export default cartSlice.reducer;

export const { setCartItem, removeCartItem, saveShippingInfo,clearCart } = cartSlice.actions