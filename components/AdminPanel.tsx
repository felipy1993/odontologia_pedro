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
    heroTitleFontSize: number;
    setHeroTitleFontSize: (size: number) => void;
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
                <div className="admin-panel-section">
                    <h3 className="admin-panel-section-title">Conteúdo</h3>
                     <button onClick={props.onToggleEditMode} className={`admin-panel-btn w-full ${props.isEditMode ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
                        {props.isEditMode ? '✔ Concluir Edição' : '✏️ Habilitar Edição'}
                    </button>
                </div>
                
                {/* Appearance Section */}
                <div className="admin-panel-section">
                    <h3 className="admin-panel-section-title">Aparência</h3>
                    <div className="admin-panel-control-group">
                        <label>Tema</label>
                        <select value={props.theme} onChange={(e) => props.setTheme(e.target.value as Theme)} className="admin-panel-input">
                            <option value={Theme.Light}>Claro</option>
                            <option value={Theme.Dark}>Escuro</option>
                            <option value={Theme.Pastel}>Pastel</option>
                        </select>
                    </div>
                     <div className="admin-panel-control-group">
                        <label>Layout</label>
                        <select value={props.layout} onChange={(e) => props.setLayout(e.target.value as Layout)} className="admin-panel-input">
                            <option value={Layout.Default}>Padrão</option>
                            <option value={Layout.Compact}>Compacto</option>
                            <option value={Layout.Wide}>Amplo</option>
                        </select>
                    </div>
                    <div className="admin-panel-control-group">
                        <label>Tamanho do Título (px)</label>
                        <input
                            type="number"
                            value={props.heroTitleFontSize}
                            onChange={(e) => props.setHeroTitleFontSize(Number(e.target.value))}
                            className="admin-panel-input"
                            placeholder="ex: 96"
                        />
                    </div>
                    <div className="admin-panel-control-group">
                        <label>Cor Primária</label>
                        <input type="color" value={props.primaryColor} onChange={(e) => props.setPrimaryColor(e.target.value)} className="admin-panel-input h-10 p-1"/>
                    </div>
                </div>

                {/* Social Links Section */}
                <div className="admin-panel-section">
                    <h3 className="admin-panel-section-title">Redes Sociais</h3>
                    <div className="admin-panel-control-group">
                        <label>Instagram URL</label>
                        <input type="text" value={props.socialLinks.instagram} onChange={e => props.setSocialLinks({...props.socialLinks, instagram: e.target.value})} className="admin-panel-input"/>
                    </div>
                     <div className="admin-panel-control-group">
                        <label>Facebook URL</label>
                        <input type="text" value={props.socialLinks.facebook} onChange={e => props.setSocialLinks({...props.socialLinks, facebook: e.target.value})} className="admin-panel-input"/>
                    </div>
                </div>
                
                <div className="admin-panel-section">
                     <button onClick={props.onLogout} className="admin-panel-btn w-full bg-red-600 hover:bg-red-700">
                        Sair
                    </button>
                </div>
            </div>
        </>
    );
};

export default AdminPanel;