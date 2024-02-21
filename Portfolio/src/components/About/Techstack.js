import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Col, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import * as Icons from 'react-icons/di';

function TechStack() {
  const [TechStack, setTechStack] = useState([]);

  useEffect(() => {
    getData();
}, []);

const TechStackRef = useRef(null);

const getData = async () => {
    try {
        const TechStackResponse = await axios.get('/techstack');
        setTechStack(TechStackResponse.data.results || []);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

return (
  <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
    {TechStack.map((tech) => {
      const IconComponent = Icons[tech.icon_name];
      return (
        <OverlayTrigger
          key={tech.id}
          placement="bottom"
          overlay={
            <Tooltip id={`tooltip-top-${tech.id}`}>
              {tech.description || 'No description'}
            </Tooltip>
          }
        >
          <Col xs={4} md={2} className="tech-icons">
            {IconComponent ? <IconComponent /> : <p>Icon not found</p>}
          </Col>
        </OverlayTrigger>
      );
    })}
  </Row>
);
}

export default TechStack;
