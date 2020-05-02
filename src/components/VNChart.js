import React, {useEffect, useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CanvasJSReact from '../canavasjs/canvasjs.react';
import axios from 'axios';
import pos from '../helper/constraint';
import Line from '../helper/LineChartJson';
import DataJson from '../helper/Data';

const vnPos = pos.vn_case;
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const setupLines = (data) => {
    let result = [];
    const number_of_type = Object.keys(data).length;
    for (let i = 0; i < number_of_type; i++){
        
        let label_of_case = Object.keys(data)[i];
        let line = Line.dataJson;
        line.name = data[label_of_case].name;
        line.dataPoints = data[label_of_case].dataPoints;
        const line_str = JSON.stringify(line);

        result.push(JSON.parse(line_str));
    }
    return result;
};

const VNChart = ({}) => {
    // api data
    const [APIData, setAPIData] = useState({});
    useEffect(() => {
        axios.get('https://td.fpt.ai/corona/corona-chart-vn.json')
        .then(res => {
            const apiData = res.data;
            setAPIData(apiData);

            // data
            let data_tmp = DataJson.VN_Data;
            const apiData_size = Object.keys(apiData).length;
            
            // set data for each case
            for (let i = 0; i < apiData_size; i++){
                let key = Object.keys(apiData)[i];
                let value_arr = apiData[key];
                
                if (value_arr.length !== Object.keys(vnPos).length){
                    // data api conflict with data constraint
                    return;
                }
                let point = Line.point;
                point.label = key;                                      // set label = date
                
                const number_of_type = Object.keys(data_tmp).length;    // lấy số trường hợp của loại data
                for (let j = 0; j < number_of_type; j++){

                    let label_of_case = Object.keys(data_tmp)[j];       // lấy nhãn của từng trường hợp
                    let pos_of_case = vnPos[label_of_case];             // lấy vị trí của từng trường hợp trong API array

                    point.y = value_arr[pos_of_case];                   // lấy giá trị

                    let str = JSON.stringify(point);
                    data_tmp[label_of_case].dataPoints.push(JSON.parse(str));
        
                }
            }
            setData(data_tmp);
        })
        .catch(error => console.log(error));
    }, [])

    // data
    const [Data, setData] = useState({});
    const options = Line.options;
    options.data = setupLines(Data);
    options.title.text = "Viet Nam Covid Chart";
    const options_str = JSON.stringify(options);

    return <CanvasJSChart options={JSON.parse(options_str)}/>;
};

export default VNChart;