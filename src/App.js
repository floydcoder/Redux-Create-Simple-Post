import PostList from './features/posts/PostList';
import AddPostForm from './features/posts/AddPostForm';
import SinglePostPage from './features/posts/SinglePostPage';
import EditPostForm from './features/posts/EditPostForm';
import Layout from './componets/Layout';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<PostList />} />

        <Route path='post'>
          <Route index element={<AddPostForm />} />
          <Route path=':postId' element={<SinglePostPage />} />
          <Route path='edit/:postId' element={<EditPostForm />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
