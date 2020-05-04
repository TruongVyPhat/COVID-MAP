import React from 'react';
import {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Row from "react-bootstrap/Row";
import play from '../play.png';
import pause from '../pause.png';
import { Button } from '@material-ui/core';
import CONSTRAINT from '../helper/constraint';
import FomaterTime from '../functions/FormatTime';

const start = CONSTRAINT.start_date;
const msec_per_day = CONSTRAINT.msec_per_day;
const current_date = parseInt((Date.now() - Date.parse(start)) / msec_per_day); // milisecond đến ngày hiện tại

const useStyles = makeStyles({
  root: {
    width: 950,
    margin: 'auto'
  },
});

const make_seek_marker = (patients) => {
  let start_date = new Date(start);
  let cur_date = new Date(start);
  let end_time = Date.now();
  let result = [];
  let value = 0;
  let time = Date.parse(cur_date);

  do {
    // set value và label ở mỗi mark
    let day_in_label = FomaterTime.gettime_to_format(time);
    let up_to_date = {
      value: value,
      label: day_in_label,
      list_patient: [],
    };
    
    // set list_patients ở mỗi mark
    for (let j = 0; j < patients.length; j++){
      let verify_msec = Date.parse(patients[j].verifyDate);
      let delta_time = verify_msec - start_date;
      if (delta_time >=0 && verify_msec <= time){
        up_to_date.list_patient.push(patients[j]);
      }
    }
    result.push(up_to_date);

    // set cur_date = tomorrow
    cur_date.setDate(cur_date.getDate() + 1);
    time = Date.parse(cur_date);
    value++;
  } 
  while (time <= end_time)
  return result;
}

// const another_set_mark = (patients) =>{
//   const start_date = Date.parse(start);
//   let result = [];

//   for (let i = 0; i <= current_date; i++){

//     let time = start_date + i*msec_per_day; // móc thời gian
//     let day_in_label = FomaterTime.gettime_to_format(time);
//     let up_to_date = {
//       value: i,
//       label: day_in_label,
//       list_patient: [],
//     };  
//     for (let j=0; j < patients.length; j++){
//       let verify_msec = Date.parse(patients[j].verifyDate);
//       let delta_time = verify_msec - start_date;
//       if (delta_time >=0 && verify_msec <= time){
//         up_to_date.list_patient.push(patients[j]);
//       }
//     }
//     result.push(up_to_date);
//   }
//   return result;
// }

export default function SeekBar({patients, onLoadList}) {
  const classes = useStyles();
  const marker = make_seek_marker(patients);

  // status of play button
  const [playing, setPlaying] = useState(false);
  const isPlaying = () => {
    setPlaying(!playing);
  }

  // value of mark in seekbar
  const [value, setValue] = useState(marker[0].value);
  useEffect(() => {

    // Play seekbar
    let interval = setInterval(() => {
      
      if (playing && value + 1 < marker.length){
        setValue(value => value + 1);
        onLoadList(marker[value].list_patient);
      }
      // pause
      if(!playing) {
        clearInterval(interval);
      }
      // Xử lí kết thúc
      if (value === marker.length - 1){
        setPlaying(false);
        clearInterval(interval);
      }
    }, 300);
    return () => clearInterval(interval);
  }, [playing, value, marker, onLoadList]);

  const handleChange = (event, newValue) => {
    onLoadList(marker[newValue].list_patient);
    setValue(newValue);
  };

  function valueLabelFormat(value) {
    return marker[value].label;
  }
  
  return (
    <div className={classes.root}>
      <Row>
        <Typography id="discrete-slider-small-steps" gutterBottom>
          Verify Date
        </Typography>
        <Button id="play" onClick={isPlaying} type="button">
          {!playing && <img src={play} style={{height: "2.8em", width:"2.8em"}} alt="play"></img>}
          {playing && <img src={pause} style={{height: "2.8em", width:"2.8em"}} alt="pause"></img>}
        </Button>
      </Row>
      <Row>
        <Slider
          aria-labelledby="discrete-slider"
          value={value}
          step={1}
          marks={false}
          min={0}
          max={current_date}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valueLabelFormat}
          valueLabelFormat={valueLabelFormat}
        />
      </Row>
    </div>
  );
}
