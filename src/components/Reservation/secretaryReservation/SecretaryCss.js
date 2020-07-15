import { makeStyles } from "@material-ui/core/styles";

export const SecretaryCss = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      marginLeft: "240px",
    },
  },
  toolbar: theme.mixins.toolbar,
  header: {
    direction: "row",
    justify: "space-between",
    alignItems: "center",
  },

  flexCont: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  absolute: {
    position: "direction",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  menuCss: {
    display: "flex",
    justifyContent: "flex-start",
  },
  sliderCss: {
    width: 300,
  },
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  button: {
    display: "flex",
    justifyContent: "flex-end",
  },

  content: {
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      marginLeft: "240px",
    },
  },
  toolbar: theme.mixins.toolbar,

  menu: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px",
    
  },
  formControlSelect: {
    padding: "18px",
    margin: "18px",
    width: "180px",
  },
  selectStyle: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  
  sub: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    margin: "5px",
    wrap: "wrap",
  },
}));
