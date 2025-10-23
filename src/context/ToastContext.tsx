import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer, { ToastPosition } from 'react-bootstrap/ToastContainer';

type ToastVariant = 'dark' | 'success' | 'danger' | 'secondary';

interface ToastContextType {
    showToast: (message: string, variant?: ToastVariant, position?: ToastPosition) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within ToastProvider');
    return context;
};

interface ToastProviderProps {
    children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState<string>('');
    const [toastVariant, setToastVariant] = useState<ToastVariant>('dark');
    const [position, setPosition] = useState<ToastPosition>("top-center");
    const [autohide, setAutohide] = useState(true);
    const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const showToastWithTimeout = (message: string, variant: ToastVariant = 'dark', pos: ToastPosition = 'top-center') => {
        setToastMessage(message);
        setToastVariant(variant);
        setPosition(pos);
        setShowToast(true);
        setAutohide(true);
        if (toastTimeoutRef.current) {
            clearTimeout(toastTimeoutRef.current);
        }
        toastTimeoutRef.current = setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };

    const handleToastMouseEnter = () => {
        setAutohide(false);
        if (toastTimeoutRef.current) {
            clearTimeout(toastTimeoutRef.current);
            toastTimeoutRef.current = null;
        }
    };

    const handleToastMouseLeave = () => {
        setAutohide(true);
        toastTimeoutRef.current = setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };

    const toastContainerStyle: React.CSSProperties = {
        zIndex: 1500,
        position: 'fixed',
        left: '50%',
        transform: 'translateX(-50%)',
        ...(position.includes('bottom') ? { bottom: '1rem' } : { top: '1rem' })
    };

    return (
        <ToastContext.Provider value={{ showToast: showToastWithTimeout }}>
            {children}
            <ToastContainer className="p-3" position={position} style={toastContainerStyle}>
                <Toast
                    show={showToast}
                    onClose={() => setShowToast(false)}
                    bg={toastVariant}
                    autohide={autohide}
                    onMouseEnter={handleToastMouseEnter}
                    onMouseLeave={handleToastMouseLeave}
                >
                    <Toast.Header>
                        <strong className="me-auto">System Message</strong>
                        <small></small>
                    </Toast.Header>
                    <Toast.Body className="text-white d-flex justify-content-between align-items-center gap-3">
                        <span>{toastMessage}</span>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </ToastContext.Provider>
    );
};