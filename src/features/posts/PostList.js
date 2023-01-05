import { useSelector } from 'react-redux';
import { selectPostIds, getPostsError, getPostsStatus } from './postSlice';

import PostsExcerpt from './PostsExcerpt';

const PostList = () => {
  // Invoke the reducers from PostSlice
  const orderedPostIds = useSelector(selectPostIds);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  // Set the content of the page based on the posts status
  let content;
  if (postStatus === 'loading') {
    content = <p>"Loading..."</p>;
  } else if (postStatus === 'succeeded') {
    content = orderedPostIds.map((postId) => (
      <PostsExcerpt key={postId} postId={postId} />
    ));
  } else if (postStatus === 'failed') {
    content = <p>{error}</p>;
  }

  /*
  Return the JSX representing all the Posts as content 
  */
  return <section>{content}</section>;
};

export default PostList;
