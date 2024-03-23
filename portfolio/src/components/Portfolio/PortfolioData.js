import smartNotes from "../../Assets/Portfolio/smartnotes.png";
import webSite from "../../Assets/Portfolio/website.png"

console.log('Image data:', smartNotes);



const portfolioData = [
    {
        image: smartNotes,
        isBlog: false,
        title: "Django Smart Notes Project",
        description: "Following a tutorial, I've created a notes app where users can create, edit and delete notes. I'm considering modifying it to create an inventory app for charities.",
        ghLink: "https://github.com/BenStrange/Django"
    },
    {
        image: webSite,
        isBlog: false,
        title: "Website",
        description: "I learn best by throwing myself in the deep end. I found a nice react template and modified it to my taste. I've also learned to hook up Django and use Google authentication to log in. The most interesting part was setting up AWS Elastic Beanstalk for Django and an EC2 Cluster for the website.",
        ghLink: "https://github.com/BenStrange/react-portfolio"
    },
];

export default portfolioData;
