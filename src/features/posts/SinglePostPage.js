import { useSelector } from 'react-redux';
import { selectPostById } from './postSlice';

import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionsButtons';

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SinglePostPage = () => {
  // retrieve postId
  const { postId } = useParams();
  console.log(postId);
  const post = useSelector((state) => selectPostById(state, Number(postId)));
  console.log(post);

  // if post is not found
  if (!post) {
    return (
      <section>
        <h2>Post not Found!</h2>
      </section>
    );
  }

  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p className='postCredit'>
        <Link to={`/post/edit/${post.id}`}></Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default SinglePostPage;
