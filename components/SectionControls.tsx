import React from 'react';

interface SectionControlsProps {
    isEditMode: boolean;
    onAddItem: () => void;
    addLabel: string;
}

const SectionControls: React.FC<SectionControlsProps> = ({ isEditMode, onAddItem, addLabel }) => {
    if (!isEditMode) {
        return null;
    }

    return (
        <div className="mt-12 text-center">
            <button
                onClick={onAddItem}
                className="inline-flex items-center gap-2 py-3 px-6 rounded-full font-semibold border-2 border-dashed border-theme-primary/50 text-theme-primary bg-transparent hover:bg-theme-primary/10 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {addLabel}
            </button>
        </div>
    );
};

export default SectionControls;