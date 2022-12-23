import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postSlice';
import userReducers from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: userReducers,
  },
});
