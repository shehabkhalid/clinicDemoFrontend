import React, { useState, useEffect, useContext, Fragment } from "react";
import { PatientProfileCss } from "./PatientProfileCss";
import PatientInfo from "./PatientInfo";


import PatientContext from "../../context/patient/patientContext";


import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Speed from "./Speed";
import XrayDg from "./Dialogs/XrayDg";
import InvestigationDg from "./Dialogs/InvestigationDg";
import PrescriptionDg from "./Dialogs/PrescriptionDg";
import AppointmentTable from "./AppointmentTable";
import SpecialReportsDg from "./Dialogs/specialReports";
import PhysiotherapyDg from "./Dialogs/PhysiotherapyDg"
import ReservationProfile from "./ReservationProfile";
import SwipeableViews from "react-swipeable-views";
import Draggable from "react-draggable";
import UserContext from '../../context/user/userContext'

function TabPanel(props)
{
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

const PatientProfile = (props) =>
{
  const patientContext = useContext(PatientContext);
  const userContext = useContext(UserContext);
  useEffect(() =>
  {
    if (patientContext._id === "")
    {
      props.history.push("/home");

    }
  }, []);
  const classes = PatientProfileCss();
  const [openDial, setOpenDial] = useState(false);
  const [hidden, setHidden] = useState(false);

  const [dialogs, setDialogs] = useState({
    PatientInfo: false,
    Prescription: false,
    Investigation: false,
    XRay: false,
    Reports: false,
    Physiotherapy: false,

  });

  const handleDialogs = (name) => (event) =>
  {
    setDialogs({ ...dialogs, [name]: !dialogs[name] });
    console.log({ dialogs });

    handleClose();
  };

  const handleOpen = () =>
  {
    setOpenDial(true);
  };

  const handleClose = () =>
  {
    setOpenDial(false);
  };
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) =>
  {
    setValue(newValue);
  };



  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Paper elevation={3}>
        <div className={classes.tabStyle}>
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            variant="fullWidth"
            aria-label="tans"
          >

            <Tab label="Patient Info" />
            <Tab label={(userContext.role == 'sec') ? "Reservation" : "Appointment"} />
            {(userContext.role === 'clinic')&&( <Tab label= "Reservation"/> )}

          </Tabs>

          <SwipeableViews
            axis="x-reverse"
            index={value}
            onChangeIndex={handleChange}
          >
            <TabPanel value={value} index={0}>
              <div className={classes.root}>
                <PatientInfo />
                <XrayDg open={dialogs.XRay} handleClose={handleDialogs} />
                <SpecialReportsDg open={dialogs.Reports} handleClose={handleDialogs} />
                <InvestigationDg
                  open={dialogs.Investigation}
                  handleClose={handleDialogs}
                />
                <PrescriptionDg
                  open={dialogs.Prescription}
                  handleClose={handleDialogs}
                />
                <PhysiotherapyDg
                  open={dialogs.Physiotherapy}
                  handleClose={handleDialogs}
                />
              </div>
            </TabPanel>

            <TabPanel value={value} index={1}>
              <div className={classes.root}>
                {
                  (userContext.role === 'sec') ? (<ReservationProfile />) :
                    (<AppointmentTable />)
                }
                <SpecialReportsDg open={dialogs.Reports} handleClose={handleDialogs} />
                <XrayDg open={dialogs.XRay} handleClose={handleDialogs} />
                <InvestigationDg
                  open={dialogs.Investigation}
                  handleClose={handleDialogs}
                />
                <PrescriptionDg
                  open={dialogs.Prescription}
                  handleClose={handleDialogs}
                />
                <PhysiotherapyDg
                  open={dialogs.Physiotherapy}
                  handleClose={handleDialogs}
                />
              </div>
            </TabPanel>


         
            {(userContext.role === 'clinic')&&(
              <TabPanel value={value} index={2}>
              <div className={classes.root}>
                <ReservationProfile />
                <SpecialReportsDg open={dialogs.Reports} handleClose={handleDialogs} />
                <XrayDg open={dialogs.XRay} handleClose={handleDialogs} />
                <InvestigationDg
                  open={dialogs.Investigation}
                  handleClose={handleDialogs}
                />
                <PrescriptionDg
                  open={dialogs.Prescription}
                  handleClose={handleDialogs}
                />
                <PhysiotherapyDg
                  open={dialogs.Physiotherapy}
                  handleClose={handleDialogs}
                />
              </div>
            </TabPanel>

            )}


          </SwipeableViews>


          {
            userContext.role === 'admin' &&
            (
              <Draggable axis="y">
                <div>
                  <Speed
                    hidden={hidden}
                    handleClose={handleClose}
                    openDial={openDial}
                    handleOpen={handleOpen}
                    handleDialogs={handleDialogs}
                    css={classes.speedDial}
                  />
                </div>
              </Draggable>
            )
          }

        </div>
      </Paper>
    </main>
  );
};

export default PatientProfile;
