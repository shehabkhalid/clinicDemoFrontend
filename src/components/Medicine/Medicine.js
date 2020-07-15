import React, { useState, forwardRef, useContext } from "react";
import CloseIcon from "@material-ui/icons/Close";
import DrawerContext from "../../context/drawer/drawerContext";
import { MedicineCss } from "./MedicineCss";
import MaterialTable from "material-table";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";

import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  TextField,
  Container,
  useTheme,
} from "@material-ui/core";
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

const GQL_MEDICINE_QUERY = gql`
  query {
    medicines {
      _id
      name
      description
    }
  }
`;
const GQL_MEDICINE_ADD = gql`
  mutation($Input: MedicineInput) {
    addMedicine(medicineInput: $Input) {
      _id
      name
      description
    }
  }
`;
const GQL_MEDICINE_UPDATE = gql`
  mutation($Input: MedicineInput) {
    updateMedicine(medicineInput: $Input) {
      _id
      name
      description
    }
  }
`;
const GQL_MEDICINE_DELETE = gql`
  mutation($Id: ID) {
    removeMedicine(_id: $Id) {
      _id
    }
  }
`;

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Medicine = (props) => {
  const drawerContext = useContext(DrawerContext);
  const classes = MedicineCss();
  const handleClose = () => {
    drawerContext.handleMedicine();
  };

  const [state, setState] = useState({
    columns: [
      {
        title: "Name",
        field: "name",
      },

      {
        title: "Description",
        field: "description",
        editComponent: (props) => (
          <TextField
            dir="rtl"
            multiline
            rows="7"
            style={{ width: "auto" }}
            type="text"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
          />
        ),
      },
    ],
    data: [],
  });

  const { loading } = useQuery(GQL_MEDICINE_QUERY, {
    onCompleted: (data) => {
      setState({ ...state, data: data.medicines });
    },
  });
  const [addMedicine] = useMutation(GQL_MEDICINE_ADD);
  const [updateMedicine] = useMutation(GQL_MEDICINE_UPDATE);
  const [removeMedicine] = useMutation(GQL_MEDICINE_DELETE);

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
  const { enqueueSnackbar } = useSnackbar();
  const showMessage = (msg, variant) => {
    let time = 1000;
    if (variant === "error") time = 3000;
    enqueueSnackbar(msg, { variant, autoHideDuration: time });
  };

  return (
    <Dialog
      fullScreen
      open={drawerContext.medicine}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Medicine
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <MaterialTable
          isLoading={loading}
          style={{ marginTop: useTheme().spacing(2) }}
          icons={tableIcons}
          title=""
          columns={state.columns}
          data={state.data}
          options={{
            search: true,
            exportButton: true,
            pageSize: 15,
          }}
          editable={{
            onRowAdd: async (newMedicine) => {
              try {
                const newData = await addMedicine({
                  variables: {
                    Input: {
                      name: newMedicine.name,
                      description: newMedicine.description,
                    },
                  },
                });
                setState((oldState) => {
                  const data = [...oldState.data];
                  data.push(newData.data.addMedicine);
                  return { ...oldState, data };
                });
                showMessage("Added", "success");
              } catch (error) {
                showMessage(error.message, "error");
              }
            },
            onRowUpdate: async (newData, oldData) => {
              try {
                const newDataGQL = await updateMedicine({
                  variables: {
                    Input: {
                      _id: newData._id,
                      name: newData.name,
                      description: newData.description,
                    },
                  },
                });

                if (oldData) {
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] =
                      newDataGQL.data.updateMedicine;
                    return { ...prevState, data };
                  });
                }
                showMessage("Edited", "success");
              } catch (error) {
                showMessage(error.message, "error");
              }
            },
            onRowDelete: async (oldData) => {
              try {
                await removeMedicine({
                  variables: {
                    Id: oldData._id,
                  },
                });

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
      </Container>
    </Dialog>
  );
};

export default Medicine;
