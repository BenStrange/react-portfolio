import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import ExperienceCounter from '../ExperienceCounter';

function Home2() {
  const socialLinks = [
    { href: "https://github.com/BenStrange", icon: <AiFillGithub />, ariaLabel: "GitHub" },
    { href: "https://www.linkedin.com/in/ben-strange-227bab137/", icon: <FaLinkedinIn />, ariaLabel: "LinkedIn" },
  ];

  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row className="about-content">
          <Col md={8} className="home-about-description">
            <h1>LET ME INTRODUCE MYSELF</h1>
            <br />
            <ExperienceCounter />
            <strong>YEARS OF IT EXPERIENCE AND COUNTING</strong>
            <p className="home-about-body">
              I'm a self-developed, highly motivated individual with a passion for learning and signigicant (ever increasing) experience in the IT industry. My primary focus was around data, but now I seek to expand my knowledge and experience in full stack software development.
              <br /><br />
              I am fluent in classics like <em>Python, SQL and a smidge of C#</em> and my
              techstack enviroment involves <em>ClickHouse, Postgres, AWS, Kubernetes, Rancher and Prefect</em> (for the data orchestration side of things). 
              I have also worked with <em>QuickSight, Preset</em> for data visualisation and reporting.
              Currently, I am expanding my expertise into <em>React & Django</em> and built this website to demo my skills and have some fun!
              <br /><br />
              Whenever possible, I love to learn new technologies and share my knowledge with others. 
              I am a firm believer in the power of community and open source.
            </p>
          </Col>
          <Col md={4} className="my-avatar">
            <Tilt>
              <img src={myImg} alt="avatar" className="img-fluid" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <p>Feel free to <strong>connect</strong> with me</p>
            <ul className="social-links">
              {socialLinks.map((link, index) => (
                <li key={index} className="social-icons">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="icon-colour home-social-icons"
                    aria-label={link.ariaLabel}
                  >
                    {link.icon}
                  </a>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home2;
