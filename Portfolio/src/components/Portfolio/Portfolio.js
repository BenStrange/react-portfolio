import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./PortfolioCards";
import Particle from "../Particle";
import { fetchData } from '../../components/apiService';

function PortfolioComponent() {
    const [portfolio, setPortfolio] = useState([]);

    useEffect(() => {
        const loadPortfolio = async () => {
            try {
                const data = await fetchData('Portfolio');
                setPortfolio(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Failed to fetch Portfolio:", error);
            }
        };

        loadPortfolio();
    }, []);

    return (
        <Container fluid className="project-section">
            <Particle />
            <Container>
                <h1 className="project-heading">
                    My Recent <strong className="purple">Works</strong>
                </h1>
                <p style={{ color: "white" }}>
                    Here are a few projects I've worked on recently.
                </p>
                <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
                    {portfolio.map(proj => (
                        <Col md={4} className="project-card" key={proj.id}>
                            <ProjectCard
                                imgPath={proj.image}
                                isBlog={false} // Assuming all projects are not blogs
                                title={proj.title}
                                description={proj.description}
                                ghLink={proj.githubLink} // Update to your project property names
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </Container>
    );
}

export default PortfolioComponent;
