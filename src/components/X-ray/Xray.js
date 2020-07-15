import React, { useContext, forwardRef, useState } from "react";
import DrawerContext from "../../context/drawer/drawerContext";
import { XrayCss } from "./XrayCss";
import CloseIcon from "@material-ui/icons/Close";
import MaterialTable from "material-table";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Container,
  useTheme,
  Dialog,
  TextField,
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

const GQL_XRAY_QUERY = gql`
  query {
    xrays {
      _id
      name
    }
  }
`;
const GQL_XRAY_ADD = gql`
  mutation($Name: String) {
    addXray(name: $Name) {
      _id
      name
    }
  }
`;
const GQL_XRAY_UPDATE = gql`
  mutation($Name: String, $Id: ID) {
    updateXray(name: $Name, _id: $Id) {
      _id
      name
    }
  }
`;
const GQL_XRAY_DELETE = gql`
  mutation($Id: ID) {
    removeXray(_id: $Id) {
      _id
      name
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

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Xray = () => {
  const drawerContext = useContext(DrawerContext);
  const classes = XrayCss();
  const handleClose = () => {
    drawerContext.handleXray();
  };

  const [state, setState] = useState({
    columns: [
      {
        title: "Name",
        field: "name",
        headerStyle: {
          paddingLeft: "20%",
        },
        render: (rowData) => (
          <TextField
            style={{ width: "58%", paddingLeft: "20%" }}
            multiline
            rows="6"
            disabled
            type="text"
            value={rowData.name}
          />
        ),
        editComponent: (props) => (
          <TextField
            multiline
            rows="7"
            style={{ width: "58%", paddingLeft: "20%" }}
            type="text"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
          />
        ),
      },
    ],
    data: [],
  });

  const { loading } = useQuery(GQL_XRAY_QUERY, {
    onCompleted: (data) => {
      setState({ ...state, data: data.xrays });
    },
  });
  const [addXray] = useMutation(GQL_XRAY_ADD);
  const [updateXray] = useMutation(GQL_XRAY_UPDATE);
  const [removeXray] = useMutation(GQL_XRAY_DELETE);

  const { enqueueSnackbar } = useSnackbar();
  const showMessage = (msg, variant) => {
    let time = 1000;
    if (variant === "error") time = 3000;
    enqueueSnackbar(msg, { variant, autoHideDuration: time });
  };
  return (
    <Dialog
      fullScreen
      open={drawerContext.xray}
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
            X-Ray
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <MaterialTable
          style={{ marginTop: useTheme().spacing(2) }}
          icons={tableIcons}
          title=""
          columns={state.columns}
          data={state.data}
          isLoading={loading}
          options={{
            search: true,
            exportButton: true,
            pageSize: 9,
            
          }}
          editable={{
            onRowAdd: async (newXray) => {
              try {
                const newData = await addXray({
                  variables: {
                    Name: newXray.name,
                  },
                });
                setState((oldState) => {
                  const data = [...oldState.data];
                  data.push(newData.data.addXray);
                  return { ...oldState, data };
                });
                showMessage("Added", "success");
              } catch (error) {
                showMessage(error.message, "error");
              }
            },
            onRowUpdate: async (newData, oldData) => {
              try {
                const newDataGQL = await updateXray({
                  variables: {
                    Id: newData._id,
                    Name: newData.name,
                  },
                });

                if (oldData) {
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newDataGQL.data.updateXray;
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
                await removeXray({
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

export default Xray;
