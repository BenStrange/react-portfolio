import React from "react";
import { Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import Particle from "../Particle";
import Github from "./Github";
import SkillSet from "./SkillSet";
import Aboutcard from "./AboutCard";
import Toolstack from "./Toolstack";
import rhosImg from "../../Assets/rhos_on_sea.jpg";

function About() {
  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col md={7}>
            <h1 className="heading">Who am I?</h1>
            <Aboutcard />
          </Col>
          <Col style={{ padding:'2px', zIndex:'2', position:'relative'}}>
            <a href="https://maps.app.goo.gl/w9u6zRRjqSxyNKu19" target="_blank" rel="noopener noreferrer">
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="tooltip-rhos">Click to view location</Tooltip>}
            >
            <img src={rhosImg} alt="From Rhos on Sea" className="img-fluid" />
            </OverlayTrigger>
            </a>
          </Col>
        </Row>
        <Row>
          <h1 className="project-heading">Professional Skillset</h1>
          <SkillSet />
        </Row>
        <Row>
          <h1 className="project-heading">Tools I use</h1>
          <Toolstack />
        </Row>
        <Github />
      </Container>
    </Container>
  );
}

export default About;
