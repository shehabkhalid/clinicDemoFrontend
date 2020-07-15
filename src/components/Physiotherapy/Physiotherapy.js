import React, { useContext, forwardRef, useState } from "react";
import DrawerContext from "../../context/drawer/drawerContext";
import { PhysiotherapyCss } from "./PhysiotherapyCss";
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
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GQL_CATEGORY_QUERY = gql`
  query {
    physiotherapy {
      _id
      name
    }
  }
`;
const GQL_CATEGORY_ADD = gql`
  mutation($Name: String) {
    addPhysiotherapy(name: $Name) {
      _id
      name
    }
  }
`;
const GQL_CATEGORY_UPDATE = gql`
  mutation($Name: String, $Id: ID) {
    updatePhysiotherapy(name: $Name, _id: $Id) {
      _id
      name
    }
  }
`;
const GQL_CATEGORY_DELETE = gql`
  mutation($Id: ID) {
    removePhysiotherapy(_id: $Id) {
      _id
      name
    }
  }
`;

const Physiotherapy = () => {
  const drawerContext = useContext(DrawerContext);
  const handleClose = () => {
    drawerContext.handlePhysiotherapy();
  };
  const classes = PhysiotherapyCss();
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
    columns: [{
      title: "Name", field: "name",
      headerStyle: {
        paddingLeft: '20%'
      },
      render: rowData => (
        <TextField
          style={{ width: '58%', paddingLeft: '20%' }}
          multiline
          rows="6"
          disabled
          type="text"
          value={rowData.name}

        />
      ),
      editComponent: props => (
        <TextField
          multiline
          rows="7"
          style={{ width: '58%', paddingLeft: '20%' }}
          type="text"
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      )


    }],
    data: [


    ]
  });

  const { loading } = useQuery(GQL_CATEGORY_QUERY, {
    onCompleted: (data) => {
      setState({ ...state, data: data.physiotherapy });
    },
  });
  const [addCategory] = useMutation(GQL_CATEGORY_ADD);
  const [updateCategory] = useMutation(GQL_CATEGORY_UPDATE);
  const [removeCategory] = useMutation(GQL_CATEGORY_DELETE);
  const { enqueueSnackbar } = useSnackbar();
  const showMessage = (msg, variant) => {
    let time = 1000;
    if (variant === "error") time = 3000;
    enqueueSnackbar(msg, { variant, autoHideDuration: time });
  };
  return (
    <Dialog
      fullScreen
      open={drawerContext.physiotherapy}
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
          Physiotherapy
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
          options={{
            search: true,
            exportButton: true,
            pageSize: 9,
          }}
          editable={{
            onRowAdd: async (newCategory) => {
              try {
                const newData = await addCategory({
                  variables: {
                    Name: newCategory.name,
                  },
                });
                setState((oldState) => {
                  const data = [...oldState.data];
                  data.push(newData.data.addPhysiotherapy);
                  return { ...oldState, data };
                });
                showMessage("Added", "success");
              } catch (error) {
                showMessage(error.message, "error");
              }
            },
            onRowUpdate: async (newData, oldData) => {
              try {
                const newDataGQL = await updateCategory({
                  variables: {
                    Id: newData._id,
                    Name: newData.name,
                  },
                });

                if (oldData) {
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] =
                      newDataGQL.data.updatePhysiotherapy;
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
                await removeCategory({
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

export default Physiotherapy;