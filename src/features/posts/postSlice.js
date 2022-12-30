import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import axios from 'axios';

// API ENDPOINT -> ARRAY OF POSTS
const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

/**
 * an Object representing the state of the posts
 * posts: array -> contains all the posts objects
 * status: string -> is the current status of the posts when syncronized to the API
 * error: if any error occur
 */
const initialState = {
  posts: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// ASYNC API CALLS
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(POST_URL);
  return response.data;
});

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initalPost) => {
    const response = await axios.post(POST_URL, initalPost);
    return response.data;
  }
);

// POSTS SLICE AND ITS CORRESPONDING REDUCERS
const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // REDUCER -> add a new post
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      // callback
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
    // REDUCER -> add a new reaction
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  // EXTRA REDUCERS: HANDLE API CALLS BASED ON STATUS
  extraReducers(builder) {
    builder
      // FETCH POSTS PROMISE IS PENDING
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      // FETCH POSTS PROMISE IS FULFILLED
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Adding date and reactions
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });
        // Add any fetched posts to the array
        state.posts = state.posts.concat(loadedPosts);
      })
      // FETCH POSTS PROMISE IS REJECTED
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // ADD NEW POST PROMISE IS FULFILLED
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        console.log(action.payload);
        state.posts.push(action.payload);
      });
  },
});

// Exports
export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const { postAdded, reactionAdded } = postSlice.actions;
export default postSlice.reducer;
