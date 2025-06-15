import React from "react";
import { Photo } from "../types/Photo";
import fallbackFull from "../assets/fallback-modal.png";

interface Props {
  photo: Photo;
  onClose: () => void;
}

const ImageModal: React.FC<Props> = ({ photo, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded-[25px] max-w-3xl w-full relative"
        onClick={(e) => e.stopPropagation()} // prevent outside click from closing immediately
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md text-gray-700 hover:text-red-500 transition"
        >
          ✕
        </button>
        <img
        //   src={photo.url}
          src={"https://placehold.co/600"}
          alt={photo.title}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackFull;
          }}
          className="w-full max-h-[80vh] object-contain rounded"
        />
        <p className="mt-2 text-center text-gray-800 font-medium">
          {photo.title}
        </p>
      </div>
    </div>
  );
};

export default ImageModal;
