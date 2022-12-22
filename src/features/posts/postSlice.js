import { createSlice } from '@reduxjs/toolkit';

/*
  initialization of 'posts' state
 */
const initialState = [
  {
    id: '1',
    title: 'Learning Redux Toolkit',
    content: "I've heard good things.",
  },
  {
    id: '2',
    title: 'Slices...',
    content: 'The more I slice the more I want pizza',
  },
];

/*
  posts is an array of objects
 */
const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
});

export const selectAllPosts = (state) => state.posts;

export default postSlice.reducer;
