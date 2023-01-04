import { useSelector } from 'react-redux';
import { selectAllPosts, getPostsError, getPostsStatus } from './postSlice';

import PostsExcerpt from './PostsExcerpt';

const PostList = () => {
  // Invoke the reducers from PostSlice
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

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
