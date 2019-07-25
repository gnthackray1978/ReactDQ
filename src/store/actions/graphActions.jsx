export const mapLeft = (isSet) =>{
  return async dispatch  => {
      dispatch({
        type: "MAPLEFT_DOWN",
        isSet : isSet,
      });
  };
}

export const mapRight = (isSet) =>{
  return async dispatch  => {
      dispatch({
        type: "MAPRIGHT_DOWN",
        isSet : isSet,
      });
  };
}

export const toggleGraphRunning = (isSet) =>{
  return async dispatch =>{
    dispatch({
      type: "TOGGLE_GRAPHRUNNING",
      isSet : isSet
    });
  };
}


export const mapUp = (isSet) =>{
  return async dispatch  => {
      dispatch({
        type: "MAPUP_DOWN",
        isSet : isSet,
      });
  };
}

export const mapDown = (isSet) =>{
  return async dispatch  => {
      dispatch({
        type: "MAPDOWN_DOWN",
        isSet : isSet,
      });
  };
}

export const setGedData = (persons, families,range) =>{
  return async dispatch  => {
    dispatch({
      type: "SET_DATA",
      persons : persons,
      families : families,
      gedDataRange :range
    });
  };
}

export const zoomIn = (isSet) =>{
  return async dispatch  => {
      dispatch({
        type: "ZOOMIN_DOWN",
        isSet : isSet,
      });
  };
}

export const zoomOut = (isSet) =>{
  return async dispatch  => {
      dispatch({
        type: "ZOOMOUT_DOWN",
        isSet : isSet,
      });
  };
}

export const activateLayout = (isActive,graphActiveLayout,graphActiveSelection) =>{
  return async dispatch  => {
    dispatch({
      type: "ACTIVATE_GRAPH",
      graphActive : isActive,
      graphActiveLayout : graphActiveLayout,
      graphActiveSelection : graphActiveSelection
    });
  };
}


export const setContext = (context) => {
  return async dispatch  => {
    dispatch({
      type: "SET_CONTEXT",
      context : context
    });
  };
};

export const gedLoadFailed = (message) => {
  return async dispatch  => {
    dispatch({
      type: "GED_LOAD_ERROR",
      gedLoaded :false,
      gedError :message
    });
  };
};


export const initYearIncrementor = (increment,speed) => {
  return async dispatch  => {
    dispatch({
      type: "YEAR_INCREMENT_INIT",
      incrementSize : increment,
      timeSpeed : speed
    });
  };
};

export const gedLoadingStatus = (message, show) => {
  return async dispatch  => {
    dispatch({
      type: "GED_LOAD_STATUS",
      gedLoadingMessage : message,
      gedLoadingMessagesDisplayed : show
    });
  };
};

export const setSubsetFDParams = (runfrom, speed, increment, zoomthreshold,nodethreshold, stiffness, repulsion, damping) =>{
  return async dispatch  => {
    dispatch({
      type: "SET_SUBSETFDPARAMS",
      runfrom: runfrom,
      speed: speed,
      increment: increment,
      zoomthreshold: zoomthreshold,
      nodethreshold: nodethreshold,
      stiffness: stiffness,
      repulsion: repulsion,
      damping: damping,
    });

  };
}
