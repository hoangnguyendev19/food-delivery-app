import { createSlice } from '@reduxjs/toolkit';

const items =
  localStorage.getItem('cartItems') !== null ? JSON.parse(localStorage.getItem('cartItems')) : [];

const totalAmount =
  localStorage.getItem('totalAmount') !== null
    ? JSON.parse(localStorage.getItem('totalAmount'))
    : 0;

const totalQuantity =
  localStorage.getItem('totalQuantity') !== null
    ? JSON.parse(localStorage.getItem('totalQuantity'))
    : 0;

const shippingAddress =
  localStorage.getItem('shippingAddress') !== null
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {};
const paymentMethod =
  localStorage.getItem('paymentMethod') !== null
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : '';

const setItem = (item, totalAmount, totalQuantity) => {
  localStorage.setItem('cartItems', JSON.stringify(item));
  localStorage.setItem('totalAmount', JSON.stringify(totalAmount));
  localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity));
};

const initialState = {
  cart: {
    cartItems: items,
    shippingAddress: shippingAddress,
    paymentMethod: paymentMethod,
  },
  totalQuantity: totalQuantity,
  totalAmount: totalAmount,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cart.cartItems.find((item) => item.id === newItem.id);
      state.totalQuantity += newItem.quantity;

      if (!existingItem) {
        state.cart.cartItems.push({
          id: newItem.id,
          name: newItem.name,
          image: newItem.image,
          price: newItem.price,
          quantity: newItem.quantity,
          totalPrice: newItem.price * newItem.quantity,
        });
      } else {
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price * newItem.quantity);
      }

      state.totalAmount = state.cart.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      setItem(
        state.cart.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },
    removeItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cart.cartItems.find((item) => item.id === id);

      if (existingItem) {
        state.cart.cartItems = state.cart.cartItems.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }

      state.totalAmount = state.cart.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
      setItem(
        state.cart.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },

    increaseItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cart.cartItems.find((item) => item.id === newItem.id);
      state.totalQuantity++;

      existingItem.quantity++;
      existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItem.price);

      state.totalAmount = state.cart.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      setItem(
        state.cart.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },

    decreaseItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cart.cartItems.find((item) => item.id === id);
      state.totalQuantity--;

      if (existingItem.quantity === 1) {
        state.cart.cartItems = state.cart.cartItems.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = Number(existingItem.totalPrice) - Number(existingItem.price);
      }

      state.totalAmount = state.cart.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      setItem(
        state.cart.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },

    resetCart: (state) => {
      state = {
        cartItems: [],
        totalAmount: 0,
        totalQuantity: 0,
      };

      setItem([], 0, 0);
    },

    saveShippingAddress: (state, action) => {
      state.cart.shippingAddress = action.payload;
    },

    savePaymentMethod: (state, action) => {
      state.cart.paymentMethod = action.payload;
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseItem,
  decreaseItem,
  resetCart,
  saveShippingAddress,
  savePaymentMethod,
} = cartSlice.actions;
export default cartSlice.reducer;
