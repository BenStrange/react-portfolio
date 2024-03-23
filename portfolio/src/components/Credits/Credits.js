import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  AiFillGithub,
  AiFillPicture
} from "react-icons/ai";

function Credits() {
  return (
    <Container fluid className="credit-section-header" id="credits">
      <Container className="home-content">
        <Row>
          <Col md={12}>
          <h1 className="credit-heading" style={{ marginBottom: '50px' }}>
            Credits for the Website Template Design and Images! <span className="heart" role="img" aria-label="Heart">❤️</span>
          </h1>
            </Col>
          <Col md={12} className="credit-section">
            <h1 className="heading">Template Design And Code</h1>
            <ul className="credits-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/soumyajit4419"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a> - 
                React Template Designed and Developed by Soumyajit Behera
              </li>
            </ul>
          </Col>
          <Col md={12} className="credit-section">
            <h1 className="heading">Images</h1>
            <ul className="credits-social-links">
              <li className="social-icons">
                <a
                  href="https://www.freepik.com/free-photo/white-wavy-smoke-black-background_4866374.htm#query=black%20background%20jpg&position=4&from_view=keyword&track=ais&uuid=0c6eabda-2dc4-4eb2-9950-3193e32154a9"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillPicture />
                </a> - 
                Background image by Freepik
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Credits;
