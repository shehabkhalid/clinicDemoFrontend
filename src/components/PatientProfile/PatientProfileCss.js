import { makeStyles } from "@material-ui/core/styles";

export const PatientProfileCss = makeStyles((theme) => ({
  content: {
   
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      marginLeft: "240px",
    },
  },
  toolbar: theme.mixins.toolbar,
  root: {
    height: 500,
    transform: "translateZ(0px)",
    flexGrow: 1,
  },
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  tabStyle: {
   
    borderRadius:'25%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    margin: 0,
    height:'auto'
  },
}));
