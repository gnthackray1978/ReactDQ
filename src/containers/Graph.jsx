import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row,Container} from 'react-bootstrap';
import GraphControl from './MapControls/GraphControl.jsx';
import TopButtons from './ButtonBar/TopButtons.jsx';
import { connect } from "react-redux";
import { switchControlVisbility} from "../actions/uxActions.jsx";
import VisualisationHandler from "./VisualisationHandler.jsx";

import './graph.css';


class Graph extends Component {

  constructor(props) {
     super(props);

   }

  topButtonClicked = (e) => {
    if(e == "controls"){
      if(this.props.controlVisible)
        this.props.switchControlVisbility(false);
      else
        this.props.switchControlVisbility(true);
    }
  }

  render() {
    return (
        <div>
            <VisualisationHandler/>
            <TopButtons isData = {false} modeChanged = {this.topButtonClicked}/>
            <Container className="cont-width">
                <Row className="my-row"/>
                <Row className="my-row"/>
                <Row className="my-row">
                    <GraphControl modalShow={this.props.controlVisible}/>
                </Row>

            </Container>

        </div>
    )
  }
}

Graph.propTypes = {
  controlVisible : PropTypes.bool,
  switchControlVisbility : PropTypes.func
};


const mapStateToProps = (state, ownProps) => {
  return {
   controlVisible: state.controlVisible,
   ...ownProps
 };
};


const mapDispatchToProps = dispatch => {
  return {
    switchControlVisbility: controlVisible => {
      dispatch(switchControlVisbility(controlVisible));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
