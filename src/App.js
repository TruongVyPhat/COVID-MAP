import React from 'react';
import './App.css';
import CovidGoogleMap from "./components/CovidGoogleMap";
import CovidDashboard from "./components/CovidDashboard";
import ChartDashboard from "./components/ChartDashboard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Container from 'react-bootstrap/Container';


const row_title_style = {
    textAlign:'center',
    margin: '15px',
    display: 'block'
};
const title_style = {
    fontSize: '3em',
    color:'cadetblue'
};
const router_style = {
    width: '500px',
    height: '50px',
    margin: '10px',
    textalign: 'center'
}
function App() {
    return ( 
        <Router>
            <div>
                <Container fluid>
                    <Row style={row_title_style}><a style={title_style}>COVID-MAP</a></Row>
                    <Row>
                        <Button variant="info" type="submit" style={router_style} href="/map">Bản đồ Việt Nam</Button>{' '}
                        <Button variant="info" type="submit" style={router_style} href="/stats">Đồ thị ca mắc Covid</Button>{' '}
                    </Row>
                </Container>
                <Switch>
                    <Route path="/map">
                        <CovidDashboard/>
                    </Route>
                    <Route path="/stats">
                        <ChartDashboard/>
                    </Route>
                </Switch>
            </div>
        </Router>
        
    );
}

export default App;
