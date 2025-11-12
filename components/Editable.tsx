import React from 'react';

interface EditableProps {
    isEditMode: boolean;
    onSave: (newValue: string) => void;
    children: string;
    as?: React.ElementType;
    className?: string;
    style?: React.CSSProperties;
}

const Editable: React.FC<EditableProps> = ({ isEditMode, onSave, children, as = 'div', className, style }) => {
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
            style={style}
        >
            {children}
        </Tag>
    );
};

export default Editable;