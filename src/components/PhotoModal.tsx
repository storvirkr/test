import React from 'react';
import styled from 'styled-components';
import { Photo } from '../types';

interface PhotoModalProps {
    photo: Photo;
    onClose: () => void;
}

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
`;

const PhotoModal: React.FC<PhotoModalProps> = ({ photo, onClose }) => {
    return (
        <ModalBackground onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <img src={photo.url} alt={photo.title} style={{ width: '600px', height: '600px' }} />
                <button onClick={onClose}>Close</button>
            </ModalContent>
        </ModalBackground>
    );
};

export default PhotoModal;
