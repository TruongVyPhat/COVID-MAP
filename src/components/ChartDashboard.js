import React, {useEffect, useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import VNChart from "./VNChart";
import WorldChart from "./WorldChart";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

const ChartDashboard = ({}) => {
    return <Container fluid style={{paddingTop: "2em"}}>
        <Row>
            <Col xs={6}>
                <Card style={{width: "100%"}}>
                    <VNChart/>
                </Card>
            </Col>
            <Col xs={6}>
                <Card style={{width: "100%"}}>
                    <WorldChart/>
                </Card>
            </Col>
        </Row>
    </Container>
};

export default ChartDashboard;