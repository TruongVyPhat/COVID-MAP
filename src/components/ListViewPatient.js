import React, {useEffect, useState} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import 'react-perfect-scrollbar/dist/css/styles.css';
import Card from 'react-bootstrap/Card';
import PerfectScrollbar from 'react-perfect-scrollbar';

const ListViewPatient = ({on_change_selected, items, selected_item_full}) => {
  let selected_item = null;
  if(selected_item_full){
    selected_item = selected_item_full.name;
  }
  
  const list = items.map((item, idx) =>{  
    if(selected_item && selected_item === item.name){
      return(<div id="selected-item">
      <ListGroup.Item type="button" key={idx} value={item.name} onClick={() => {on_change_selected(item);
      document.getElementById("patient-info").scrollIntoView(false, { behavior: 'smooth' })}} active>Name: {item.name}, Verify Date: {item.verifyDate}</ListGroup.Item></div>);
    }else{
      return(<ListGroup.Item type="button" key={idx} value={item.name} onClick={() => {on_change_selected(item);
        document.getElementById("patient-info").scrollIntoView(false, { behavior: 'smooth' })}} >Name: {item.name}, Verify Date: {item.verifyDate}</ListGroup.Item>);
    }
  }); 

  return (
    <Card >
      <PerfectScrollbar name="myScrollToElement" style={{height: '600px'}}>
        <ListGroup key={items.id}>
          {list}
        </ListGroup>
      </PerfectScrollbar>
    </Card>
  );
}

export default ListViewPatient;