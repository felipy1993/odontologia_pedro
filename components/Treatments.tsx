import React from 'react';
import { Service } from '../types';
import Editable from './Editable';
import SectionControls from './SectionControls';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';

interface TreatmentsProps {
    services: Service[];
    containerClass: string;
    isEditMode: boolean;
    onUpdate: (id: number, field: keyof Service, value: string) => void;
    onDelete: (id: number) => void;
    onAdd: () => void;
}

const ToothIcon: React.FC = () => (
    <div className="mb-4 text-theme-primary">
        <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
        </svg>
    </div>
);


const Treatments: React.FC<TreatmentsProps> = ({ services, containerClass, isEditMode, onUpdate, onDelete, onAdd }) => {
    const { ref, isVisible } = useAnimateOnScroll({ threshold: 0.1 });

    return (
        <section id="tratamentos" className={`bg-theme-accent py-16 lg:py-24`}>
            <div className={`container mx-auto ${containerClass}`}>
                <div className="max-w-xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-bold text-theme-heading font-heading">Nossos Tratamentos</h2>
                    <p className="text-theme-muted mt-4">Oferecemos uma gama completa de tratamentos para garantir a saúde e a beleza do seu sorriso.</p>
                </div>
                <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" aria-label="Lista de tratamentos">
                    {services.map((service, index) => (
                        <div 
                            key={service.id} 
                            className={`relative group p-8 rounded-2xl bg-theme-card border border-black/5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-theme-primary/10 ${isVisible ? 'animate-reveal' : 'opacity-0'}`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <ToothIcon />
                            <Editable
                                as="h3"
                                isEditMode={isEditMode}
                                onSave={(newValue) => onUpdate(service.id, 'title', newValue)}
                                className="text-theme-heading font-bold text-lg font-heading uppercase"
                            >
                                {service.title}
                            </Editable>
                            <Editable
                                as="p"
                                isEditMode={isEditMode}
                                onSave={(newValue) => onUpdate(service.id, 'description', newValue)}
                                className="text-theme-muted mt-2 text-sm uppercase"
                            >
                                {service.description}
                            </Editable>
                            {isEditMode && (
                               <button onClick={() => onDelete(service.id)} className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Excluir tratamento">
                                    &times;
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                <SectionControls isEditMode={isEditMode} onAddItem={onAdd} addLabel="Adicionar Tratamento" />
            </div>
        </section>
    );
};

export default Treatments;