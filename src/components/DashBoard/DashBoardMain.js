











import React, { useContext, useEffect } from "react";
import UserContext from "../../context/user/userContext";
import { Grid, Paper } from "@material-ui/core";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  BarSeries,
  Legend,
  Tooltip,
  PieSeries,
} from "@devexpress/dx-react-chart-material-ui";
import { EventTracker } from "@devexpress/dx-react-chart";
import { DashBoardStyle } from "./DashBoardCss";

const DashBoardMain = (props) => {
  const userContext = useContext(UserContext);
  useEffect(() => {
    if (!userContext.token) {
      props.history.push("/");
    }
    
  }, [userContext.token, props.history]);
  const classes = DashBoardStyle();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} lg={6}>
          <Paper style={{ padding: "10px 0px" }} elevation={3}>
            <Chart
              height={300}
              data={[
               
                { year: "Net / Facebook", population: 1000 },
                { year: "Patient referral", population: 3000 },
                { year: "Doctor referral", population: 500 },
                { year: "Insurance Company", population: 250 },
                { year: "Friend or Relation", population: 250 },
              ]}
              
            >
              <EventTracker />
              <Tooltip />
              <PieSeries valueField="population" argumentField="year" />
              <Legend />
            </Chart>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} lg={6}>
          <Paper style={{ padding: "10px 0px" }} elevation={3}>
            <Chart
              height={300}
              data={[
                { argument: "1", value: 0 },
                { argument: "2", value: 0 },
                { argument: "3", value: 0 },
                { argument: "4", value: 0 },
                { argument: "5", value: 0 },
                { argument: "6", value: 0 },
                { argument: "8", value: 0 },
                { argument: "9", value: 0 },
                { argument: "10", value: 0 },
                { argument: "11", value: 0 },
                { argument: "12", value: 0 },
              ]}
            >
              <ArgumentAxis />
              <ValueAxis />

              <Legend />
              <LineSeries
                valueField="value"
                argumentField="argument"
                name="Revenue"
              />
            </Chart>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{ padding: "10px 0px" }} elevation={3}>
            <Chart
              height={300}
              data={[
                { year: "AXA", population: 71 },
                { year: "CBE", population: 87 },
                { year: "Cement", population: 20 },
              ]}
            >
              <ArgumentAxis />
              <ValueAxis />
              <Legend />
              <EventTracker />
              <Tooltip />
              <BarSeries
                name="Insurance"
                valueField="population"
                argumentField="year"
              />
            </Chart>
          </Paper>
        </Grid>
      </Grid>
    </main>
  );
};
export default DashBoardMain;

