import React, { useState } from 'react';
import { Theme, Layout, SocialLinks } from '../types';

interface AdminPanelProps {
    onToggleEditMode: () => void;
    isEditMode: boolean;
    theme: Theme;
    setTheme: (theme: Theme) => void;
    layout: Layout;
    setLayout: (layout: Layout) => void;
    primaryColor: string;
    setPrimaryColor: (color: string) => void;
    socialLinks: SocialLinks;
    setSocialLinks: (links: SocialLinks) => void;
    onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-5 right-5 w-14 h-14 bg-theme-heading text-white rounded-full shadow-lg flex items-center justify-center z-[99] transition-transform hover:scale-110"
                aria-label="Abrir painel de administração"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </button>
        );
    }

    return (
        <>
            <div className="fixed inset-0 bg-black/30 z-[98]" onClick={() => setIsOpen(false)}></div>
            <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-gray-800 text-white shadow-2xl z-[99] p-5 overflow-y-auto transform transition-transform translate-x-0 animate-slide-in">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold font-heading">Painel Admin</h2>
                    <button onClick={() => setIsOpen(false)} className="p-1 rounded-full text-2xl leading-none hover:bg-gray-700">&times;</button>
                </div>

                {/* Content Section */}
                <div className="section">
                    <h3 className="section-title">Conteúdo</h3>
                     <button onClick={props.onToggleEditMode} className={`admin-btn w-full ${props.isEditMode ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
                        {props.isEditMode ? '✔ Concluir Edição' : '✏️ Habilitar Edição'}
                    </button>
                </div>
                
                {/* Appearance Section */}
                <div className="section">
                    <h3 className="section-title">Aparência</h3>
                    <div className="control-group">
                        <label>Tema</label>
                        <select value={props.theme} onChange={(e) => props.setTheme(e.target.value as Theme)} className="admin-input">
                            <option value={Theme.Light}>Claro</option>
                            <option value={Theme.Dark}>Escuro</option>
                            <option value={Theme.Pastel}>Pastel</option>
                        </select>
                    </div>
                     <div className="control-group">
                        <label>Layout</label>
                        <select value={props.layout} onChange={(e) => props.setLayout(e.target.value as Layout)} className="admin-input">
                            <option value={Layout.Default}>Padrão</option>
                            <option value={Layout.Compact}>Compacto</option>
                            <option value={Layout.Wide}>Amplo</option>
                        </select>
                    </div>
                    <div className="control-group">
                        <label>Cor Primária</label>
                        <input type="color" value={props.primaryColor} onChange={(e) => props.setPrimaryColor(e.target.value)} className="admin-input h-10 p-1"/>
                    </div>
                </div>

                {/* Social Links Section */}
                <div className="section">
                    <h3 className="section-title">Redes Sociais</h3>
                    <div className="control-group">
                        <label>Instagram URL</label>
                        <input type="text" value={props.socialLinks.instagram} onChange={e => props.setSocialLinks({...props.socialLinks, instagram: e.target.value})} className="admin-input"/>
                    </div>
                     <div className="control-group">
                        <label>Facebook URL</label>
                        <input type="text" value={props.socialLinks.facebook} onChange={e => props.setSocialLinks({...props.socialLinks, facebook: e.target.value})} className="admin-input"/>
                    </div>
                </div>
                
                <div className="section">
                     <button onClick={props.onLogout} className="admin-btn w-full bg-red-600 hover:bg-red-700">
                        Sair
                    </button>
                </div>
            </div>

            {/* Fix: removed jsx attribute from style tag to prevent type error. */}
            <style>{`
                .section { margin-bottom: 2rem; }
                .section-title { font-weight: bold; font-family: 'Montserrat', sans-serif; font-size: 1.1rem; margin-bottom: 1rem; border-bottom: 1px solid #4a5568; padding-bottom: 0.5rem; color: white; }
                .control-group { margin-bottom: 1rem; }
                .control-group label { display: block; font-size: 0.9rem; margin-bottom: 0.5rem; color: #a0aec0; }
                .admin-input { width: 100%; background-color: #2d3748; color: white; border: 1px solid #4a5568; border-radius: 8px; padding: 10px 12px; font-size: 14px; transition: border-color 0.2s, box-shadow 0.2s; }
                .admin-input:focus { outline: none; border-color: #63b3ed; box-shadow: 0 0 0 2px rgba(99, 179, 237, 0.4); }
                .admin-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; color: white; padding: 12px; border-radius: 8px; font-size: 14px; font-weight: bold; border: none; cursor: pointer; transition: background-color 0.2s; margin-bottom: 8px; text-align: center; }
                @keyframes slideIn {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                .animate-slide-in { animation: slideIn 0.3s ease-out forwards; }
            `}</style>
        </>
    );
};

export default AdminPanel;