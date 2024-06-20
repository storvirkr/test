import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Photo } from '../types';
import PhotoModal from './PhotoModal';
import PhotoCanvas from './PhotoCanvas';
import styles from "./styles.module.css"

interface PhotoListProps {
  albumId: number;
}

const PhotoList: React.FC<PhotoListProps> = ({ albumId }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Photo[]>(`http://localhost:3000/photos/${albumId}`);
        setPhotos(response.data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [albumId]);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  return (
      <div>
        {loading ? (
            <div>Loading...</div>
        ) : (
            <ul className={styles.photos}>
              {photos.map((photo, index) => (
                  <li key={photo.id} style={{ listStyleType: 'none', marginBottom: '10px' }} >
                    <PhotoCanvas photo={photo} />
                    <span onClick={() => handlePhotoClick(photo)}>{index}</span>
                  </li>
              ))}
            </ul>
        )}
        {selectedPhoto && (
            <PhotoModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
        )}
      </div>
  );
};

export default PhotoList;

