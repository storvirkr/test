import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Photo } from '../types';
import PhotoModal from '../components/PhotoModal';
import styles from "./styles.module.css"

const Favorites: React.FC = () => {
    const favorites = useSelector((state: RootState) => state.favorites.photos);
    const [selectedPhoto, setSelectedPhoto] = React.useState<Photo | null>(null);

    return (
        <div className={styles.list} >
            <ul>
                {favorites.map((photo) => (
                    <li key={photo.id} className={styles.card}>
                        <img
                            src={photo.url}
                            alt={photo.title}
                            onClick={() => setSelectedPhoto(photo)}
                            style={{ cursor: 'pointer' }}
                        />
                        {photo.title}
                    </li>
                ))}
            </ul>
            {selectedPhoto && (
                <PhotoModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
            )}
        </div>
    );
};

export default Favorites;

