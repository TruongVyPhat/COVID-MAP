import React, {useEffect, useState} from 'react';

const PatientInfo = ({name, address, note, verifyDate}) => {
    return <ul style={{margin: '0', padding: '0'}}>
        <ol>Name: {name}</ol>
        <ol>Address: {address}</ol>
        <ol>Note: {note}</ol>
        <ol>Verify Date: {verifyDate}</ol>
    </ul>
};

export default PatientInfo;