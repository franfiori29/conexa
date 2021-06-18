import { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";

import Paginate from '../Paginate';
import "./posts.scss";
import api from '../../config/api';
import { Post } from '../Post/types';
import { PostsResponse } from './types';
import PostCard from '../Post';
import { useUserContext } from '../../context/UserContext';
import { BEARER } from '../../constants/authorization';
import Spinner from '../Spinner';
interface Props { };

const Posts: React.FC<Props> = (props) => {
  const [start, setStart] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useUserContext();

  useEffect(() => {
    api.get<PostsResponse>("/posts", { params: { _limit: 10, _start: start }, ...BEARER() })
      .then(resp => setPosts(resp.data.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [start]);

  useEffect(() => {
    api.get<{ count: number }>("posts/count", { ...BEARER() })
      .then(resp => setCount(resp.data.count));
  }, []);

  const handlePageChange = (data: { selected: number }) => {
    setStart(data.selected * 10);
    window.scrollTo(0, 0);
  };

  if (!user) return <Redirect to="/" />;

  if (loading) return <Spinner />;

  if (error) return <h1>Oops! Hubo un error</h1>

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th className="text-center h1">Posts</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </tbody>
      </table>
      {count &&
        <Paginate count={count} handlePageChange={handlePageChange} />}
    </>
  )
}

export default Posts;