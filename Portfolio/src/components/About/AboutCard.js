import React from "react";
import Card from "react-bootstrap/Card";

function AboutComponent() {
  return (
      <Card className="quote-card-view">
          <Card.Body>
            <p style={{ textAlign: "center" }}>
              Hello, I'm Ben Strange. Yes, closely related to Dr. Strange. 😉
              I've been working in IT for over 8 years, starting as a 1st Line Technician before progressing to a 2nd Line Technician,
              Data & Infrastructure Engineer, and now, I'm currently a Data Analyst/Engineer. 
              I'm incredibly passionate about learning and developing new skills, as I'm always looking for the next challenge.
              (This website is a prime example), and I'm also currently six months into an MSc in Computer Science & Software Engineering 🎓.
              <br /> <br />
              I live in the lovely rural village of Llanddulas in North Wales, and I love to spend my free time walking and taking in the scenery.
              My hobbies include Airsoft (much like paintball but with more realistic weapons and scenarios) and gaming, though I only get to spend
              a little time between work and university. I love music of all genres but am particularly into Drum and Base at the moment.
            </p>
          </Card.Body>
      </Card>
  );
}

export default AboutComponent;
