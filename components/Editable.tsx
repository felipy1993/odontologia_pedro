import React from 'react';

interface EditableProps {
    isEditMode: boolean;
    onSave: (newValue: string) => void;
    children: string;
    // Fix: Use React.ElementType instead of JSX.IntrinsicElements to avoid namespace issues.
    as?: React.ElementType;
    className?: string;
}

const Editable: React.FC<EditableProps> = ({ isEditMode, onSave, children, as = 'div', className }) => {
    const Tag = as;
    
    const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
        const newValue = e.currentTarget.textContent || '';
        if (newValue !== children) {
            onSave(newValue);
        }
    };

    return (
        <Tag
            contentEditable={isEditMode}
            suppressContentEditableWarning={true}
            onBlur={handleBlur}
            className={className}
        >
            {children}
        </Tag>
    );
};

export default Editable;