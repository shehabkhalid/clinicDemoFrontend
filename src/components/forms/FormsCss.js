import { makeStyles } from "@material-ui/core/styles";

export const loginFormCss = makeStyles(theme => ({
  centerElements: {
    display: "flex",
    justifyContent: "center"
  },
  logo: {
    width: "250px",
    height: "auto",
    filter: "drop-shadow(0 0 0.75rem lightgrey)"
  },
  content: {
    padding: theme.spacing(1)
  },
  toolbar: theme.mixins.toolbar,
  input: {
    margin: "20px auto",
    width: "90%"
  },
  btnLogin: {
    width: "40%"
  },
  loading: {
    padding: "20px"
  },
  paper: {
    marginTop: "30px",
    padding: theme.spacing(5)
  }
}));



export const NewPatientCss = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  centerElements: {
    display: "flex",
    justifyContent: "center"
  },
  PaperProps: {
    
      maxHeight: 48 * 4.5 + 8,
      width: 250
    
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },

  space: {
    marginTop: "0px"
  },

  inputCss: {
    width: "60%",
    marginLeft: "20%"
  },
  selectCss: {
    maxWidth: "768px",
    [theme.breakpoints.up("md")]: {
      marginLeft: "25%"
    }
  },
  selectCss2: {
    background: "red",
    width: "33.333333%",
    [theme.breakpoints.down("md")]: {
      marginLeft: "25%"
    },
    marginLeft: "0%"
  },
  formSpace: {
    margin: theme.spacing(2),
    paddingBottom: "40px"
  },

  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  toolbar: theme.mixins.toolbar,
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 400
    }
  },

  multiLine: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1), //multiText
      width: 300
    }
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },

  formControlMulti: {
    margin: 10,
    padding: 0,
    minWidth: 300,
    maxWidth: 300
  },
  formControlSelect: {
    padding: "18px",
    margin: "18px",
    width: "250px"
  },

  selectStyle: {
    margin: theme.spacing(1),
    minWidth: 120
  },

  know: {
    display: "flex", //multiSelect 3shan ykono t7t ba3d
    flexWrap: "wrap",
    margin: 2
  },
  chip: {
    //margin mabeen l icons l fe l multi
    margin: 2
  },

  alo: {
    float: "left",
    width: "33.3%",
    padding: "50px",
    justifyContent: "center"
  },
  box: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  box1: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },

  content: {
    padding: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      marginLeft: "240px"
    }
  },
  select: {
    [theme.breakpoints.down("md")]: {
      marginLeft: "25%"
    },
    marginLeft: "30%"
  },
  select2: {
    [theme.breakpoints.down("md")]: {
      marginLeft: "25%"
    },

    header: {
      padding: "20px"
    }

    //CODE
  },
  multiSelectCont: {
    flexWrap: "wrap",
    display: "flex",
    justifyContent: "center"
  },
  cardStyle: {
    minWidth: 275
  }
}));
