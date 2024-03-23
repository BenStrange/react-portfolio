import React from "react";
import { Col, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import { DiAws, DiGithub, DiVisualstudio, DiDocker } from "react-icons/di";
import { SiRancher, SiTeamcity, SiClickhouse } from "react-icons/si";

function ToolStackComponent() {
    const toolStack = [

        { Icon: DiAws, name: "AWS (S3, EC2)", experience: "2 Year - AWS - (S3, EC2)" },
        { Icon: DiGithub, name: "GitHub", experience: "3 Years - GitHub" },
        { Icon: DiVisualstudio, name: "Visual Studio", experience: "3 Years - Visual Studio" },
        { Icon: DiDocker, name: "Docker", experience: "3 Years - Docker" },
        { Icon: SiRancher, name: "Rancher", experience: "3 Years - Rancher" },
        { Icon: SiTeamcity, name: "TeamCity", experience: "1 Year - TeamCity" },
        { Icon: SiClickhouse, name: "Clickhouse", experience: "2 Years - Clickhouse" },
    ];

    return (
        <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
            {toolStack.map((tool, index) => (
                <OverlayTrigger
                    key={index}
                    placement="bottom"
                    overlay={<Tooltip id={`tooltip-${index}`}>{tool.experience}</Tooltip>}
                >
                    <Col xs={4} md={2} className="tech-icons">
                        <tool.Icon />
                    </Col>
                </OverlayTrigger>
            ))}
        </Row>
    );
}

export default ToolStackComponent;
