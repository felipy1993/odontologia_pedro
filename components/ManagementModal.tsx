import React, { useState } from 'react';

export type Field = {
    name: string;
    label: string;
    type: 'text' | 'textarea';
};

interface ManagementModalProps<T> {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    fields: Field[];
    onSave: (newItem: T) => void;
}

const ManagementModal = <T extends Record<string, any>>({
    isOpen,
    onClose,
    title,
    fields,
    onSave,
}: ManagementModalProps<T>) => {
    const emptyItem = fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}) as T;
    const [newItem, setNewItem] = useState<T>(emptyItem);

    if (!isOpen) return null;

    const handleSave = () => {
        onSave(newItem);
        onClose();
    };

    const renderFormField = (field: Field) => {
        const value = newItem[field.name] || '';
        const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setNewItem({ ...newItem, [field.name]: e.target.value });
        };

        if (field.type === 'textarea') {
            return <textarea value={value} onChange={onChange} className="management-modal-input" rows={3}></textarea>;
        }
        return <input type="text" value={value} onChange={onChange} className="management-modal-input" />;
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
            <div className="bg-gray-700 p-6 rounded-2xl shadow-2xl max-w-lg w-full text-white">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">{title}</h3>
                    <button onClick={onClose} className="text-2xl">&times;</button>
                </div>
                <div>
                    <div className="space-y-3">
                        {fields.map(field => (
                            <div key={field.name}>
                                <label className="text-sm text-gray-400 mb-1 block">{field.label}</label>
                                {renderFormField(field)}
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-3 mt-4">
                        <button onClick={onClose} className="flex-1 py-2 px-4 rounded-xl font-semibold border border-gray-500 text-white">Cancelar</button>
                        <button onClick={handleSave} className="flex-1 py-2 px-4 rounded-xl font-semibold bg-blue-500 text-white">Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagementModal;