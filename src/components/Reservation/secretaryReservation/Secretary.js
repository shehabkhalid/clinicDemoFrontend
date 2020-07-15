import React, { forwardRef, useState } from "react";
import clsx from "clsx";
import CheckIcon from "@material-ui/icons/Check";
import { Select, FormControl } from "@material-ui/core";
import MaterialTable, { MTableToolbar } from "material-table";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { SecretaryCss } from "./SecretaryCss";
import Chip from "@material-ui/core/Chip";
import {
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
import "date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";

const GQL_GET_RESERVATIONS = gql`
  query($Date: String, $Filter: String) {
    getDayReservations(date: $Date, filter: $Filter) {
      _id
      kind
      confirm1
      time
      owner {
        name
      }
    }
  }
`;

const GQL_UPDATE_RESERVATION = gql`
  mutation($input: ReservationInput) {
    updateReservation(reservationInput: $input) {
      _id
      date
      kind
      confirm1
      confirm2
      time
      owner {
        name
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

const Secretary = () => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = SecretaryCss();
  const [reservationFilter, setReservationFilter] = useState("all");
  const [state, setState] = useState({
    columns: [
      { title: "Name", field: "name" },
      { title: "Time", field: "time" },
      { title: "Type", field: "kind" },
      { title: "Confirmation", field: "confirm", type: "boolean" },
     ],
    data: [],
  });

  const showMessage = (msg, variant) => {
    let time = 1000;
    if (variant === "error") time = 3000;
    enqueueSnackbar(msg, { variant, autoHideDuration: time });
  };

  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString()
  );
  const [reload, setReload] = useState(false);
  const handleDateChange = (date) => {
    setSelectedDate(new Date(date).toLocaleDateString("en-US"));
  };
  const { loading } = useQuery(GQL_GET_RESERVATIONS, {
    variables: {
      Date: selectedDate,
      Filter: reservationFilter,
      refresh: reload,
    },
    onCompleted: (data) => {
      try {
        const newDate = data.getDayReservations.map((e) => {
          return {
            _id: e._id,
            kind: e.kind,
            time: e.time,
            name: e.owner.name,
            confirm: e.confirm1,
          };
        });
        setState({ ...state, data: newDate });
      } catch (error) {
        
        console.log(data)
      }
     
    },
  });
  const [updateReservation] = useMutation(GQL_UPDATE_RESERVATION);


  return (
    <Container maxWidth="lg" className={classes.content}>
      <div className={classes.toolbar} />
      <MaterialTable
        title="Reservation Table"
        isLoading={loading}
        columns={state.columns}
        icons={tableIcons}
        data={state.data}
        components={{
          Toolbar: (props) => (
            <div>
              <MTableToolbar {...props} />
              <div className={classes.sub}>
                <Chip label=" :كشف" variant="outlined" color="secondary" />

                <Chip
                  label=":متابعة عمليات"
                  variant="outlined"
                  color="secondary"
                />
                <Chip label=":استشارة" variant="outlined" color="secondary" />
                <Chip label=":تعاقد" variant="outlined" color="secondary" />
              </div>

              <div className={classes.menu}>
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
                <div>
                  <FormControl
                    className={clsx(
                      classes.formControlSelect,
                      classes.selectStyle
                    )}
                  >
                    <Select
                      native
                      defaultValue="All Reservations"
                      value={reservationFilter}
                      onChange={(e) => {
                        setReservationFilter(e.target.value);
                      }}
                      labelWidth="100"
                    >
                      <option value="all">All Reservation</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="notConfirmed">Not Confirmed</option>
                    </Select>
                  </FormControl>
                </div>
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
          {
            icon: () => <CheckIcon />,
            tooltip: "Confirmation",
            onClick: async (event, newRow) => {
              try {
                await updateReservation({
                  variables: {
                    input: {
                      _id: newRow._id,
                      confirm1: true,
                    },
                  },
                });
                setReload(!reload);
                showMessage("Confirmed", "success");
              } catch (error) {
                showMessage(error.message, "error");
              }
            },
          },
        ]}
        editable={{
          onRowDelete: async (oldData) => {
            try {
              await updateReservation({
                variables: {
                  input: {
                    _id: oldData._id,
                    kind: "R",
                    ownerId: "5e97b4ef207a92c6b1cd8fc0",
                  },
                },
              });
              setReload(!reload);
              showMessage("Deleted!", "success");
            } catch (error) {
              showMessage(error.message, "error");
            }
          },
        }}
      />
    </Container>
  );
};

export default Secretary;
