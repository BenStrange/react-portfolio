import React, { useState, useEffect } from "react";
import axios from 'axios';
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  const [aboutSections, setAboutSections] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
          const response = await axios.get(`${process.env.REACT_APP_DJANGO_API_URL}/about/`); // Ensure the URL matches your API endpoint
          setAboutSections(response.data.results || []); // Adjust according to your response structure
      } catch (error) {
          console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  console.log("aboutSections", aboutSections);

  return (
    aboutSections.length > 0 && (
      <Card className="quote-card-view">
        {aboutSections.map((about, index) => (
          <Card.Body key={index}>
            <blockquote className="blockquote mb-0">
              <p style={{ textAlign: "justify" }}>
                {about.description}
                <br />
                <br />
                <br />
                Apart from coding, some other activities that I love to do!
              </p>
              <ul>
              {about.hobbies.split("\r\n").map((hobby, hobbyIndex) => (
                  <li key={hobbyIndex} className="about-activity">
                    <ImPointRight /> {hobby}
                  </li>
                ))}
              </ul>
            </blockquote>
          </Card.Body>
        ))}
      </Card>
    )
  );
}

export default AboutCard;
