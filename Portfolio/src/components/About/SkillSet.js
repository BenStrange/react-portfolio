import React from "react";
import { Col, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import { DiReact, DiNodejs, DiPython, DiGit, DiDjango} from "react-icons/di";
import { AiOutlineConsoleSql } from "react-icons/ai";

function TechStackComponent() {
    const techStack = [
        { Icon: AiOutlineConsoleSql , name: "SQL", experience: "8 Years - SQL" },
        { Icon: DiPython, name: "Python", experience: "3 Years - Python" },
        { Icon: DiGit, name: "Git", experience: "3 Years" },
        { Icon: DiDjango, name: "Django", experience: "1 Year - Django" },
        { Icon: DiNodejs, name: "Node.js", experience: "1 Month - Node.js" },
        { Icon: DiReact, name: "React", experience: "1 Month - React" },

    ];

    return (
        <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
            {techStack.map((tech, index) => (
                <OverlayTrigger
                    key={index}
                    placement="bottom"
                    overlay={<Tooltip id={`tooltip-${index}`}>{tech.experience}</Tooltip>}
                >
                    <Col xs={4} md={2} className="tech-icons">
                        <tech.Icon />
                    </Col>
                </OverlayTrigger>
            ))}
        </Row>
    );
}

export default TechStackComponent;
