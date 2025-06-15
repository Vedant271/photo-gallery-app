import React from "react";
import { Photo } from "../types/Photo";
import fallbackThumb from "../assets/fallback-thumbnail.png";

interface Props {
  photo: Photo;
  onClick: (photo: Photo) => void;
}

const PhotoCard: React.FC<Props> = ({ photo, onClick }) => {
  return (
    <div className="bg-white p-2 rounded-[20px] drop-shadow-[0_4px_8px_rgba(255,255,255,0.5)] transition cursor-pointer" onClick={() => onClick(photo)}>
      <div className="aspect-square overflow-hidden">
        <img
            // src={photo.thumbnailUrl}
            src={"https://placehold.co/150"}
            alt={photo.title}
            onError={(e) => {
                e.currentTarget.onerror = null; // prevent infinite loop
                e.currentTarget.src = fallbackThumb;
            }}
            className="w-full h-full object-cover rounded-[20px]"
        />
      </div>
      <p className="mt-2 text-sm text-gray-700">{photo.title}</p>
    </div>
  );
};

export default PhotoCard;
