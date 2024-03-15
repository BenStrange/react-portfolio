import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PortfolioCard from "./PortfolioCards";
import Particle from "../Particle";
import projects from "./PortfolioData";


function PortfolioComponent() {
    return (
        <Container fluid className="project-section">
            <Particle />
            <Container>
                <h1 className="project-heading">
                    My Recent Stuff
                </h1>
                <p style={{ color: "white" }}>
                    Here are a few projects I've worked on recently.
                </p>
                <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
                    {projects.map((project, index) => (
                        <Col key={index} md={4} className="project-card">
                            <PortfolioCard
                                imgPath={project.image}
                                isBlog={false}
                                title={project.title}
                                description={project.description}
                                ghLink={project.githubLink}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </Container>
    );
}

export default PortfolioComponent;
