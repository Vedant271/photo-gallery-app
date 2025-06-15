import React from "react";
import { Photo } from "../types/Photo";
import PhotoCard from "./PhotoCard";

interface Props {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
}

const GalleryGrid: React.FC<Props> = ({ photos, onPhotoClick }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} onClick={onPhotoClick} />
      ))}
    </div>
  );
};

export default GalleryGrid;
