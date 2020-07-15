import React, { useContext, forwardRef, useState } from "react";
import DrawerContext from "../../context/drawer/drawerContext";
import { InvestigationsCss } from "./InvestigationsCss";
import CloseIcon from "@material-ui/icons/Close";
import MaterialTable from "material-table";
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks';
import
{
  Dialog, AppBar, Toolbar,
  IconButton, Typography, Slide,
  TextField, Container, useTheme
} from "@material-ui/core";

import
{
  ViewColumn, SaveAlt, ChevronLeft,
  ChevronRight, FirstPage, LastPage,
  Check, FilterList, Remove,
  Edit, AddBox, Clear, Search,
  DeleteOutline, ArrowDownward
} from "@material-ui/icons";



const GQL_INVESTIGATION_QUERY = gql`
  query{
    investigations{
      _id
      name
    }
}`
const GQL_INVESTIGATION_ADD = gql`
  mutation ($Name:String){
    addInvestigation(name:$Name) {
      _id
      name
    }
}
`
const GQL_INVESTIGATION_UPDATE = gql`
  mutation ($Name:String,$Id:ID){
    updateInvestigation(name:$Name,_id:$Id) {
      _id
      name
    }
  }
`
const GQL_INVESTIGATION_DELETE = gql`
  mutation ($Id:ID){
	removeInvestigation(_id:$Id) {
	  _id
	  name
	}
}
`

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
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const Transition = forwardRef(function Transition(props, ref)
{
  return <Slide direction="up" ref={ref} {...props} />;
});
const Investigations = () =>
{
  const drawerContext = useContext(DrawerContext);
  const classes = InvestigationsCss();
  const handleClose = () =>
  {
    drawerContext.handleInvestigations();
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
  const { loading } = useQuery(GQL_INVESTIGATION_QUERY, {
    onCompleted: data =>
    {


      setState({ ...state, data: data.investigations })
    }
  })

  const [addInvestigation] = useMutation(GQL_INVESTIGATION_ADD)
  const [updateInvestigations] = useMutation(GQL_INVESTIGATION_UPDATE)
  const [removeInvestigations] = useMutation(GQL_INVESTIGATION_DELETE)

  return (
    <Dialog
      fullScreen
      open={drawerContext.investigation}
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
            Investigations
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
            onRowAdd: async (newInvestigations) =>
            {

              try
              {
                const newData = await addInvestigation({
                  variables: {
                    Name: newInvestigations.name
                  },

                })
                setState(oldState =>
                {
                  const data = [...oldState.data]
                  data.push(newData.data.addInvestigation)
                  return { ...oldState, data }
                })

              } catch (error)
              {

              }

            },
            onRowUpdate: async (newData, oldData) =>
            {

              try
              {

                const newDataGQL = await updateInvestigations({
                  variables: {
                    Id: newData._id,
                    Name: newData.name
                  }
                })



                if (oldData)
                {
                  setState(prevState =>
                  {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newDataGQL.data.updateInvestigation

                    return { ...prevState, data };
                  });
                }

              } catch (error)
              {

              }
            },
            onRowDelete: async oldData =>
            {
              try
              {

                await removeInvestigations({
                  variables:
                  {
                    Id: oldData._id
                  }
                })

                setState(prevState =>
                {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              } catch (error) 
              {


              }

            }

          }}
        />
      </Container>
    </Dialog>

  );
};

export default Investigations;
