import React, { useEffect } from 'react';

interface UndoToastProps {
    message: string;
    onUndo: () => void;
    onClose: () => void;
}

const UndoToast: React.FC<UndoToastProps> = ({ message, onUndo, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 7000); // Auto-dismiss after 7 seconds

        return () => clearTimeout(timer);
    }, [onClose]);

    const handleUndoClick = () => {
        onUndo();
        onClose(); // Immediately close the toast on undo
    };

    return (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[101] bg-gray-800 text-white py-3 px-5 rounded-lg shadow-lg flex items-center gap-4 animate-fade-in-up">
            <span className="text-sm">{message}</span>
            <button
                onClick={handleUndoClick}
                className="font-bold text-sm text-blue-400 hover:text-blue-300 uppercase tracking-wider"
            >
                Desfazer
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-xl leading-none">&times;</button>
             <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translate(-50%, 20px); }
                    to { opacity: 1; transform: translate(-50%, 0); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default UndoToast;
