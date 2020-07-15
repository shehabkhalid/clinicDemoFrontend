import React, { useState, forwardRef, useContext } from "react";
import PatientContext from "../../context/patient/patientContext";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack"
import MaterialTable, { MTableToolbar } from "material-table";
import { style } from "./ReservationProfileCss";
import Chip from "@material-ui/core/Chip";
import
{
  MuiPickersUtilsProvider,
  DatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import
{
  Search, ViewColumn, SaveAlt, ChevronLeft, ChevronRight, FirstPage, LastPage, Check,
  FilterList, Remove, Edit, AddBox, Clear, DeleteOutline, ArrowDownward,
} from "@material-ui/icons";

const GQL_GET_PATIENT_LAST_RESERVATION = gql`

  query ($ownerId:ID) {
    getPatientLastReservation(ownerId:$ownerId) {
      _id
      date
      kind
      confirm2
      time
    }
  }

`
const GQL_ADD_RESERVATION = gql`
  mutation($input:ReservationInput)
{
  
  addReservation(reservationInput:$input) {
    _id
      date
      kind
      confirm2
      time

  }
}

`
function disableDates(date)
{
  return !(date.getDay() === 0 || date.getDay() === 1 || date.getDay() === 2)
}
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
  SortArrow: forwardRef((props, ref) => (
    <ArrowDownward {...props} ref={ref} />
  )),
  ThirdStateCheck: forwardRef((props, ref) => (
    <Remove {...props} ref={ref} />
  )),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};
const ReservationProfile = () =>
{

  const patientContext = useContext(PatientContext);
  const showMessage = (msg, variant) =>
  {
    let time = 1000;
    if (variant === "error") time = 3000;
    enqueueSnackbar(msg, { variant, autoHideDuration: time });
  };
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({
    columns: [
      {
        title: "Date", field: "date", type: "date",

        editComponent: props => (


          <MuiPickersUtilsProvider utils={DateFnsUtils} p={1}>
            <DatePicker
              margin="normal"
              label="Date"
              style={{ minWidth: 100 }}

              format="MM/dd/yyyy"
              value={props.value}
              onChange={e => props.onChange(e)}
              KeyboardButtonProps={{ "aria-label": "change date", }}
              
            />
          </MuiPickersUtilsProvider>

        )
      },

      {
        title: "Kind",
        field: "kind",
        lookup: { استشارة: ' استشارة', تعاقد: ' تعاقد ', 'متابعة عمليات': ' متابعة عمليات', كشف: ' كشف' }
      },
      { title: "Time", field: "time", type: "text", editable: "never" },
      {
        title: "Came Last Visit",
        field: "confirm2",
        editable: "never",
        lookup: { true: true, false: false },
      },
    ],
    data: [],
  });

  const { loading } = useQuery(GQL_GET_PATIENT_LAST_RESERVATION, {
    variables: {
      ownerId: patientContext._id
    },
    onCompleted: data =>
    {

    
  
      setState({ ...state, data: data.getPatientLastReservation })


    },
    
  })
  const [addReservation] = useMutation(GQL_ADD_RESERVATION)

  const classes = style();

  return (
    <MaterialTable
      title={patientContext.name}
      icons={tableIcons}
      columns={state.columns}
      isLoading={loading}
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
          </div>
        ),
      }}
      options={{
        paging: false,
        minBodyHeight: 300,
        search: false,
      }}
      actions={[
        (rowData) => ({
          icon: () => <ChevronRight />,
          disabled: true,
        }),
      ]}
      editable={{
        onRowAdd: async (newRow) =>
        {
          try
          {

            if (!newRow.date)
            {

              newRow.date = new Date().toDateString('en-US')
            }

          

            if (!newRow.kind) throw new Error("Kind Must Be Not Empty");

            if (disableDates(new Date(newRow.date)))
              throw new Error("Date Must Be in Working Days");
              
              newRow.date = new Date(newRow.date).toDateString('en-US')
          
           const data =  await addReservation({
              variables: {
                input: {

                  ownerId: patientContext._id,
                  kind: newRow.kind,
                  date: newRow.date
                },
              },
            })
            setState({ ...state, data: [data.data.addReservation] })

            showMessage("Added", "success");
          } catch (error)
          {
            showMessage(error.message, "error");
          }
        },
      }}
    />
  );
};

export default ReservationProfile;
