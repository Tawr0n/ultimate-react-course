import { configureStore } from '@reduxjs/toolkit';

import userReducer from './features/user/userSlice.js';
import cartSlice from './features/cart/cartSlice.js';

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartSlice,
  },
});

export default store;
