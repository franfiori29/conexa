import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import "./photos.scss";
import Paginate from "../Paginate";
import api from '../../config/api';
import { Photo } from '../Photo/types';
import { PhotosResponse } from './types';
import PhotoCard from '../Photo';
import Spinner from '../Spinner';
import { BEARER } from '../../constants/authorization';
import { useUserContext } from '../../context/UserContext';

interface Props { };

const Posts: React.FC<Props> = (props) => {
  const [start, setStart] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const { user } = useUserContext();

  useEffect(() => {
    api.get<PhotosResponse>("/photos", { params: { _limit: 10, _start: start }, ...BEARER() })
      .then(resp => setPhotos(resp.data.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [start]);

  useEffect(() => {
    api.get<{ count: number }>("/photos/count", { ...BEARER() })
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
      <div className="photos-container">
        {photos.map(photo => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>
      {count &&
        <Paginate count={count} handlePageChange={handlePageChange} />
      }
    </>
  )
}

export default Posts;