interface UploadResult {
    triggerUpload: (path: string) => Promise<string | null>;
}

export const useImageUploader = (): UploadResult => {
    /**
     * Triggers a prompt to ask the user for a Google Drive URL for an image.
     * The 'path' argument is unused but kept for compatibility with existing function calls.
     * @param path - The intended storage path (unused).
     * @returns A promise that resolves with the entered URL or null if cancelled.
     */
    const triggerUpload = (path: string): Promise<string | null> => {
        return new Promise((resolve) => {
            const url = window.prompt("Por favor, cole o link de compartilhamento do Google Drive para a imagem:");
            // Resolve with the trimmed URL if provided, otherwise resolve with null.
            if (url && url.trim() !== '') {
                resolve(url.trim());
            } else {
                resolve(null);
            }
        });
    };

    return { triggerUpload };
};
