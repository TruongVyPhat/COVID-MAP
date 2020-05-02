import React, {useEffect, useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import VNChart from "./VNChart";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

const ChartDashboard = ({}) => {
    return <Container fluid>
        <Row><Col xs={6}>
                <Card style={{width: "100%"}}>
                    <VNChart/>
                </Card>
            </Col>
        </Row>
    </Container>
};

export default ChartDashboard;