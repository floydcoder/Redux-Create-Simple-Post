import { useSelector } from 'react-redux';
import { selectAllPosts } from './postSlice';

const PostList = () => {
  /*
  the posts state is being retrieve from the postSlice 'name' key, which now is globally available through the store provider
   */
  const posts = useSelector(selectAllPosts);

  /*
  posts is an array of objects, hence why we use map(). Return a jsx that represent each post.
   */
  const renderPosts = posts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
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
