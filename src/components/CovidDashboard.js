import React, {useEffect, useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CovidGoogleMap from "./CovidGoogleMap";
import PatientInfo from "./PatientInfo";
import CovidMap from "./CovidMap";
import Card from 'react-bootstrap/Card';
import ListViewPatient from './ListViewPatient';
import Container from 'react-bootstrap/Container';
import SeekBar from './SeekBar';

const CovidDashboard = (props) => {
    // static data
    const [Data, setData] = useState();
    const loadStaticData = (data) =>{
        setData(data);
    }
    // list patient
    const [listPatient, setListPatient] = useState();
    const onLoadList = (listPatient) => {
        setListPatient(listPatient);
    }

    const [currentPatient, setCurrentPatient] = useState();
    const patientMarkerClickedHandler = (patient) => {
        setCurrentPatient(patient);
    }
    
    console.log('Covid Dashboard render');
    return <Container fluid>
            <Row>
                <Col xs={9}>
                    <Card>
                        <CovidMap loadStaticData={loadStaticData} onPatientMarkerClicked={patientMarkerClickedHandler} 
                                onLoadList={onLoadList} selected_marker={currentPatient} listPatient={listPatient}/>
                        <Row>{Data && <SeekBar patients={Data} onLoadList={onLoadList}></SeekBar>}</Row>
                    </Card>
                    <Card id="patient-info" style={{ width: '100%'}}>
                        <Card.Body>
                            <Card.Title>Patient Infomation</Card.Title>
                            {currentPatient && 
                            <PatientInfo style={{margin: '0', padding: '0'}} name={currentPatient.name} 
                                address={currentPatient.address} note={currentPatient.note}
                                verifyDate={currentPatient.verifyDate} />}
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={3}>
                <Card.Title>List Patient</Card.Title>
                    {listPatient && <ListViewPatient items={listPatient} selected_item_full={currentPatient} 
                        on_change_selected={patientMarkerClickedHandler}></ListViewPatient>}    
                </Col>
            </Row>
    </Container>
    
};

export default CovidDashboard;