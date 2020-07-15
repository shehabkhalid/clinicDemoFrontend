import React, { useEffect, useContext } from "react";
import DashBoardLogo from './DashBoardLogo';

import DashBoardMain from './DashBoardMain';
import UserContext from "../../context/user/userContext";

const DashBoard = (props) => {
  const userContext = useContext(UserContext);
  useEffect(() => {
    if (!userContext.token) {
      props.history.push("/");
    }
  }, [userContext.token, props.history]);

  if (userContext.role === "admin")
    return <DashBoardMain></DashBoardMain>;
  else if (userContext.role === "sec") return <DashBoardLogo></DashBoardLogo>;
  else return <DashBoardLogo></DashBoardLogo>;
};

export default DashBoard;


