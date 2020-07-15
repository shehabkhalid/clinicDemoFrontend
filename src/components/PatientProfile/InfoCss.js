import { makeStyles } from "@material-ui/core/styles";

export const InfoCss = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  formControlMulti: {
  
    minWidth: 200,
    maxWidth: 200,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  paper: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(50),
      height: theme.spacing(60),
    },
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "noWrap",
  },
  flex3: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "noWrap",
  },
  flex2: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  multiLine: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2), //multiText
      width: 200,
      
    },
  },
  multiSelectCont: {
    // flexWrap: "wrap",
    // display: "flex",
    justifyContent: "center",
  },
  formControlMulti: {
    margin: 10,
    padding: 0,
    minWidth: 300,
    maxWidth: 300
  },
  PaperProps: {
    
    maxHeight: 48 * 4.5 + 8,
    width: 250
  
},
know: {
  display: "flex", //multiSelect 3shan ykono t7t ba3d
  flexWrap: "wrap",
  margin: 2
},
cat: {
  width: 300,
 
  
},
// formControlSelect: {
//   padding: "10px",
//   margin: "10px",
//   width: "250px"
// },
// selectStyle: {
//   margin: theme.spacing(1),
//   minWidth: 120
// },
select: {
  // margin: "10px",
  // padding: "10px"
}
}));
