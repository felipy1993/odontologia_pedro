import React, { useEffect } from 'react';
import { GalleryImage } from '../types';
import { transformGoogleDriveLink } from '../utils';

interface LightboxProps {
    images: GalleryImage[];
    currentIndex: number;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, currentIndex, onClose, onPrev, onNext }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') onPrev();
            if (e.key === 'ArrowRight') onNext();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, onPrev, onNext]);

    if (currentIndex < 0 || currentIndex >= images.length) {
        return null;
    }

    const currentImage = images[currentIndex];

    return (
        <div 
            className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label="Visualizador de Imagem"
        >
            {/* Navigation Button: Previous */}
            <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-[102] w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                aria-label="Imagem Anterior"
            >
                &lt;
            </button>

            {/* Content */}
            <div 
                className="relative max-w-4xl max-h-[90vh] flex flex-col items-center gap-4"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
            >
                <img 
                    src={transformGoogleDriveLink(currentImage.src)} 
                    alt={currentImage.caption} 
                    className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />
                <p className="text-white text-center">{currentImage.caption}</p>
            </div>
            
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-[102] w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white text-2xl hover:bg-white/30 transition-colors"
                aria-label="Fechar"
            >
                &times;
            </button>

             {/* Navigation Button: Next */}
            <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-[102] w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                aria-label="Próxima Imagem"
            >
                &gt;
            </button>
        </div>
    );
};

export default Lightbox;
