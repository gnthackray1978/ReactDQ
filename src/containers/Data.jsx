import React, { Component } from 'react'
import { Grid, Col,Row, Image ,Modal,Container,Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import SideDrawer from './SideDrawer/SideDrawer.jsx';
import TopButtons from './ButtonBar/TopButtons.jsx';
import './data.css';


export default class Data extends Component {
  constructor(props) {
     super(props);
   }

 componentDidMount() {

 }

 handleInput = (e) => {

   this.dataClick();
 }

 render() {

   return (
     <div>
       <TopButtons  isData = {true} modeChanged = { this.handleInput }/>
       <SideDrawer onOpenClick = {click => this.dataClick = click} />
     </div>

   );
 }

}
