// pages/AdminPage.tsx
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import axios from 'axios';

const AdminPage: React.FC = () => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVariant, setToastVariant] = useState<'success' | 'danger'>('success');

    const handleGetReports = async () => {
        try {
            const response = await axios.get('/api/admin/reports');
            setToastMessage(`Reports: ${JSON.stringify(response.data)}`);
            setToastVariant('success');
            setShowToast(true);
        } catch (error) {
            console.error('Error fetching reports:', error);
            setToastMessage('Failed to fetch reports');
            setToastVariant('danger');
            setShowToast(true);
        }
    };

    return (
        <Container className="p-4 text-center">
            <Card>
                <Card.Body>
                    <h1 className="text-3xl font-bold text-green-700">Admin Dashboard</h1>
                    <p className="mt-2">Welcome, admin! You have full access.</p>
                    <Button onClick={handleGetReports} variant="primary" className="mt-3">
                        Get Reports
                    </Button>
                </Card.Body>
            </Card>
            <ToastContainer position="top-end" className="p-3">
                <Toast show={showToast} onClose={() => setShowToast(false)} delay={5000} autohide bg={toastVariant}>
                    <Toast.Header>
                        <strong className="me-auto">Admin Reports</strong>
                    </Toast.Header>
                    <Toast.Body className={toastVariant === 'danger' ? 'text-white' : ''}>
                        {toastMessage}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    );
};

export default AdminPage;
