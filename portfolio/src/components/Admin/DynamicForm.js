import React, { useState, useEffect } from 'react';
import { Button, Form, Card, Container, Row, Col } from 'react-bootstrap';

const DynamicForm = ({ endpointData, onSave, onDelete, isNew }) => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    if (isNew) {
      if (endpointData) {
        const initialFormData = Object.keys(endpointData).reduce((acc, key) => {
          const fieldInfo = endpointData[key];
          if (!fieldInfo.read_only) {
            acc[key] = '';
          }

          return acc;
        }, {});

        setFormData([initialFormData]);
      }
    } else {
      setFormData(endpointData || []);
    }
  }, [endpointData, isNew]);

  const handleChange = (index, name, value) => {
    const updatedFormData = formData.map((item, i) => {
      if (i === index) {
        return { ...item, [name]: value };
      }
      return item;
    });
    setFormData(updatedFormData);
  };

  const handleEdit = (e, id, itemData) => {
    e.preventDefault();
    if (isNew) {
      onSave(itemData);
    } else {
      onSave(id, itemData);
    }
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    onDelete(id);
  };


  const handleFileChange = (index, key, file) => {
    const updatedFormData = [...formData];
    updatedFormData[index][key] = file;
    setFormData(updatedFormData);
  };


  return (
    <Container style={{ marginTop: "20px" }}>
      <Row className="g-4">
        {formData.map((item, index) => (
          <Col key={index}>
            <Card className="h-100">
              <Card.Body>
                <Form>
                  {Object.entries(item).map(([key, value]) => {
                    if (key !== 'id') {
                      if (endpointData[key] && endpointData[key].type === 'image upload') {
                        return (
                          <Form.Group key={key} className="mb-2">
                            <Form.Label className="adminForm">{endpointData[key].label}</Form.Label>
                            <Form.Control
                              type="file"
                              name={key}
                              onChange={(e) => handleFileChange(index, key, e.target.files[0])}
                            />
                          </Form.Group>
                        );
                      } else {
                        return (
                          <Form.Group key={key} className="mb-2">
                            <Form.Label className="adminForm">{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
                            <Form.Control
                              type="text"
                              name={key}
                              value={value}
                              onChange={(e) => handleChange(index, key, e.target.value)}
                            />
                          </Form.Group>
                        );
                      }
                    }
                    return null;
                  })}
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={(e) => handleEdit(e, item.id, formData[index])}
                  >
                    Save Changes
                  </Button>
                  {!isNew && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={(e) => handleDelete(e, item.id)}
                    >
                      Delete
                    </Button>
                  )}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DynamicForm;