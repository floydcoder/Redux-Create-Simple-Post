import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

/*
  initialization of 'posts' state
 */
const initialState = [
  {
    id: '1',
    title: 'Learning Redux Toolkit',
    content: "I've heard good things.",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
  },
  {
    id: '2',
    title: 'Slices...',
    content: 'The more I slice the more I want pizza',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
  },
];

/*
  posts is an array of objects
 */
const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // a reducer for adding a new post.
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      // prepared callback
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
          },
        };
      },
    },
  },
});

// Exports
export const selectAllPosts = (state) => state.posts;
export const { postAdded } = postSlice.actions;
export default postSlice.reducer;
