import React, { useState, forwardRef, useContext } from "react";
import PatientContext from "../../context/patient/patientContext";
import MaterialTable from "material-table";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";
import { TextField, useTheme } from "@material-ui/core";
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

const GQL_APPOINTMENTS = gql`
  query($id: ID) {
    patientAppointments(ownerId: $id) {
      _id
      note
      date
      kind
      insurance
    }
  }
`;
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
const GQL_UPDATE_APPOINTMENT = gql`
  mutation($appointmentInput: AppointmentInput) {
    updateAppointment(appointmentInput: $appointmentInput) {
      _id
      note
      date
      kind
      insurance
    }
  }
`;
const GQL_DELETE_APPOINTMENT = gql`
  mutation($id: ID) {
    removeAppointment(_id: $id) {
      _id
      note
      date
      kind
      insurance
    }
  }
`;

const insuranceObj = { none: "none", AXA: "AXA", CBE: "CBE", Cement: "Cement" };
const AppointmentTable = (props) => {
  const patientContext = useContext(PatientContext);

  const [state, setState] = useState({
    columns: [
      {
        title: "Medical Note",
        field: "note",
        editComponent: (props) => (
          <TextField
            multiline
            rows="8"
            style={{ width: "500px" }}
            type="text"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
          />
        ),
      },
      {
        title: "Date",
        field: "date",
        type: "date",
        emptyValue: Date.now(),
        
      },
      {
        title: "Type",
        field: "kind",
        lookup:{"كشف":"كشف","متابعة عمليات":"متابعة عمليات","استشارة":"استشارة","تعاقد":"تعاقد"},

        emptyValue: "كشف",
      },
      {
        title: "Insurance",
        field: "insurance",
        lookup: { none: "none", AXA: "AXA", CBE: "CBE", Cement: "Cement" },
        emptyValue: insuranceObj.none,
      },
    ],
    data: [],
  });

  const { enqueueSnackbar } = useSnackbar();
  const showMessage = (msg, variant) => {
    let time = 1000;
    if (variant === "error") time = 3000;
    enqueueSnackbar(msg, { variant, autoHideDuration: time });
  };

  const [addAppointment] = useMutation(GQL_ADD_APPOINTMENT);
  const [updateAppointment] = useMutation(GQL_UPDATE_APPOINTMENT);
  const [removeAppointment] = useMutation(GQL_DELETE_APPOINTMENT);
  const { loading, refetch } = useQuery(GQL_APPOINTMENTS, {
    variables: {
      id: patientContext._id,
    },
    onCompleted: (data) => {
      setState({ ...state, data: data.patientAppointments });
    },
  });

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

  return (
    <MaterialTable
      style={{ marginTop: useTheme().spacing(2) }}
      icons={tableIcons}
      isLoading={loading}
      title={patientContext.name}
      columns={state.columns}
      data={state.data}
      options={{
        search: true,
        exportButton: true,
        pageSize: 10,
        sorting: true,
      }}
      editable={{
        onRowAdd: async (newRow) => {
          if (!newRow.date)
            newRow.date = new Date().toLocaleDateString("en-US");
          if (!newRow.insurance) newRow.insurance = insuranceObj.none;
          if (!newRow.kind) newRow.kind = "كشف";

          newRow.date = new Date(newRow.date).toDateString('en-US')
          try {
            const newData = await addAppointment({
              variables: {
                appointmentInput: {
                  ...newRow,
                  ownerId: patientContext._id,
                },
              },
            });
            await refetch();
            setState((oldState) => {
              const data = [...oldState.data];
              data.push(newData.data.addAppointment);
              return { ...oldState, data };
            });
            showMessage("Added", "success");
          } catch (error) {
            showMessage(error.message, "error");
          }
        },
        onRowUpdate: async (newData, oldData) => {
          try {
            const newDataGQL = await updateAppointment({
              variables: {
                appointmentInput: {
                  _id: newData._id,
                  note: newData.note,
                  kind: newData.kind,
                  insurance: newData.insurance,
                  date: new Date(newData.date).toLocaleDateString("en-US"),
                },
              },
            });

            console.log(newDataGQL.data.updateAppointment);
            await refetch();
            if (oldData) {
              setState((prevState) => {
                const data = [...prevState.data];
                data[data.indexOf(oldData)] = newDataGQL.data.updateAppointment;
                return { ...prevState, data };
              });
            }

            showMessage("Saved", "success");
          } catch (error) {
            showMessage(error.message, "error");
          }
        },
        onRowDelete: async (oldData) => {
          try {
            await removeAppointment({
              variables: {
                id: oldData._id,
              },
            });
            await refetch();
            setState((prevState) => {
              const data = [...prevState.data];
              data.splice(data.indexOf(oldData), 1);
              return { ...prevState, data };
            });

            showMessage("Deleted", "success");
          } catch (error) {
            showMessage(error.message, "error");
          }
        },
      }}
    />
  );
};

export default AppointmentTable;
