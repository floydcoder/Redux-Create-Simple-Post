import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

/**
 * An object that defines the post state
 */

const initialState = {
  posts: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // a reducer for adding a new post.
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
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
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
});

// Exports
export const selectAllPosts = (state) => state.posts.posts;
export const { postAdded, reactionAdded } = postSlice.actions;
export default postSlice.reducer;
