import { useState } from 'react';
import { storage } from '../firebase';

interface UploadResult {
    isUploading: boolean;
    error: string | null;
    triggerUpload: (path: string) => Promise<string | null>;
}

export const useImageUploader = (): UploadResult => {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const triggerUpload = (path: string): Promise<string | null> => {
        return new Promise((resolve) => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.style.display = 'none';

            input.onchange = async (event: Event) => {
                const file = (event.target as HTMLInputElement)?.files?.[0];
                if (file) {
                    setIsUploading(true);
                    setError(null);
                    try {
                        const storageRef = storage.ref(`${path}/${Date.now()}_${file.name}`);
                        const uploadTask = await storageRef.put(file);
                        const downloadURL = await uploadTask.ref.getDownloadURL();
                        resolve(downloadURL);
                    } catch (err) {
                        console.error("Erro no upload da imagem:", err);
                        const errorMessage = err instanceof Error ? err.message : "Falha ao fazer upload da imagem.";
                        setError(errorMessage);
                        alert(errorMessage);
                        resolve(null);
                    } finally {
                        setIsUploading(false);
                    }
                } else {
                    resolve(null);
                }
                document.body.removeChild(input);
            };

            input.oncancel = () => {
                document.body.removeChild(input);
                resolve(null);
            };

            document.body.appendChild(input);
            input.click();
        });
    };

    return { isUploading, error, triggerUpload };
};
