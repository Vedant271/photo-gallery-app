import { useEffect, useState, useRef } from "react";
import { Photo } from "./types/Photo";
import GalleryGrid from "./components/GalleryGrid";
import LoadMoreButton from "./components/LoadMoreButton";
import ImageModal from "./components/ImageModal";

const PHOTOS_URL = "https://jsonplaceholder.typicode.com/photos";

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [start, setStart] = useState(0);
  const limit = 20;
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const openModal = (photo: Photo) => setSelectedPhoto(photo);
  const closeModal = () => setSelectedPhoto(null);

  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      fetchPhotos();
      isFirstLoad.current = false;
    }
  }, []);

  const fetchPhotos = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${PHOTOS_URL}?_start=${start}&_limit=${limit}`);
      if (!res.ok) throw new Error("Failed to fetch photos.");
      const data: Photo[] = await res.json();
      setPhotos((prev) => [...prev, ...data]);
    } catch (error) {
      console.error("Failed to fetch photos", error);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (start === 0) return; // avoid refetching 0 twice
    fetchPhotos();
  }, [start]);

  const loadMore = () => {
    setStart((prev) => prev + limit);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: `url(${require('./assets/background.jpg')})`,
      }}
    >
    <div className="p-4 relative">
      <h1 className="text-5xl font-bold text-center mt-8 mb-10 drop-shadow-md">
        Photo Gallery
      </h1>
      

      <GalleryGrid photos={photos} onPhotoClick={openModal} />

      {error && (
        <p className="text-red-600 text-center mt-4">{error}</p>
      )}

      {loading && (
        <div className="flex justify-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
        </div>
      )}

      <div className="flex justify-center mt-6">
        <LoadMoreButton onClick={loadMore} />
      </div>

      {selectedPhoto && (
        <ImageModal photo={selectedPhoto} onClose={closeModal} />
      )}
    </div>
    </div>
  );
}

export default App;
