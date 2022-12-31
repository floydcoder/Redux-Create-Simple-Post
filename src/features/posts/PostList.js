import { useSelector, useDispatch } from 'react-redux';
import {
  selectAllPosts,
  getPostsError,
  getPostsStatus,
  fetchPosts,
} from './postSlice';
import { useEffect } from 'react';
import PostsExcerpt from './PostsExcerpt';

const PostList = () => {
  const dispatch = useDispatch();

  // Invoke the reducers from PostSlice
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  // Execute when first rerender and every dependency update, which is when status changes and
  useEffect(() => {
    // FETCH POSTS when status  is 'idle', meaning is listening for changes
    if (postsStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  // Set the content of the page based on the posts status
  let content;
  if (postsStatus === 'loading') {
    content = <p>"Loading..."</p>;
  } else if (postsStatus === 'succeeded') {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostsExcerpt key={post.id} post={post} />
    ));
  } else if (postsStatus === 'failed') {
    content = <p>{error}</p>;
  }

  /*
  Return the JSX representing all the Posts as content 
  */
  return <section>{content}</section>;
};

export default PostList;
