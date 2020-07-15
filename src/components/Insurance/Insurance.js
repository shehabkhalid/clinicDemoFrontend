import React, { useState, forwardRef, useContext, useEffect } from "react";

import UserContext from "../../context/user/userContext";
import { InsuranceCss } from "./InsuranceCss";
import clsx from "clsx";

import MaterialTable, { MTableToolbar } from "material-table";

import {
  Select,
  FormControl,
  InputLabel,
  Container,
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

const Insurance = (props) => {
  const userContext = useContext(UserContext);
  useEffect(() => {
    if (!userContext.token) {
      props.history.push("/");
    }
  }, [userContext.token, props.history]);
  const classes = InsuranceCss();
  const [state, setState] = useState({
    columns: [
      { title: "Name", field: "name" },

      { title: "Company", field: "company" },
      { title: "Date", field: "date", type: "date" },
    ],
    data: [
     
    ],
  });

  return (
    <Container maxWidth="lg" className={classes.content}>
      <div className={classes.toolbar} />
      <MaterialTable
        icons={tableIcons}
        title={<h2 style={{ paddingRight: 40 }}>Insurance</h2>}
        columns={state.columns}
        data={state.data}
        components={{
          Toolbar: (props) => (
            <div className={classes.menu}>
            <MTableToolbar {...props} />
            
              <FormControl
                className={clsx(classes.formControlSelect, classes.selectStyle)}
              >
                <InputLabel htmlFor="gender"></InputLabel>
                <Select
                  native
                  defaultValue="All Reservations"
                  // value={patient.gender}
                  // onChange={changeValue("")}
                  labelWidth="100"
                  inputProps={{
                    name: "menu",
                    id: "menu",
                  }}
                >
                  <option value="all">All</option>
                  <option value="axa">AXA</option>
                  <option value="cbe">CBE</option>
                  <option value="cement">Cement</option>
                </Select>
              </FormControl>
            </div>
          ),
        }}
        options={{
          search: true,
          exportButton: true,
          pageSize: 15,
        }}
      />
    </Container>
  );
};

export default Insurance;
