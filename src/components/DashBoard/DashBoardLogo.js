import React from "react";
import {
  Container,
  Paper,
  Avatar,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  Button,
  Fade,
  CircularProgress,
} from "@material-ui/core";
import { DashBoardStyle } from "./DashBoardCss";

const DashBoardLogo = () => {
  const classes = DashBoardStyle();

  return (
    <div className={classes.centerElements}>
      <Avatar
        className={classes.logo}
        variant="square"
        src={require("../../static/Logo.png")}
      />
    </div>
  );
};

export default DashBoardLogo;
