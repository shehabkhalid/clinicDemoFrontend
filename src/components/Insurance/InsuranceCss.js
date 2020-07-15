import { makeStyles } from "@material-ui/core/styles";
export const InsuranceCss = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      marginLeft: "240px",
    },
  },
  toolbar: theme.mixins.toolbar,
  formControlSelect: {
    padding: "18px",
    margin: "18px",
    width: "180px",
  },
  selectStyle: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  menu: {
    //   display: "flex",
    // justifyContent: "flex-start",

  },
}));
