import React from 'react';
import { Testimonial } from '../types';
import Editable from './Editable';
import SectionControls from './SectionControls';

interface TestimonialsProps {
    testimonials: Testimonial[];
    containerClass: string;
    isEditMode: boolean;
    onUpdate: (id: number, field: keyof Testimonial, value: string) => void;
    onDelete: (id: number) => void;
    onAdd: () => void;
}

const QuoteIcon: React.FC = () => (
    <svg className="absolute top-4 left-5 w-12 h-12 text-theme-primary/10" fill="currentColor" viewBox="0 0 32 32">
        <path d="M9.333 22.667h-4c-1.473 0-2.667-1.194-2.667-2.667v-8c0-1.473 1.194-2.667 2.667-2.667h6.667c1.473 0 2.667 1.194 2.667 2.667v4.667c0 3.109-2.019 5.754-4.832 6.452l-0.168 0.048c-0.428 0.122-0.667 0.555-0.667 1v0.833z"></path>
        <path d="M26.667 22.667h-4c-1.473 0-2.667-1.194-2.667-2.667v-8c0-1.473 1.194-2.667 2.667-2.667h6.667c1.473 0 2.667 1.194 2.667 2.667v4.667c0 3.109-2.019 5.754-4.832 6.452l-0.168 0.048c-0.428 0.122-0.667 0.555-0.667 1v0.833z"></path>
    </svg>
);


const Testimonials: React.FC<TestimonialsProps> = ({ testimonials, containerClass, isEditMode, onUpdate, onDelete, onAdd }) => {
    return (
        <section id="depoimentos" className={`bg-theme-accent py-16 lg:py-24`}>
            <div className={`container mx-auto ${containerClass}`}>
                <div className="max-w-xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-bold text-theme-heading font-heading">O que nossos pacientes dizem</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="relative group p-8 rounded-2xl bg-theme-card border border-black/5 shadow-sm">
                            <QuoteIcon />
                            <div className="relative z-10">
                                <Editable as="p" isEditMode={isEditMode} onSave={v => onUpdate(testimonial.id, 'quote', v)} className="text-theme-muted mb-4 italic">{testimonial.quote}</Editable>
                                <Editable as="strong" isEditMode={isEditMode} onSave={v => onUpdate(testimonial.id, 'author', v)} className="text-theme-heading font-semibold font-heading">{testimonial.author}</Editable>
                            </div>
                             {isEditMode && (
                               <button onClick={() => onDelete(testimonial.id)} className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Excluir depoimento">
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