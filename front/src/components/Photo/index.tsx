import { Photo } from "./types";
import "./photo.scss";

interface Props {
  photo: Photo;
};

const PhotoCard: React.FC<Props> = ({ photo }) => {
  return (
    <div className="photo-card card">
      <img src={photo.url} alt={photo.title} />
      <p className="card-title text-center">
        {photo.title}
      </p>
    </div>
  )
}

export default PhotoCard;