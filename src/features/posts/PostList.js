import { useSelector, useDispatch } from 'react-redux';
import {
  selectAllPosts,
  getPostsError,
  getPostsStatus,
  fetchPosts,
} from './postSlice';
import { useEffect } from 'react';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionsButtons from './ReactionsButtons';

const PostList = () => {
  const dispatch = useDispatch();
  /*
  the posts state is being retrieve from the postSlice 'name' key, which now is globally available through the store provider
   */
  const posts = useSelector(selectAllPosts);

  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  /*
    order the post by the most recent one to the latest.
   */
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
  /*
  posts is an array of objects, hence why we use map(). Return a jsx that represent each post.
   */
  const renderPosts = orderedPosts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <p className='postCredit'>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionsButtons post={post} />
    </article>
  ));

  /*
  Return the JSX representing all the Posts 
  */
  return (
    <section>
      <h2>Posts</h2>
      {renderPosts}
    </section>
  );
};

export default PostList;
