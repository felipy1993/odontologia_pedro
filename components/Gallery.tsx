import React, { useRef, useState, useEffect } from 'react';
import { GalleryImage } from '../types';
import Editable from './Editable';
import SectionControls from './SectionControls';
import Lightbox from './Lightbox'; // Import the new component
import { transformGoogleDriveLink } from '../utils';
import { useImageUploader } from '../hooks/useImageUploader';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';

interface GalleryProps {
    galleryImages: GalleryImage[];
    containerClass: string;
    isEditMode: boolean;
    onUpdate: (id: number, field: keyof GalleryImage, value: string) => void;
    onDelete: (id: number) => void;
    onAdd: () => void;
    onImageChange: (id: number, newSrc: string) => void;
}

const ExpandIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5" />
    </svg>
);

const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" />
    </svg>
);


const Gallery: React.FC<GalleryProps> = ({ galleryImages, containerClass, isEditMode, onUpdate, onDelete, onAdd, onImageChange }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const { triggerUpload } = useImageUploader();
    const prevImageCount = useRef(galleryImages.length);
    const { ref, isVisible } = useAnimateOnScroll({ threshold: 0.1 });

    // Lightbox State
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleEditImageClick = async (e: React.MouseEvent, id: number) => {
        e.stopPropagation(); // Prevent opening lightbox
        if (!isEditMode) return;
        const downloadURL = await triggerUpload('images/gallery');
        if (downloadURL) {
            onImageChange(id, downloadURL);
        }
    };

    const openLightbox = (index: number) => {
        if (isEditMode) return; // Don't open lightbox in edit mode to allow for caption editing
        setCurrentImageIndex(index);
        setIsLightboxOpen(true);
    };
    
    const closeLightbox = () => {
        setIsLightboxOpen(false);
    };

    const goToNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    };

    const goToPrev = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
    };


    const checkScrollButtons = () => {
        const el = scrollContainerRef.current;
        if (el) {
            const hasOverflow = el.scrollWidth > el.clientWidth;
            setCanScrollLeft(el.scrollLeft > 5); // A small buffer
            setCanScrollRight(hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        // If a new image was added, scroll to the end to make it visible
        if (galleryImages.length > prevImageCount.current) {
            container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
        }
        // Update the ref for the next render cycle
        prevImageCount.current = galleryImages.length;

        checkScrollButtons();
        
        const observer = new ResizeObserver(checkScrollButtons);
        observer.observe(container);
        
        container.addEventListener('scroll', checkScrollButtons);
        
        return () => {
            observer.disconnect();
            if (container) { // Check if container exists before removing listener
                 container.removeEventListener('scroll', checkScrollButtons);
            }
        };
    }, [galleryImages]);

    const handleScroll = (direction: 'left' | 'right') => {
        const el = scrollContainerRef.current;
        if (el) {
            const scrollAmount = el.clientWidth * 0.9; // Scroll by 90% of the visible width
            el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section id="galeria" className="bg-theme-accent py-16 lg:py-24">
            <div className={`container mx-auto ${containerClass}`}>
                 <div className="max-w-xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-bold text-theme-heading font-heading">Galeria de Sorrisos</h2>
                    <p className="text-theme-muted mt-4">Confira alguns dos resultados e o ambiente da nossa clínica.</p>
                </div>
                
                <div ref={ref} className={`relative group/nav transition-opacity duration-500 ${isVisible ? 'animate-reveal' : 'opacity-0'}`}>
                    <div 
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar pb-4"
                    >
                         <style>{`.hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; } .hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
                        {galleryImages.map((image, index) => (
                            <div key={image.id} className="group/item relative flex flex-col bg-theme-card p-4 rounded-lg shadow-sm border border-black/5 transition-all duration-300 w-[90%] sm:w-[45%] lg:w-[31%] flex-shrink-0 snap-start">
                                <div 
                                    className={`relative w-full aspect-[4/3] rounded-md overflow-hidden mb-4 bg-black/5 flex items-center justify-center ${!isEditMode ? 'cursor-pointer' : ''}`}
                                    onClick={() => openLightbox(index)}
                                >
                                    <img src={transformGoogleDriveLink(image.src)} alt={image.caption} className="w-full h-full object-cover transition-transform duration-300 group-hover/item:scale-105" loading="lazy" />
                                    {!isEditMode && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity">
                                            <ExpandIcon />
                                        </div>
                                    )}
                                     {isEditMode && (
                                        <button 
                                            onClick={(e) => handleEditImageClick(e, image.id)} 
                                            className="absolute top-2 right-2 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors z-10"
                                            aria-label="Alterar Imagem"
                                        >
                                            <EditIcon />
                                        </button>
                                    )}
                                </div>
                                <Editable
                                    as="p"
                                    isEditMode={isEditMode}
                                    onSave={(newValue) => onUpdate(image.id, 'caption', newValue)}
                                    className="text-theme-muted text-sm text-center mt-auto"
                                >
                                    {image.caption}
                                </Editable>
                                {isEditMode && (
                                    <button 
                                        onClick={() => onDelete(image.id)} 
                                        className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity z-10" 
                                        aria-label="Excluir imagem"
                                    >
                                        &times;
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    {canScrollLeft && (
                         <button 
                            onClick={() => handleScroll('left')}
                            className="absolute top-1/2 -translate-y-1/2 -left-4 z-20 w-12 h-12 bg-theme-card/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-theme-heading opacity-0 group-hover/nav:opacity-100 transition-all duration-300 hover:scale-110 disabled:opacity-0"
                            aria-label="Anterior"
                         >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        </button>
                    )}
                    {canScrollRight && (
                        <button 
                            onClick={() => handleScroll('right')}
                            className="absolute top-1/2 -translate-y-1/2 -right-4 z-20 w-12 h-12 bg-theme-card/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-theme-heading opacity-0 group-hover/nav:opacity-100 transition-all duration-300 hover:scale-110 disabled:opacity-0"
                            aria-label="Próximo"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </button>
                    )}
                </div>

                <SectionControls isEditMode={isEditMode} onAddItem={onAdd} addLabel="Adicionar Foto" />
            </div>
            
            {isLightboxOpen && (
                <Lightbox 
                    images={galleryImages}
                    currentIndex={currentImageIndex}
                    onClose={closeLightbox}
                    onNext={goToNext}
                    onPrev={goToPrev}
                />
            )}
        </section>
    );
};

export default Gallery;