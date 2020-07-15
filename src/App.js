import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginForm from './components/forms/LoginForm'
import NewPatient from './components/forms/NewPatient';
import UserState from './context/user/UserState'
import DashBoard from './components/DashBoard/DashBoard';
import Navbar from './components/navbar/Navbar'
import WaitingList from './components/WaitingList/WaitingList'
import DrawerState from './context/drawer/drawerState'
import Reservation from './components/Reservation/Reservation'
import Insurance from './components/Insurance/Insurance'
import PatientProfile from './components/PatientProfile/PatientProfile'
import ReactGA from 'react-ga';
import PatientState from './context/patient/PatientState'
import Client from './context/graphqlClient'
import Info from './components/PatientProfile/Info'

import { SnackbarProvider  } from 'notistack';

import { ApolloProvider } from '@apollo/react-hooks';


function App()
{



  useEffect(() =>
  {

    ReactGA.initialize('UA-161575215-1');

    ReactGA.pageview(window.location.pathname + window.location.search);



  }, [])

  const reload = () => window.location.reload();
  

  return (


    <SnackbarProvider dense maxSnack={5}>
    

      <ApolloProvider client={Client} >
        < UserState >
          <DrawerState>
            <PatientState>

              <Router>
                <Navbar />
                <Switch>

                  <Route exact path='/waiting' component={WaitingList} />
                  <Route exact path='/profile' component={PatientProfile} />
                  <Route exact path='/' component={LoginForm} />
                  <Route exact path='/add' component={NewPatient} />
                  <Route exact path='/home' component={DashBoard} />
                  <Route exact path='/reservation' component={Reservation} />
                  <Route exact path='/insurance' component={Insurance} />
                  <Route exact path='/loaderio-85b6f8ed94dfd608703be1fea9f27b1a.txt' onEnter={reload}/>

                </Switch>
              </Router>
            </PatientState>


          </DrawerState>
        </UserState >
      </ApolloProvider>
    </SnackbarProvider>
  );
}

export default App;
