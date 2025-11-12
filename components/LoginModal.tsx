import React, { useState, useEffect, useRef } from 'react';

interface LoginModalProps {
    onLogin: (email: string, pass: string) => void;
    onCancel: () => void;
    error: string | null;
}

const LoginModal: React.FC<LoginModalProps> = ({ onLogin, onCancel, error }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const modalRef = useRef<HTMLDivElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(email, password);
    };

    useEffect(() => {
        const modal = modalRef.current;
        if (!modal) return;

        const focusableElements = modal.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        firstElement?.focus();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onCancel();
            }
            if (e.key === 'Tab') {
                if (e.shiftKey) { // Shift + Tab
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement?.focus();
                    }
                } else { // Tab
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement?.focus();
                    }
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onCancel]);


    return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 animate-fade-in">
            <div ref={modalRef} className="bg-theme-bg p-8 rounded-2xl shadow-2xl max-w-sm w-full">
                <h3 className="text-xl font-bold text-theme-heading mb-6 text-center font-heading">Login Administrativo</h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail"
                        className="w-full p-3 rounded-lg border border-theme-muted/50 bg-theme-accent text-theme-text placeholder-theme-muted focus:ring-2 focus:ring-theme-primary focus:outline-none"
                        aria-label="E-mail de login"
                        autoComplete="email"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Senha"
                        className="w-full p-3 rounded-lg border border-theme-muted/50 bg-theme-accent text-theme-text placeholder-theme-muted focus:ring-2 focus:ring-theme-primary focus:outline-none"
                        aria-label="Senha"
                        autoComplete="current-password"
                    />
                    {error && <p className="text-red-500 text-sm text-center -mb-2">{error}</p>}
                    <div className="flex gap-3 mt-4">
                         <button type="button" onClick={onCancel} className="flex-1 py-2 px-4 rounded-full font-semibold border-2 border-theme-muted/50 text-theme-muted hover:bg-theme-muted/10">
                            Cancelar
                        </button>
                        <button type="submit" className="flex-1 py-2 px-4 rounded-full font-semibold bg-theme-primary text-white hover:opacity-90">
                            Entrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;