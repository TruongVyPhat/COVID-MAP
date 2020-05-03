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

const start = '2019-12-08T00:00:00';
const msec_per_day = CONSTRAINT.msec_per_day;
const current_date = parseInt((Date.now() - Date.parse(start)) / msec_per_day);

const useStyles = makeStyles({
  root: {
    width: 950,
    margin: 'auto'
  },
});

const make_seek_marker = (patients) =>{
  const start_date = Date.parse(start);
  let result = [];

  for (let i = 0; i <= current_date; i++){

    let time = start_date + i*msec_per_day; // móc thời gian
    let day_in_label = FomaterTime.gettime_to_format(time);
    let up_to_date = {
      value: i,
      label: day_in_label,
      list_patient: [],
    };
    
    for (let j=0; j < patients.length; j++){
      let verify_msec = Date.parse(patients[j].verifyDate);
      let delta_time = verify_msec - start_date;
      if (delta_time >=0 && verify_msec <= time){
        up_to_date.list_patient.push(patients[j]);
      }
    }
    result.push(up_to_date);
  }
  return result;
}

export default function SeekBar({patients, onLoadList}) {
  const classes = useStyles();
  const marker = make_seek_marker(patients);
  const [playing, setPlaying] = useState(false);
  const isPlaying = () => {
    setPlaying(!playing);
  }
  const [value, setValue] = useState(marker[0].value);
  useEffect(() => {
    let interval = setInterval(() => {
      
      if (playing && value + 1 < marker.length){
        setValue(value => value + 1);
        onLoadList(marker[value].list_patient);
      }
      if(!playing) {
        clearInterval(interval);
      }
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
