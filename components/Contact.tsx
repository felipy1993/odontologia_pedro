import React from 'react';
import Editable from './Editable';

interface ContactProps {
    containerClass: string;
    content: string;
    isEditMode: boolean;
    onContentChange: (newValue: string) => void;
}

const Contact: React.FC<ContactProps> = ({ containerClass, content, isEditMode, onContentChange }) => {
    return (
        <section id="contato" className={`container mx-auto py-16 lg:py-24 ${containerClass}`}>
            <div className="max-w-xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-bold text-theme-heading font-heading">Contato & Localização</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                    <Editable as="p" isEditMode={isEditMode} onSave={onContentChange} className="text-theme-muted mb-6">
                        {content}
                    </Editable>
                    <div className="flex flex-col sm:flex-row gap-4 my-6">
                        <a className="w-full sm:w-auto text-center py-3 px-6 rounded-full font-semibold bg-theme-primary text-white shadow-md shadow-theme-primary/30 transition-transform hover:scale-105" href="https://wa.me/5517996682637?text=Olá%2C%20gostaria%20de%20agendar%20uma%20consulta." target="_blank" rel="noopener noreferrer">Agendar via WhatsApp</a>
                        <a className="w-full sm:w-auto text-center py-3 px-6 rounded-full font-semibold border-2 border-theme-primary text-theme-primary bg-transparent transition-colors hover:bg-theme-primary hover:text-white" href="tel:+5517996682637">(17) 9 9668-2637</a>
                    </div>
                    <div className="mt-8 border-t border-black/10 pt-8">
                        <h3 className="font-bold text-theme-heading font-heading mb-2">Endereço</h3>
                        <p className="text-theme-muted">R. Gislei Antonio Merloti, 1120 - São José, Mirassol - SP, 15130-242</p>
                        <h3 className="mt-4 font-bold text-theme-heading font-heading mb-2">Horário</h3>
                        <div className="text-theme-muted text-sm">
                            <p>Seg, Qua, Qui: 08:00–19:00</p>
                            <p>Ter, Sex: 08:00–17:00</p>
                        </div>
                    </div>
                </div>
                <div className="min-h-[300px]">
                    <div className="w-full h-full rounded-2xl border border-black/5 overflow-hidden shadow-lg">
                        <iframe
                            src="https://www.google.com/maps?q=R.+Gislei+Antonio+Merloti+1120+Mirassol+SP&output=embed"
                            width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;