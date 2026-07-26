import { createSlice } from '@reduxjs/toolkit';

const storedItem = localStorage.getItem('ninja-cart');

const initialState: string[] = storedItem ? JSON.parse(storedItem) : [];

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productId = action.payload;
      state.push(productId);
      localStorage.setItem('ninja-cart', JSON.stringify(state));
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      state = state.filter((item: string) => {
        return item !== productId;
      });
      localStorage.removeItem('ninja-cart');
      localStorage.setItem('ninja-cart', JSON.stringify(state));
      return state;
    },

    setState: (state, action) => {
      state = action.payload;
      return state;
    },

    emptyCart: () => {
      return [];
    },
  },
});

export const { addToCart, removeFromCart, setState, emptyCart } =
  cartSlice.actions;

export const cartReducer = cartSlice.reducer;
