import React, {useEffect, useState} from 'react';
import { Map, TileLayer } from 'react-leaflet';
import MyMarker from './MyMarker';

const CovidMap = ({loadStaticData, onPatientMarkerClicked, onLoadList, selected_marker, listPatient}) => {
    const [patients, setPatients] = useState([]);
    useEffect(() => {
        fetch("https://maps.vnpost.vn/apps/covid19/api/patientapi/list")
            .then(res => res.json())
            .then(
                (result) => {
                    let items = result.data;
                    let sort_items = [];
                    while (items.length !== 0){
                        let temp = items.pop();
                        if (sort_items.length === 0){
                            sort_items.push(temp);
                        }else{
                            let i = 0;
                            while (i < sort_items.length && temp.verifyDate < sort_items[i].verifyDate){
                                i++;
                            }
                            sort_items.splice( i, 0, temp);
                        }
                    }
                    setPatients(sort_items);
                    {loadStaticData(sort_items)};
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    // setIsLoaded(true);
                    // setError(error);
                }
            )
    }, [])

    return <Map center={[10.762887, 106.6800684]} zoom={13}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.osm.org/{z}/{x}/{y}.png   "
            />
            
            {listPatient && listPatient.map((item, index) => { 
                return <MyMarker key={index}
                                patient={item}
                                onPatientMarkerClicked={onPatientMarkerClicked}
                                onLoadList={onLoadList}
                                selected_marker={selected_marker}
                                patients={listPatient}/>})}
            {/* {patients && patients.map((patient, index) => {
                return <MyMarker key={index}
                                patient={patient}
                                onPatientMarkerClicked={onPatientMarkerClicked}
                                onLoadList={onLoadList}
                                selected_marker={selected_marker}
                                patients={patients}/>})} */}
        </Map>;
};

export default CovidMap;
