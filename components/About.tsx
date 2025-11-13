import React from 'react';
import Editable from './Editable';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';

const CheckIcon = () => (
    <svg className="w-5 h-5 text-theme-primary shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);


interface AboutProps {
    containerClass: string;
    content: string;
    isEditMode: boolean;
    onContentChange: (newValue: string) => void;
}

const About: React.FC<AboutProps> = ({ containerClass, content, isEditMode, onContentChange }) => {
    const { ref, isVisible } = useAnimateOnScroll({ threshold: 0.2 });

    return (
        <section id="sobre" className={`container mx-auto py-16 lg:py-24 ${containerClass}`}>
            <div className="max-w-xl mx-auto text-center mb-12">
                 <h2 className="text-3xl font-bold text-theme-heading font-heading">Sobre a clínica</h2>
            </div>
            <div ref={ref} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-opacity duration-500 ${isVisible ? 'animate-reveal' : 'opacity-0'}`}>
                <div className="order-2 lg:order-1">
                    <Editable
                        as="p"
                        isEditMode={isEditMode}
                        onSave={onContentChange}
                        className="text-theme-muted text-lg mb-6"
                    >
                        {content}
                    </Editable>

                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <CheckIcon />
                            <span className="text-theme-text"><strong>Atendimento humanizado:</strong> Foco total no seu conforto e bem-estar.</span>
                        </li>
                         <li className="flex items-start gap-3">
                            <CheckIcon />
                             <span className="text-theme-text"><strong>Profissionais qualificados:</strong> Especialistas em clínica geral e odontopediatria.</span>
                        </li>
                         <li className="flex items-start gap-3">
                            <CheckIcon />
                            <span className="text-theme-text"><strong>Equipamentos modernos:</strong> Tecnologia de ponta para diagnósticos e tratamentos precisos.</span>
                        </li>
                    </ul>
                </div>
                 <div className="order-1 lg:order-2">
                    <div className="bg-theme-card p-6 rounded-2xl shadow-lg border border-black/5">
                        <strong className="text-lg text-theme-heading font-heading">Nossa Localização</strong>
                        <p className="text-theme-muted mt-2">R. Gislei Antonio Merloti, 1120 - São José, Mirassol - SP, 15130-242</p>
                        
                        <strong className="block mt-4 text-lg text-theme-heading font-heading">Telefone</strong>
                        <a className="text-theme-muted hover:text-theme-primary transition-colors" href="tel:+5517996682637">(17) 9 9668-2637</a>
                        
                        <strong className="block mt-4 text-lg text-theme-heading font-heading">Horário de Funcionamento</strong>
                        <div className="text-theme-muted mt-2 text-sm">
                            <p>Segunda, Quarta, Quinta: 08:00 – 19:00</p>
                            <p>Terça, Sexta: 08:00 – 17:00</p>
                            <p>Sábado/Domingo: Fechado</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;