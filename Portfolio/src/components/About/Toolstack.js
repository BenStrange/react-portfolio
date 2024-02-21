import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Col, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import * as Icons from 'react-icons/di';

function Toolstack() {
  const [Toolstack, setToolstack] = useState([]);

  useEffect(() => {
    getData();
}, []);

const ToolstackRef = useRef(null);

const getData = async () => {
    try {
        const ToolstackResponse = await axios.get('/toolstack');
        setToolstack(ToolstackResponse.data.results || []);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

return (
  <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
    {Toolstack.map((tool) => {
      const IconComponent = Icons[tool.icon_name];
      return (
        <OverlayTrigger
          key={tool.id}
          placement="bottom"
          overlay={
            <Tooltip id={`tooltip-top-${tool.id}`}>
              {tool.description || 'No description'}
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

export default Toolstack;
