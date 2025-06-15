import React from "react";

interface Props {
  onClick: () => void;
}

const LoadMoreButton: React.FC<Props> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-full bg-blue-600 text-white text-[24px] px-6 py-4 rounded-[10px] shadow-md hover:bg-blue-700 transition duration-300"
  >
    Load More
  </button>
);

export default LoadMoreButton;
