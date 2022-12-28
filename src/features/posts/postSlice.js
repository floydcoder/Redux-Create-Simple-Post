import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import axios from 'axios';

const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

/**
 * An object that defines the post state
 */

const initialState = {
  posts: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

/**
 * ASYNC THUNK
 */

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await axios.get(POST_URL);
    return [...response.data];
  } catch (err) {
    return err.message;
  }
});

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
    extraReducers(builder) {
      /*
       * builder: is an object that let us define additional case reducers
       * that run in response to the actions defined outside of the slice
       */
      builder
        // PENDING
        .addCase(fetchPosts.pending, (state, action) => {
          state.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.status = 'succeeded';
          // Adding date and reaction
          let min = 1;
          const loadedPosts = action.payload.map((post) => {
            post.date = sub(new Date(), { minutes: min++ }).toISOString();
            post.reaction = {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            };
            return post;
          });
          // Add any fetched posts to the array
          state.posts = state.posts.concat(loadedPosts);
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  },
});

// Exports
export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const { postAdded, reactionAdded } = postSlice.actions;
export default postSlice.reducer;
