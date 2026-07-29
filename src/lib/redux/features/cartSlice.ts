import { createSlice } from '@reduxjs/toolkit';

const storedItem = localStorage.getItem('ninja-cart');

interface CartItem {
  productId: string;
  quantity: number;
}

const initialState: CartItem[] = storedItem ? JSON.parse(storedItem) : [];

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productId = action.payload;

      const existingItem = state.find((item) => item.productId === productId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({
          productId,
          quantity: 1,
        });
      }

      localStorage.setItem('ninja-cart', JSON.stringify(state));
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;

      const existingItem = state.find((item) => item.productId === productId);

      if (!existingItem) return;

      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        const index = state.findIndex((item) => item.productId === productId);
        state.splice(index, 1);
      }

      localStorage.setItem('ninja-cart', JSON.stringify(state));
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
