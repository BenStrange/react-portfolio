import axios from 'axios';
import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./PortfolioCards";
import Particle from "../Particle";

function Portfolio() {
    const [portfolio, setPortfolio] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const portfolioRef = useRef(null);

    const getData = async () => {
        try {
            const portfolioResponse = await axios.get(`${process.env.REACT_APP_DJANGO_API_URL}/portfolio/`);
            setPortfolio(portfolioResponse.data.results || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <Container fluid className="project-section" ref={portfolioRef}>
            <Particle />
            <Container>
                <h1 className="project-heading">
                    My Recent <strong className="purple">Works</strong>
                </h1>
                <p style={{ color: "white" }}>
                    Here are a few projects I've worked on recently.
                </p>
                <div ref={portfolioRef}>
                    <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
                        {portfolio && portfolio.map(proj => (
                            <Col md={4} className="project-card" key={proj.id}>
                                <ProjectCard
                                    imgPath={proj.image}
                                    isBlog={false}
                                    title={proj.title}
                                    description={proj.description}
                                    ghLink={proj.url}
                                />
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>
        </Container>
    );
}

export default Portfolio;