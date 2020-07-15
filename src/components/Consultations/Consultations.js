import React, { useState, useContext, forwardRef } from "react";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DrawerContext from "../../context/drawer/drawerContext";
import MaterialTable from "material-table";
import { ConsultationsCss } from "./ConsultationsCss";

import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import SaveAlt from "@material-ui/icons/SaveAlt";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Check from "@material-ui/icons/Check";
import FilterList from "@material-ui/icons/FilterList";
import Remove from "@material-ui/icons/Remove";
import Edit from "@material-ui/icons/Edit";
import AddBox from "@material-ui/icons/AddBox";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import ArrowDownward from "@material-ui/icons/ArrowDownward";

import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Container,
  useTheme,
} from "@material-ui/core";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Consultations = (props) => {
  const classes = ConsultationsCss();
  const drawerContext = useContext(DrawerContext);
  const handleClose = () => {
    drawerContext.handleConsultations();
  };
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
  const [state, setState] = useState({
    columns: [
      { title: "Date", field: "date" },
      { title: "Day", field: "day" },
      { title: "Left", field: "left", type: "numeric" },
    ],
    data: [
      
      
     
     
     
      {
        date: '19/07/2020', day:'Sunday', left: '5'
      },
      {
        date: '20/07/2020', day:'Monday', left: '5'
      },
      {
        date: '21/07/2020', day:'Tuesday', left: '5'
      },
      {
        date: '26/07/2020', day:'Sunday', left: '5'
      },
      {
        date: '27/07/2020', day:'Monday', left: '5'
      },
      {
        date: '28/07/2020', day:'Tuesday', left: '5'
      },
      {
        date: '9/08/2020', day:'Sunday', left: '5'
      },
      {
        date: '10/08/2020', day:'Monday', left: '5'
      },
      {
        date: '11/08/2020', day:'Tuesday', left: '5'
      },
    ],
  });
  const getRowColor = (day) => {
    switch (day) {
      case "Tuesday":
        return "#3f51b5";
      // case "Monday":
      //   return "#673ab7";
      // case "Tuesday":
      //   return "#26a69a";
    }
  };

  return (
    <Dialog
      fullScreen
      open={drawerContext.consultations}
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
            Consultations
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <MaterialTable
          style={{ marginTop: useTheme().spacing(2) }}
          icons={tableIcons}
          columns={state.columns}
          data={state.data}
          options={{
            search: false,
            exportButton: true,
            rowStyle: (rowData) => ({
              backgroundColor: getRowColor(rowData.day),
            }),

            pageSize: 15,
            showTitle: false,
          }}
          editable={{
            // onRowAdd: (newData) =>
            //   new Promise((resolve) => {
            //     setTimeout(() => {
            //       resolve();
            //       setState((prevState) => {
            //         const data = [...prevState.data];
            //         data.push(newData);
            //         return { ...prevState, data };
            //       });
            //     }, 600);
            //   }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = newData;
                      return { ...prevState, data };
                    });
                  }
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
          }}
          actions={[
            (rowData) => ({
              icon: () => <AddIcon />,
              tooltip: "Add one",
              onClick: (event, rowData) => {
                console.log(rowData.tableData.id);
                const data = state.data;
                data[rowData.tableData.id].left++;

                setState({ ...state, data });
              },
              disabled: rowData.left == 5,
            }),
            (rowData) => ({
              icon: () => <RemoveIcon />,
              tooltip: "Remove one",
              onClick: (event, rowData) => {
                console.log(rowData.tableData.id);
                const data = state.data;
                data[rowData.tableData.id].left--;

                setState({ ...state, data });
              },
              disabled: rowData.left == 0,
            }),
          ]}
        />
      </Container>
    </Dialog>
  );
};

export default Consultations;
