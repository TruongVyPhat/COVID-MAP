import React, {useEffect, useState} from 'react';
import { Marker, Popup } from 'react-leaflet';

const MyMarker = ({key, patient, selected_marker, patients, onPatientMarkerClicked, onLoadList}) => {
    return <Marker key={key} position={[patient.lat, patient.lng]}
        onClick={() => {onPatientMarkerClicked(patient);
            let elm = document.getElementById("selected-item");
            if (elm){
                elm.scrollIntoView(true, { behavior: 'smooth' });
            }
        }}
        onadd={()=> {
            onLoadList(patients);
        }}>
        
        <Popup key={key}>
            <ul>
                <ol>Name: {patient.name}</ol>
                <ol>Address: {patient.address}</ol>
                <ol>Note: {patient.note}</ol>
                <ol>Verify date: {patient.verifyDate}</ol>
            </ul>
        </Popup>
    </Marker>
};

export default MyMarker;