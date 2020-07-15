import React, { useContext, useEffect, forwardRef, useState } from "react";
import UserContext from "../../context/user/userContext";
import { ReservationCss } from "./ReservationCss";
import LaunchIcon from "@material-ui/icons/Launch";
import  {withRouter} from 'react-router-dom';

import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import IconButton from "@material-ui/core/IconButton";
import { useMutation } from "@apollo/react-hooks";

import MaterialTable, { MTableToolbar } from "material-table";
import "date-fns";
import
{
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Slider from "@material-ui/core/Slider";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import PatientContext from '../../context/patient/patientContext'

import "react-chat-widget/lib/styles.css";

import
{
  Search,
  ViewColumn,
  SaveAlt,
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
  Check,
  FilterList,
  Remove,
  Edit,
  AddBox,
  Clear,
  DeleteOutline,
  ArrowDownward,
} from "@material-ui/icons";
import { Container } from "@material-ui/core";
import gql from "graphql-tag";

const GQL_GET_RESERVATIONS = gql`
  query($Date: String, $Filter: String) {
    getDayReservations(date: $Date, filter: $Filter) {
      _id
      kind
      time
      confirm2
      owner {
        name
        _id
      }
    }
  }
`;

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};
const GQL_GET_PATIENT = gql`

query ($ID:ID) {
 patient(_id:$ID) {
   _id
   name
   yearOfBirth
   gender
   catagories
   address
   phone
   medicalConditionText
   drugTakeText
   knowledgeText
   location
   insurance
 }
}

`
const DoctorReservation = (props) =>
{
  const classes = ReservationCss();
  const userContext = useContext(UserContext);
  const patientContext = useContext(PatientContext)

  const [state, setState] = useState({
    columns: [
      { title: "Name", field: "name" },

      { title: "Type", field: "kind" },
      { title: "Time", field: "time", type: "numeric" },
      { title: "Came to Clinic", field: "confirm2", type: "boolean" },
    ],
  });

  const handleDateChange = (date) =>
  {
    setSelectedDate(new Date(date).toLocaleDateString());
  };

  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString()
  );
  const [open, setOpen] = React.useState(false);

  const styles = (theme) => ({
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
  });
  const DialogTitle = withStyles(styles)((props) =>
  {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });


  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);

  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);

  const [openL, setOpenL] = useState(false);

  const openLimit = () =>
  {
    setOpenL(true);
  };
  const closeLimit = () =>
  {
    setOpenL(false);
  };
  const [reload, setReload] = useState(false);

  const { loading } = useQuery(GQL_GET_RESERVATIONS, {
    variables: {
      Date: selectedDate,
      Filter: "allD",
      refresh: reload,
    },
    onCompleted: (data) =>
    {
      const newDate = data.getDayReservations.map((e) =>
      {
        return {
          _id: e._id,
          kind: e.kind,
          time: e.time,
          name: e.owner.name,
          confirm2: e.confirm2,
          ownerId: e.owner._id
        };
      });
      setState({ ...state, data: newDate });
    },
  });
  useEffect(() =>
  {

    if (!userContext.token)
    {
      props.history.push("/");
    }
  }, [userContext.token, props.history]);

  const [getPatient] = useLazyQuery(GQL_GET_PATIENT,
    {
      onCompleted: data =>
      {

        patientContext.setCurrentPatient(data.patient)
        props.history.push('/profile')




      }
    }


  );
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />

      <MaterialTable
        icons={tableIcons}
        isLoading={loading}
        title={<h1 style={{ paddingRight: 40 }}>Reservation</h1>}
        columns={state.columns}
        data={state.data}
        components={{
          Toolbar: (props) => (
            <div>
              <MTableToolbar {...props} />
              <Container>
                <div className={classes.flexCont}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} p={1}>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="Date picker dialog"
                      format="MM/dd/yyyy"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>

                </div>
                <div className={classes.menuCss}>
                  <div>
                    <Dialog
                      onClose={closeLimit}
                      aria-labelledby="customized-dialog-title"
                      open={openL}
                    >
                      <DialogTitle
                        id="customized-dialog-title"
                        onClose={closeLimit}
                      >
                        Limit
                      </DialogTitle>
                      <DialogContent dividers>
                        <div className={classes.sliderCss}>
                          <Typography id="discrete-slider" gutterBottom>
                            كشف
                          </Typography>
                          <Slider
                            defaultValue={12}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={2}
                            marks
                            min={0}
                            max={12}
                          />
                          <Typography id="discrete-slider" gutterBottom>
                            استشارة
                          </Typography>
                          <Slider
                            defaultValue={5}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={5}
                          />
                          <Typography id="discrete-slider" gutterBottom>
                            تعاقد
                          </Typography>
                          <Slider
                            defaultValue={4}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={2}
                            marks
                            min={0}
                            max={4}
                          />
                          <Typography id="discrete-slider" gutterBottom>
                            متابعة عمليات
                          </Typography>
                          <Slider
                            defaultValue={2}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={2}
                          />
                        </div>
                      </DialogContent>
                      <DialogActions>
                        <Button autoFocus onClick={closeLimit} color="primary">
                          Save changes
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                </div>
              </Container>
              <div>
                <Backdrop className={classes.backdrop} open={openL}>
                  <CircularProgress color="inherit" />
                </Backdrop>
              </div>
            </div>
          ),
        }}
        options={{
          search: false,
          exportButton: true,
          pageSize: 15,
        }}
        actions={[
          (rowData) => ({
            icon: () => <LaunchIcon />,
            tooltip: "Open",
            onClick: () =>
            {

              try
              {


                getPatient({
                  variables: {
                    ID: rowData.ownerId
                  }
                })



              } catch (error)
              {

                console.log({ error })
              }

            }
          }),
        ]}
      />
    </main>
  );
};

export default withRouter(DoctorReservation);


















// Limit button
// <Button
// size="small"
// variant="contained"
// onClick={openLimit}
// color="primary"
// // className={classes.button}
// >
// Limit
// </Button>