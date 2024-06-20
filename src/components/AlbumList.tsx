import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Album } from '../types';
import PhotoList from './PhotoList';
import Loading from "./Loading.tsx";

interface AlbumListProps {
    userId: number;
}

const AlbumList: React.FC<AlbumListProps> = ({ userId }) => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [expandedAlbumId, setExpandedAlbumId] = useState<number | null>(null);

    useEffect(() => {
        const fetchAlbums = async () => {
            setLoading(true);
            try {
                const response = await axios.get<Album[]>(`http://localhost:3000/albums/${userId}`);
                setAlbums(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAlbums();
    }, [userId]);

    const handleAlbumClick = (albumId: number) => {
        setExpandedAlbumId(expandedAlbumId === albumId ? null : albumId);
    };

    return (
        <div >
            {loading ? (
                <Loading />
            ) : (
                <ul>
                    {albums.map((album) => (
                        <li key={album.albumId}>
                            <div onClick={() => handleAlbumClick(album.albumId)}>
                                {album.title}
                            </div>
                            {expandedAlbumId === album.albumId && <PhotoList albumId={album.albumId} />}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AlbumList;
