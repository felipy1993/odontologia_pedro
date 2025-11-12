import React from 'react';

interface LoadingSpinnerProps {
    fullScreen?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ fullScreen = false, size = 'md' }) => {
    const sizeMap = {
        sm: 'h-6 w-6',
        md: 'h-12 w-12',
        lg: 'h-24 w-24',
    };

    const spinner = (
        <div className={`animate-spin rounded-full border-4 border-theme-muted border-t-theme-primary ${sizeMap[size]}`}></div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-theme-bg/80 z-[200] flex items-center justify-center">
                {spinner}
            </div>
        );
    }

    return spinner;
};

export default LoadingSpinner;
