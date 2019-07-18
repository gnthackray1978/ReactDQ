import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AddIcon from '@material-ui/icons/Add';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import InputBase from '@material-ui/core/InputBase';
import QuizItem from "./QuizItem.jsx";
import './SideDrawer.css';




function QuizItemCats(props) {

 if(props.names.length ==0 || !props.isVisible)
  return(<div></div>);

  return (
    <List >
      {props.names.map(function(item, index){
                 return <ListItem button  key = {index} >
                   <ListItemText  inset  primary={item} onClick = {()=>{
                       props.onClick(item);
                     }} />
                 </ListItem>;
      })}
    </List>
  );
}

export default QuizItemCats;
