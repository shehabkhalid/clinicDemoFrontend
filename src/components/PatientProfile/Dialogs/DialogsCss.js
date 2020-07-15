import { makeStyles } from "@material-ui/core/styles";

export const DialogsCss = makeStyles((theme) => ({
  root: {
    width: "915px",
  },
  root2: {
    width: "915px",
  },

  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  auto: {
    padding: "20px",
  },
  head: {
    display: "flex",
    // justifyContent : "flex-start"
  },
  formControlMulti: {
    margin: 0,
    marginBottom: 8,
    padding: 0,
    minWidth: 800,
    maxWidth: 800,
  },
  set: {
    margin: "25px",
    display: "flex",
    justifyContent: "flex-start",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  // ContFlex: {
  //   display: "flex",
  //   justifyContent: 'space-evenly',
  //   flexFlow: "wrap"

  // },
  Column: {

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: "20px",
    flexFlow: "wrap",

},
}));
