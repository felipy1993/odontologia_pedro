import React from 'react';
import { Testimonial } from '../types';
import Editable from './Editable';
import SectionControls from './SectionControls';
import StarRating from './StarRating';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';
import { useImageUploader } from '../hooks/useImageUploader';
import { transformGoogleDriveLink } from '../utils';

interface TestimonialsProps {
    testimonials: Testimonial[];
    containerClass: string;
    isEditMode: boolean;
    onUpdate: (id: number, field: keyof Testimonial, value: string | number) => void;
    onDelete: (id: number) => void;
    onAdd: () => void;
    onAvatarChange: (id: number, newSrc: string) => void;
}

const QuoteIcon: React.FC = () => (
    <svg className="absolute top-6 right-6 w-20 h-20 text-theme-primary/5" fill="currentColor" viewBox="0 0 32 32">
        <path d="M9.333 22.667h-4c-1.473 0-2.667-1.194-2.667-2.667v-8c0-1.473 1.194-2.667 2.667-2.667h6.667c1.473 0 2.667 1.194 2.667 2.667v4.667c0 3.109-2.019 5.754-4.832 6.452l-0.168 0.048c-0.428 0.122-0.667 0.555-0.667 1v0.833z"></path>
        <path d="M26.667 22.667h-4c-1.473 0-2.667-1.194-2.667-2.667v-8c0-1.473 1.194-2.667 2.667-2.667h6.667c1.473 0 2.667 1.194 2.667 2.667v4.667c0 3.109-2.019 5.754-4.832 6.452l-0.168 0.048c-0.428 0.122-0.667 0.555-0.667 1v0.833z"></path>
    </svg>
);


const Testimonials: React.FC<TestimonialsProps> = ({ testimonials, containerClass, isEditMode, onUpdate, onDelete, onAdd, onAvatarChange }) => {
    const { ref, isVisible } = useAnimateOnScroll({ threshold: 0.1 });
    const { triggerUpload } = useImageUploader();
    
    const handleAvatarClick = async (id: number) => {
        if (!isEditMode) return;
        const downloadURL = await triggerUpload('images/testimonials');
        if (downloadURL) {
            onAvatarChange(id, downloadURL);
        }
    };
    
    const getInitials = (name: string = '') => {
        const names = name.split(' ');
        if (names.length > 1) {
            return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    return (
        <section id="depoimentos" className={`bg-theme-accent py-16 lg:py-24`}>
            <div className={`container mx-auto ${containerClass}`}>
                <div className="max-w-xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-bold text-theme-heading font-heading">O que nossos pacientes dizem</h2>
                </div>
                <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div 
                            key={testimonial.id} 
                            className={`relative group flex flex-col p-8 rounded-2xl bg-theme-card border border-black/5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-theme-primary/10 ${isVisible ? 'animate-reveal' : 'opacity-0'}`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <QuoteIcon />
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-center mb-4">
                                    <div 
                                        className={`relative w-14 h-14 rounded-full mr-4 bg-theme-primary/10 flex-shrink-0 group/avatar ${isEditMode ? 'cursor-pointer' : ''}`}
                                        onClick={() => handleAvatarClick(testimonial.id)}
                                    >
                                        {testimonial.avatar ? (
                                            <img src={transformGoogleDriveLink(testimonial.avatar)} alt={testimonial.author} className="w-full h-full object-cover rounded-full" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-theme-primary font-bold text-lg">
                                                {getInitials(testimonial.author)}
                                            </div>
                                        )}
                                        {isEditMode && (
                                             <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300 rounded-full">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" /></svg>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <Editable as="strong" isEditMode={isEditMode} onSave={v => onUpdate(testimonial.id, 'author', v)} className="text-theme-heading font-semibold font-heading block">{testimonial.author}</Editable>
                                        <StarRating rating={testimonial.rating} />
                                    </div>
                                </div>
                                <Editable as="p" isEditMode={isEditMode} onSave={v => onUpdate(testimonial.id, 'quote', v)} className="text-theme-muted italic flex-grow">{testimonial.quote}</Editable>
                            </div>
                             {isEditMode && (
                               <button onClick={() => onDelete(testimonial.id)} className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20" aria-label="Excluir depoimento">
                                    &times;
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                 <SectionControls isEditMode={isEditMode} onAddItem={onAdd} addLabel="Adicionar Depoimento" />
            </div>
        </section>
    );
};

export default Testimonials;