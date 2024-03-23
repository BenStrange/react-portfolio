import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Button, Card, Modal } from 'react-bootstrap';
import { fetchData, updateData, deleteData, fetchOptions, postData } from '../apiService';
import DynamicForm from './DynamicForm';
import LoginForm from '../LoginForm/LoginForm';
import useAuth from '../../hooks/useAuth';

function AdminPage() {
    const { authToken, login, logout } = useAuth();
    const isAuthenticated = !!authToken;
    const [endpoints, setEndpoints] = useState({});
    const [currentEndpoint, setCurrentEndpoint] = useState('');
    const [endpointData, setEndpointData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [notification, setNotification] = useState('');
    const [formOptions, setFormOptions] = useState(null);


    useEffect(() => {
        if (isAuthenticated) {
            fetchEndpoints();
        }
    }, [isAuthenticated]);

    const handleResponse = (success, message) => {
        setNotification(message);
        setTimeout(() => {
            setNotification('');
            if (success) {
                setShowModal(false);
                fetchEndpointData(currentEndpoint);
            }
        }, 3000);
    };

    const fetchEndpoints = async () => {
        try {
            const data = await fetchData();
            setEndpoints(data);
        } catch (error) {
            console.error("Failed to fetch endpoints:", error);
            setEndpoints({});
        }
    };

    const fetchEndpointData = useCallback(async (endpointKey) => {
        try {
            const data = await fetchData(endpointKey || currentEndpoint);
            const newEndpointData = data.results || [];
            setEndpointData(newEndpointData);
        } catch (error) {
            console.error(`Error fetching data for ${endpointKey || currentEndpoint}:`, error);
            setEndpointData([]);
        }
    }, [currentEndpoint]);

    useEffect(() => {
        if (currentEndpoint) {
            fetchEndpointData(currentEndpoint);
        }
    }, [currentEndpoint, fetchEndpointData]);
    

    const handleEndpointSelect = async (endpointKey) => {
        setCurrentEndpoint(endpointKey);
        // Removed direct fetchData call. useEffect will handle fetching.
    };
    

    const handleCardClick = (item) => {
        setSelectedItem(item);
        setIsNew(false);
        setShowModal(true);
    };

    const handleNewClick = async () => {
        setIsNew(true);
        try {
            const formStructure = await fetchOptions(currentEndpoint);
            setFormOptions(formStructure);
            setShowModal(true);
        } catch (error) {
            console.error("Failed to fetch form structure:", error);
        }
    };

    const handleSave = async (id, data) => {
        try {
            await updateData(currentEndpoint, id, data);
            handleResponse(true, 'Data saved successfully!');
        } catch (error) {
            console.error("Error saving data:", error);
            handleResponse(false, 'An error occurred while saving. Please try again.');
        }
    };

    const handleSubmit = async (data) => {
        try {
            const response = await postData(currentEndpoint, data);
            if (response.status >= 200 && response.status < 300) {
                handleResponse(true, 'Item created successfully!');
            } else {
                throw new Error('Failed to create item');
            }
        } catch (error) {
            console.error("Error creating item:", error);
            handleResponse(false, 'An error occurred while creating the item. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        if (endpointData) {
            try {
                await deleteData(currentEndpoint, id);
                handleResponse(true, 'Item deleted successfully');
            } catch (error) {
                console.error("Error deleting data:", error);
                handleResponse(false, 'An error occurred while deleting. Please try again.');
            }
        }
    };

    if (!isAuthenticated) {
        return <LoginForm onLogin={login} />;
    }

    return (
        <Container fluid className="about-section">
            <Row style={{ justifyContent: "center", padding: "10px" }}>
                <Col>
                    <h2>Admin Interface</h2>
                    {Object.entries(endpoints).map(([key]) => (
                        <Button key={key} onClick={() => handleEndpointSelect(key)} className="m-2">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Button>
                    ))}
                    <Button onClick={logout} className="m-2">Logout</Button>
                </Col>
            </Row>
            {currentEndpoint && (
                <Button onClick={handleNewClick} className="m-2">Add New</Button>
            )}
            <Row>
                {Array.isArray(endpointData) && endpointData.map((item, index) => { // Check that endpointData is truthy and use .map()
                    const itemEntries = Object.entries(item);
                    const [, [titleKey, titleValue]] = itemEntries;
                    return (
                        <Col key={index} md={4} lg={3}>
                            <Card onClick={() => handleCardClick(item)}>
                                <Card.Body className="adminForm">
                                    <Card.Title>{titleKey.charAt(0).toUpperCase() + titleKey.slice(1)}: {titleValue}</Card.Title>
                                    <Card.Text>{typeof titleValue === 'string' ? titleValue.charAt(0).toUpperCase() + titleValue.slice(1) : titleValue}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isNew ? 'Create New' : 'Edit Item'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DynamicForm
                        endpointData={isNew ? formOptions : [selectedItem]}
                        onSave={isNew ? handleSubmit : handleSave}
                        onDelete={handleDelete}
                        isNew={isNew}
                    />
                </Modal.Body>
                {notification && (
                    <Modal.Footer style={{ justifyContent: "center" }}>
                        <div style={{ textAlign: "center" }}>{notification}</div>
                    </Modal.Footer>)}
            </Modal>
        </Container>
    );
}

export default AdminPage;