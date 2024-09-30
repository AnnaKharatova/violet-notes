import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import postsSlice from './postsSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    posts: postsSlice,
  },
});

export default store;