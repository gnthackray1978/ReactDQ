

export default (state = {
  status: "initial",
  order : 'asc',
  orderBy : 'date',
  selection : [],
  rawData : [],
  persons :[],
  families :[],
  gedDataRange: {s:0, e:2000},
  page : 0,
  rowsPerPage : 8,
  layout : 'descendents',
  gedLoaded :true,
  gedError :'',
  gedLoadingMessage : '',
  gedLoadingMessagesDisplayed : false,
  gedPersonListFilter : '',//
  graphRunning : false,
  graphActive : false,
  graphActiveLayout  : 'descendents',
  graphActiveSelection :[],

  context : null,
  zoomin:false,
  zoomout:false,
  mapup:false,
  mapdown: false,
  mapleft :false,
  mapright :false,
  staticSettings : {
    layoutDefaults :{
      topSpan :20.0,
      middleSpan :40.0,
      lowerSpan :20.0,
      distancesbetfam :100.0,
      boxHeight :70.0,
      boxWidth :70.0,
      distanceBetweenGens :170.0,
      distanceBetweenBoxs :30.0,
      zoomLevel :Number(100),
      zoomPercentage : 100.0,
      halfBoxWidth : 35.0,
      halfBoxHeight :35.0
    },
    colourScheme:{
      ancestor :{
        backgroundcolour : 'white',
        linecolour : 'black',
        textcolour : 'black',
        spousecolour : 'slateblue',
        globalAlpha : 0.5,
        lineWidth :2,
        heavyLineWidth :7,
        strokeStyle : '#99003A',
        defaultFont :'8pt Calibri'
      },
      descendent :{
        backgroundcolour : 'black',
        linecolour : '#99CCFF',
        textcolour : 'black',
        spousecolour : 'slateblue',
        globalAlpha : 0.5,
        lineWidth :2,
        heavyLineWidth :7,
        checkedOpenColour: 'red',
        checkedClosedColour: 'black',
        strokeStyle : '#99003A',
        defaultFont :'8pt Calibri'
      },
    }
  },
  fdSettings :{
    stiffness :400.0,
    repulsion :500.0,
    attractToCentreRepulsion :100.0,
    damping : 0.5,
    nearestPointDistance : 0.3,

    colourScheme : {
        mapbackgroundColour: 'white',//'#0A0A33',

        normalMainLabelColour: 'black',
        normalMainLabelBackground: 'white',
        normalMainShapeBackground: 'black',

        selectedMainLabelColour: 'purple',
        selectedMainLabelBackground: 'white',
        selectedMainShapeBackground: 'black',

        nearestMainLabelColour: 'blue',
        nearestMainLabelBackground: 'white',
        nearestMainShapeBackground: 'blue',


        normalInfoLabelColour: 'black',
        normalInfoLabelBackground: 'white',

        selectedInfoLabelColour: 'black',
        selectedInfoLabelBackground: 'white',

        nearestInfoLabelColour: 'white',
        nearestInfoLabelBackground: '#0A0A33',


        infoLineColour: '#0A0A33',
        normalLineGradient: ['#0066FF', '#1975FF', '#3385FF', '#4D94FF', '#66A3FF', '#80B2FF', '#99C2FF', '#CCE0FF', '#E6F0FF'],

        shadowColour: 'black',
       // maleColour: 'purple',
    //    femaleColour: 'purple'
    },
      speed :500,
      increment :5,
      year : 1670,
      sublayoutZoom:8500,
      sublayoutNodeThreshold : 20
    }
  }
, action) => {
  switch (action.type) {

    case "SET_GEDNAMEFILTER":
      return {
         ...state,

           gedPersonListFilter : action.filter

    };

    case "SET_SUBSETFDPARAMS":
      return {
         ...state,

           fdSettings :{
             ...state.fdSettings,
             stiffness :action.stiffness,
             repulsion :action.repulsion,
             damping : action.damping,
             speed :action.speed,
             increment :action.increment,
             year : action.runfrom,
             sublayoutZoom:action.zoomthreshold,
             sublayoutNodeThreshold : action.nodethreshold
           }

    };

    case "CONTROLS_OPEN":
        return {
          ...state,

            controlVisible: true

        };

    case "CONTROLS_CLOSE":
        return {
          ...state,

            controlVisible: false

        };

    case "YEAR_INCREMENT_INIT":
          return {
            ...state,

              incrementSize : action.incrementSize,
              timeSpeed : action.timeSpeed

          };

    case "GED_LOAD_STATUS":
          return {
            ...state,

              gedLoadingMessage : action.gedLoadingMessage,
              gedLoadingMessagesDisplayed : action.gedLoadingMessagesDisplayed

          };

    case "GED_LOAD_ERROR":
          return {
            ...state,

              gedLoaded :action.gedLoaded,
              gedError :action.gedError

          };

    case "SET_CONTEXT":
          return {
            ...state,

              context : action.context,

          };

    case "ACTIVATE_GRAPH":
          return {
            ...state,

              graphActive : action.graphActive,
              graphActiveLayout :action.graphActiveLayout,
              graphActiveSelection :action.graphActiveSelection

          };

    case "SET_DATA":
          return {
            ...state,

              persons : action.persons,
              families: action.families,
              gedDataRange: action.gedDataRange,
              gedLoaded :true

          };

    case "ZOOMIN_DOWN":
          return {
            ...state,

              zoomin : action.isSet,

          };

    case "ZOOMOUT_DOWN":
          return {
            ...state,

              zoomout : action.isSet,

          };

    case "MAPUP_DOWN":
          return {
            ...state,

              mapup : action.isSet,

          };

    case "MAPDOWN_DOWN":
          return {
            ...state,

              mapdown : action.isSet,

          };

    case "MAPLEFT_DOWN":
          return {
            ...state,

              mapleft : action.isSet,

          };

    case "MAPRIGHT_DOWN":
          return {
            ...state,

              mapright : action.isSet,

          };

    case "TOGGLE_GRAPHRUNNING":
          return {
            ...state,

              graphRunning : action.isSet,

          };



  default:
      return state;
  }
};
