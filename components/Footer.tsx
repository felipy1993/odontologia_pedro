import React from 'react';
import { SocialLinks } from '../types';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';

interface FooterProps {
    onAdminClick: () => void;
    socialLinks: SocialLinks;
    containerClass: string;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick, socialLinks, containerClass }) => {
    const { ref, isVisible } = useAnimateOnScroll({ threshold: 0.1 });

    return (
        <footer ref={ref} className={`bg-theme-accent border-t border-black/5 transition-opacity duration-500 ${isVisible ? 'animate-reveal' : 'opacity-0'}`}>
            <div className={`container mx-auto ${containerClass}`}>
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Column 1: About */}
                    <div className="md:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-theme-primary to-theme-secondary flex items-center justify-center text-white font-bold text-lg">OP</div>
                            <div className="font-bold text-theme-heading font-heading">Odontologia Pedro</div>
                        </div>
                        <p className="text-sm text-theme-muted">Cuidado odontológico completo com tecnologia e atendimento humanizado em Mirassol, SP.</p>
                    </div>

                    {/* Column 2: Navigation */}
                    <div>
                        <h4 className="font-bold text-theme-heading font-heading mb-4">Navegação</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#sobre" className="text-theme-muted hover:text-theme-primary">Sobre</a></li>
                            <li><a href="#tratamentos" className="text-theme-muted hover:text-theme-primary">Tratamentos</a></li>
                            <li><a href="#equipe" className="text-theme-muted hover:text-theme-primary">Equipe</a></li>
                            <li><a href="#contato" className="text-theme-muted hover:text-theme-primary">Contato</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div>
                        <h4 className="font-bold text-theme-heading font-heading mb-4">Contato</h4>
                        <ul className="space-y-2 text-sm text-theme-muted">
                            <li>R. Gislei A. Merloti, 1120</li>
                            <li>Mirassol - SP, 15130-242</li>
                            <li><a href="tel:+5517996682637" className="hover:text-theme-primary">(17) 9 9668-2637</a></li>
                        </ul>
                    </div>

                     {/* Column 4: Social */}
                    <div>
                        <h4 className="font-bold text-theme-heading font-heading mb-4">Redes Sociais</h4>
                         <div className="flex gap-4">
                            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-theme-muted hover:text-theme-primary">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"></path></svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="py-6 border-t border-black/10 flex flex-col sm:flex-row justify-between items-center text-sm text-theme-muted">
                    <p>© {new Date().getFullYear()} Odontologia Pedro — Todos os direitos reservados.</p>
                    <button className="underline hover:text-theme-primary mt-2 sm:mt-0" onClick={onAdminClick}>Admin</button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;