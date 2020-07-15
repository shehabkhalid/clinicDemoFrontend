import React, { useState, forwardRef, useContext, useEffect } from "react";
import UserContext from "../../context/user/userContext";
import { WaitingStyle } from "./WaitingCss";
import { useQuery, useLazyQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import MaterialTable from "material-table";
import LaunchIcon from "@material-ui/icons/Launch";
import PatientContext from '../../context/patient/patientContext'
import { Container } from "@material-ui/core";
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from "@material-ui/core/Paper";
import { Route, withRouter } from 'react-router-dom';


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

const GQL_GET_WAITING_LIST = gql`
  query{
    getWaitingList {
    _id
    name
    kind
    time
    ownerId
  }
}

`

const GQL_GET_RECENT_LIST = gql`
  query{
    recent {
    _id
    name
    kind
    time
    ownerId
  }
}

`
const GQL_SEND_TO_RECENT = gql`
  mutation ($Res: ReservationInput) {
    sendToRecent(res:$Res)
}
`

const GQL_REMOVE_FROM_WAITING = gql`
  mutation ($Res: ID) {
    removeFromWaiting(_id:$Res)
}
`
const GQL_GET_PATIENT = gql`

query ($ID:ID) {
 patient(_id:$ID) {
   _id
   name
   yearOfBirth
   gender
   address
   phone
   catagories
   medicalConditionText
   drugTakeText
   knowledgeText
   location
   insurance
 }
}

`


const WaitingList = (props) => {
  const userContext = useContext(UserContext);
  const patientContext = useContext(PatientContext)
  const [sendToRecent] = useMutation(GQL_SEND_TO_RECENT);
  const [removeFromWaiting] = useMutation(GQL_REMOVE_FROM_WAITING)
  useEffect(() => {

    if (!userContext.token) {
      props.history.push("/");
    }
  }, [userContext.token, props.history]);
  const classes = WaitingStyle();

  const [refresh, setRefresh] = useState(false)
  const [state, setState] = useState({
    columns: [
      { title: "Name", field: "name" },

      { title: "Type", field: "kind" },
      { title: "Time", field: "time", type: "time" },
    ],
    data: [

    ],
    data2: [],
    columns2: [
      { title: "Name", field: "name" },
    ],

  });

  const { refetch } = useQuery(GQL_GET_WAITING_LIST, {
    onCompleted: data => {
      setState({ ...state, data: data.getWaitingList })


    },
    fetchPolicy: "cache-and-network"
    ,
    pollInterval: 5000
  }

  )

  useQuery(GQL_GET_RECENT_LIST, {
    onCompleted: data => {
      setState({ ...state, data2: data.recent })


    },
    fetchPolicy: "cache-and-network"
    ,
    pollInterval: 10000
  }

  )




  const [getPatient, { loading }] = useLazyQuery(GQL_GET_PATIENT,
    {
      onCompleted: async data => {

        patientContext.setCurrentPatient(data.patient)


        props.history.push('/profile')




      }
    }


  );


  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };



  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Paper elevation={3}>
        <div className={classes.tabStyle}>
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            variant="fullWidth"
            aria-label="tans"
          >
            <Tab label="Waiting List" />
            <Tab label="Recent" />

          </Tabs>

          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>

              <MaterialTable
                icons={tableIcons}
                title={<h5 style={{ paddingRight: 40 }}></h5>}
                columns={state.columns}
                data={state.data}
                options={{
                  exportButton: true,
                  pageSize: 20,
                }}
                actions={[
                  (rowData) => ({
                    icon: () => <LaunchIcon />,
                    tooltip: "Open",
                    onClick: async () => {
                      let patientId = rowData.ownerId

                      try {


                        await sendToRecent({
                          variables: {

                            Res: {
                              ownerId: patientId,
                              name: rowData.name
                            }
                          }
                        })
                        await removeFromWaiting({
                          variables: {
                            Res: rowData._id
                          }
                        })
                        await getPatient({
                          variables: {
                            ID: patientId
                          }
                        })



                      } catch (error) {
                   
                        console.log({ error })
                      }
                    }
                  }),
                ]}
              />





            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>

              <MaterialTable
                icons={tableIcons}
                title={<h5 style={{ paddingRight: 40 }}></h5>}
                columns={state.columns2}
                data={state.data2}
                options={{

                  pageSize: 30,
                }}
                actions={[
                  (rowData) => ({
                    icon: () => <LaunchIcon />,
                    tooltip: "Open",
                    onClick: async () => {

                      try {

                        await getPatient({
                          variables: {
                            ID: rowData.ownerId
                          }
                        })

                      } catch (error) {

                        console.log({ error })
                      }

                    }
                  }),
                ]}
              />
            </TabPanel>

          </SwipeableViews>
        </div>
      </Paper>
    </main>
  );
};

export default withRouter(WaitingList);