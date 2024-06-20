import React, { useEffect, useRef } from 'react';
import { Photo } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { toggleFavorite } from '../store/favoriteSlice';

interface PhotoCanvasProps {
    photo: Photo;
}

const PhotoCanvas: React.FC<PhotoCanvasProps> = ({ photo }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const favorites = useSelector((state: RootState) => state.favorites.photos);
    const dispatch = useDispatch();
    const isFavorite = favorites.some((fav) => fav.id === photo.id);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const img = new Image();
        img.src = photo.url;

        img.onload = () => {
            if (ctx && canvas) {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                drawStar(ctx, canvas.width, canvas.height, isFavorite);
            }
        };
    }, [photo.thumbnailUrl, isFavorite]);

    const drawStar = (ctx: CanvasRenderingContext2D, width: number, _height: number, favorite: boolean) => {
        const starColor = favorite ? 'yellow' : 'gray';
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(width - 20, 20, 15, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = starColor;
        ctx.font = '20px Arial';
        ctx.fillText('★', width - 28, 27);
    };

    const handleCanvasClick = () => {
        dispatch(toggleFavorite(photo));
    };

    return <canvas ref={canvasRef} onClick={handleCanvasClick} style={{ cursor: 'pointer' }} />;
};

export default PhotoCanvas;
