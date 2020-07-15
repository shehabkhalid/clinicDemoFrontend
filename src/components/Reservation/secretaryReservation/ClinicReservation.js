import React, { forwardRef, useState } from "react";

import MaterialTable from "material-table";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { SecretaryCss } from "./SecretaryCss";
import SendIcon from "@material-ui/icons/Send";

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
import "date-fns";
import
{
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GQL_GET_RESERVATIONS = gql`
  query($Date: String, $Filter: String) {
    getDayReservations(date: $Date, filter: $Filter) {
      _id
      kind
      confirm1
      time
      owner {
        _id
        name
        insurance
      }
    }
  }
`;
const GQL_SEND_TO_WAITING = gql`
  mutation ($Res: ReservationInput) {
  sendToWaiting(res:$Res)
}
`
const GQL_ADD_APPOINTMENT = gql`
  mutation($appointmentInput: AppointmentInput) {
    addAppointment(appointmentInput: $appointmentInput) {
      _id
      note
      date
      kind
      insurance
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

const ClinicReservation = () =>
{
  const [state, setState] = useState({
    columns: [
      { title: "Name", field: "name" },
      { title: "Time", field: "time", type: "time" },
      { title: "Type", field: "kind" },
      { title: "Confirmation", field: "confirm", type: "boolean" },
    ],
    data: [
    ],
  });
  const classes = SecretaryCss();


  const handleDateChange = (date) =>
  {
    setSelectedDate(new Date(date).toLocaleDateString());
  };
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString()
  );
  const [reload, setReload] = useState(false);
  const [sendToWaiting] = useMutation(GQL_SEND_TO_WAITING,
    {
      onCompleted: data =>
      {
        setReload(!reload)
      }
    }
  );
  const [addAppointment] = useMutation(GQL_ADD_APPOINTMENT);
  const { loading } = useQuery(GQL_GET_RESERVATIONS, {
    variables: {
      Date: selectedDate,
      Filter: "all",
      refresh: reload,
    },
    onCompleted: (data) =>
    {
      const newDate = data.getDayReservations.map((e) =>
      {
        console.log(e.owner)
        return {
          _id: e._id,
          kind: e.kind,
          time: e.time,
          name: e.owner.name,
          confirm: e.confirm1,
          ownerId: e.owner._id,
          insurance:e.owner.insurance
        };
      });
      setState({ ...state, data: newDate });
    },
  });
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
              <div className={classes.menu}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} p={1}>
                  <KeyboardDatePicker
                    margin="normal"
                    label="Date"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>
          ),
        }}
        options={{
          search: true,
          exportButton: true,
          pageSize: 15,
        }}
        
        actions={[
          (rowData) => ({
            icon: () => <SendIcon />,
            tooltip: "Send To Waiting List",
            onClick: async () =>
            {

              console.log(rowData._id)
              await sendToWaiting({
                variables: {
                  Res: {
                    _id: rowData._id,
                    name: rowData.name,
                    ownerId: rowData.ownerId,
                    kind: rowData.kind,
                    time: rowData.time,
                    confirm1: rowData.confirm
                  }
                }
              })

              await addAppointment({
                variables: {
                  appointmentInput: {
                    note:"",
                    ownerId: rowData.ownerId,
                    date:new Date().toLocaleDateString("en-US"),
                    kind: rowData.kind,
                    insurance:rowData.insurance

                  },
                },
              });



            }

          }),
        ]}
      />
    </Container>
  );
};

export default ClinicReservation;
