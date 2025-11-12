import React, { useState } from 'react';
import { Dentist } from '../types';
import Editable from './Editable';
import SectionControls from './SectionControls';
import { transformGoogleDriveLink } from '../utils';
import { useImageUploader } from '../hooks/useImageUploader';
import LoadingSpinner from './LoadingSpinner';

interface TeamProps {
    dentists: Dentist[];
    containerClass: string;
    isEditMode: boolean;
    onUpdate: (id: number, field: keyof Dentist, value: string) => void;
    onDelete: (id: number) => void;
    onAdd: () => void;
    onAvatarChange: (id: number, newSrc: string) => void;
}

const Team: React.FC<TeamProps> = ({ dentists, containerClass, isEditMode, onUpdate, onDelete, onAdd, onAvatarChange }) => {
    const { isUploading, triggerUpload } = useImageUploader();
    const [uploadingAvatarId, setUploadingAvatarId] = useState<number | null>(null);

    const handleAvatarClick = async (id: number) => {
        if (!isEditMode || isUploading) return;
        setUploadingAvatarId(id);
        const downloadURL = await triggerUpload('images/team');
        if (downloadURL) {
            onAvatarChange(id, downloadURL);
        }
        setUploadingAvatarId(null);
    };

    const renderDescription = (text: string) => {
        if (!text) return null;
        return text.split('\n').map((line, index) => {
            const parts = line.split(':');
            if (parts.length > 1) {
                const label = parts[0];
                const value = parts.slice(1).join(':');
                return (
                    <p key={index} className="text-theme-text mt-3">
                        <strong className="font-semibold text-theme-heading">{label}:</strong>
                        <span className="text-theme-muted"> {value}</span>
                    </p>
                );
            }
            return <p key={index} className="text-theme-muted mt-3">{line}</p>;
        });
    };

    return (
        <section id="equipe" className={`container mx-auto py-16 lg:py-24 ${containerClass}`}>
            <div className="max-w-xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-theme-heading font-heading">Nossa Equipe</h2>
                <div className="mt-4 mx-auto w-24 h-1 bg-theme-secondary"></div>
            </div>
            
            <div className="flex flex-col gap-16 lg:gap-24">
                {dentists.map((dentist) => {
                    const [specialty, cro] = dentist.specialty ? dentist.specialty.split('—').map(s => s.trim()) : ['', ''];

                    return (
                        <div key={dentist.id} className="relative group grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
                            {/* Left Col: Image */}
                            <div className="md:col-span-1">
                                <div 
                                    className={`relative w-full aspect-[4/5] rounded-lg bg-theme-accent p-2 border-4 border-theme-secondary/40 shadow-xl ${isEditMode ? 'cursor-pointer' : ''}`}
                                    onClick={() => handleAvatarClick(dentist.id)}
                                >
                                    <div className="relative w-full h-full rounded-md overflow-hidden">
                                        {isUploading && uploadingAvatarId === dentist.id && (
                                            <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
                                                <LoadingSpinner size="md" />
                                            </div>
                                        )}
                                        {dentist.avatar ? (
                                            <img src={transformGoogleDriveLink(dentist.avatar)} alt={dentist.name} className="w-full h-full object-cover" loading="lazy" />
                                        ) : (
                                            <div className="w-full h-full bg-theme-accent flex items-center justify-center">
                                                <span className="text-theme-primary text-4xl font-bold">{dentist.initials}</span>
                                            </div>
                                        )}
                                        {isEditMode && !isUploading && (
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" />
                                            </svg>
                                                <span className="sr-only">Alterar Imagem</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Col: Info */}
                            <div className="md:col-span-2">
                                <Editable as="h3" isEditMode={isEditMode} onSave={v => onUpdate(dentist.id, 'name', v)} className="text-3xl lg:text-4xl font-bold text-theme-heading font-heading">{dentist.name}</Editable>

                                <div
                                    contentEditable={isEditMode}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => onUpdate(dentist.id, 'specialty', e.currentTarget.innerText)}
                                    className={`mt-2 ${isEditMode ? 'outline-2 outline-dashed outline-theme-primary rounded p-1' : ''}`}
                                >
                                    {isEditMode ? dentist.specialty : (
                                        <>
                                            <p className="text-theme-secondary text-xl font-medium">{specialty}</p>
                                            <p className="text-theme-muted text-sm mt-1">{cro}</p>
                                        </>
                                    )}
                                </div>
                                
                                <div className="mt-8">
                                     <div
                                        contentEditable={isEditMode}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => onUpdate(dentist.id, 'description', e.currentTarget.innerText)}
                                        className={isEditMode ? 'outline-2 outline-dashed outline-theme-primary rounded p-1 whitespace-pre-wrap' : ''}
                                    >
                                        {isEditMode ? dentist.description : renderDescription(dentist.description)}
                                    </div>
                                </div>
                            </div>
                            
                            {isEditMode && (
                            <button onClick={() => onDelete(dentist.id)} className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 text-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Excluir dentista">
                                    &times;
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
            <SectionControls isEditMode={isEditMode} onAddItem={onAdd} addLabel="Adicionar Profissional" />
        </section>
    );
};

export default Team;