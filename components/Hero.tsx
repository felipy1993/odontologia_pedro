import React from 'react';
import Editable from './Editable';
import { transformGoogleDriveLink } from '../utils';
import { useImageUploader } from '../hooks/useImageUploader';

interface HeroProps {
    imageSrc: string;
    title: string;
    lead: string;
    isEditMode: boolean;
    onContentChange: (id: string, value:string) => void;
    onImageChange: (newSrc: string) => void;
    containerClass: string;
    heroTitleFontSize: number;
}

const Hero: React.FC<HeroProps> = ({ imageSrc, title, lead, isEditMode, onContentChange, onImageChange, containerClass, heroTitleFontSize }) => {
    const { triggerUpload } = useImageUploader();

    const handleImageClick = async () => {
        if (!isEditMode) return;
        const downloadURL = await triggerUpload('images/hero');
        if (downloadURL) {
            onImageChange(downloadURL);
        }
    };
    
    return (
        <section 
            className="relative bg-cover bg-center text-white"
            style={{ backgroundImage: `url(${transformGoogleDriveLink(imageSrc)})` }}
        >
            <div className="absolute inset-0 bg-black/50"></div>
             {isEditMode && (
                <button 
                    onClick={handleImageClick}
                    className="absolute top-4 right-4 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    aria-label="Alterar Imagem de Fundo"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" />
                    </svg>
                </button>
            )}

            <div className={`relative container mx-auto ${containerClass} flex items-center min-h-[70vh] md:min-h-[60vh] py-20`}>
                <div className="max-w-4xl">
                    <Editable
                        as="h1"
                        isEditMode={isEditMode}
                        onSave={(newValue) => onContentChange('hero-title', newValue)}
                        className="font-bold my-4 leading-tight font-heading whitespace-pre-line"
                        style={{ fontSize: `clamp(36px, 7vw, ${heroTitleFontSize}px)` }}
                    >
                        {title}
                    </Editable>
                     <Editable
                        as="p"
                        isEditMode={isEditMode}
                        onSave={(newValue) => onContentChange('hero-lead', newValue)}
                        className="text-lg text-white/90 mb-8"
                    >
                        {lead}
                    </Editable>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a 
                            className="w-full sm:w-auto text-center py-3 px-8 rounded-full font-semibold bg-theme-primary text-white shadow-lg shadow-theme-primary/30 transition-transform hover:scale-105" 
                            href="https://wa.me/5517996682637?text=Olá%2C%20gostaria%20de%20agendar%20uma%20consulta." 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            Agendar Consulta
                        </a>
                        <a 
                            className="w-full sm:w-auto text-center py-3 px-8 rounded-full font-semibold border-2 border-white text-white bg-transparent transition-colors hover:bg-white hover:text-theme-heading" 
                            href="#tratamentos"
                        >
                            Nossos Tratamentos
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;