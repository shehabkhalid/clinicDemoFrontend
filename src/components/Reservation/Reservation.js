import React, { useEffect, useContext } from 'react';
import DoctorReservation from './DoctorReservation';
import Secretary from './secretaryReservation/Secretary';
import ClinicReservation from './secretaryReservation/ClinicReservation'
import UserContext from '../../context/user/userContext'
const Reservation = (props) =>
{

  const userContext = useContext(UserContext);
  useEffect(() =>
  {
    if (!userContext.token)
    {
      props.history.push("/");
    }

  }, [userContext.token, props.history]);


  if (userContext.role === 'admin')
    return ( <DoctorReservation></DoctorReservation> )
  else if (userContext.role === 'sec')
    return (<Secretary></Secretary>)
  else
    return (<ClinicReservation></ClinicReservation>)
}

export default Reservation
