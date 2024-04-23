import { configureStore } from '@reduxjs/toolkit';
import foodListReducer from './foodSlice';
import foodDetailReducer from './foodDetailSlice';
import foodSaleReducer from './foodSaleSlice';
import commentReducer from './commentSlice';
import cartReducer from './shopping-cart/cartSlice';
import cartUiReducer from './shopping-cart/cartUiSlice';
import authReducer from './authSlice';
import userDetailReducer from './userDetailSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    cartUi: cartUiReducer,
    comment: commentReducer,
    foodList: foodListReducer,
    foodDetail: foodDetailReducer,
    foodSale: foodSaleReducer,
    auth: authReducer,
    userDetail: userDetailReducer,
  },
});

export default store;
