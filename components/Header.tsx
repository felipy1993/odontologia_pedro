import React, { useState } from 'react';

interface HeaderProps {
    containerClass: string;
}

const NavLink: React.FC<{ href: string; children: React.ReactNode; onClick?: () => void }> = ({ href, children, onClick }) => (
    <li>
        <a href={href} onClick={onClick} className="block py-2 px-3 text-theme-heading hover:text-theme-primary transition-colors duration-200">
            {children}
        </a>
    </li>
);

const Header: React.FC<HeaderProps> = ({ containerClass }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: '#sobre', label: 'Sobre' },
        { href: '#tratamentos', label: 'Tratamentos' },
        { href: '#equipe', label: 'Equipe' },
        { href: '#depoimentos', label: 'Depoimentos' },
        { href: '#galeria', label: 'Galeria' },
        { href: '#contato', label: 'Contato' },
    ];

    return (
        <header className="sticky top-0 z-50 backdrop-blur-lg bg-theme-bg/90 border-b border-black/5 shadow-sm">
            <div className={`container mx-auto ${containerClass}`}>
                <div className="flex items-center justify-between py-4">
                    <a href="#" className="flex items-center gap-3" aria-label="Página inicial da Odontologia Pedro">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-theme-primary to-theme-secondary flex items-center justify-center text-white font-bold text-lg">
                            OP
                        </div>
                        <div>
                            <h1 className="font-bold text-base text-theme-heading font-heading">Odontologia Pedro</h1>
                        </div>
                    </a>

                    <nav className="hidden lg:block">
                        <ul className="flex items-center gap-2">
                           {navLinks.map(link => <NavLink key={link.href} href={link.href}>{link.label}</NavLink>)}
                        </ul>
                    </nav>

                    <div className="flex items-center gap-2">
                        <a 
                            className="hidden sm:block py-2 px-5 rounded-full font-semibold bg-theme-primary text-white shadow-md shadow-theme-primary/20 transition-transform hover:scale-105" 
                            href="https://wa.me/5517996682637?text=Olá%2C%20gostaria%20de%20agendar%20uma%20consulta." 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            Agendar Consulta
                        </a>
                        <button 
                            className="lg:hidden p-2 rounded-md text-theme-heading hover:bg-theme-accent"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Abrir menu"
                            aria-expanded={isMenuOpen}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path></svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-theme-bg/95 backdrop-blur-lg absolute top-full left-0 w-full border-t border-black/5">
                    <div className={`container mx-auto ${containerClass} py-4`}>
                        <nav>
                            <ul className="flex flex-col items-center gap-2">
                               {navLinks.map(link => <NavLink key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)}>{link.label}</NavLink>)}
                            </ul>
                             <a 
                                className="block w-full mt-4 text-center py-2 px-5 rounded-full font-semibold bg-theme-primary text-white shadow-md shadow-theme-primary/20" 
                                href="https://wa.me/5517996682637?text=Olá%2C%20gostaria%20de%20agendar%20uma%20consulta." 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                Agendar Consulta
                            </a>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;