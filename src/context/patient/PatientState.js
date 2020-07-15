import React, { useReducer } from 'react'
import PatientContext from './patientContext'
import PatientReducer from './patientReducer'

// import axios from 'axios'

// import
// {

//     ADD_NEW_PATIENT
// } from '../types'

const PatientState = (props) =>
{
    
    const initialState = {


        _id: "",
        name: "",
        medicalConditionText: "",
        drugTakeText: "",
        knowledgeText: "",
        insurance: "",
     
        yearOfBirth: Number(),
        gender: "",
        address: "",
        location: "",
        medicalConditionArray: [],
        knowledgeArray: [],
        drugTakeArray: [],
        catagories: []


    }

    const [state, dispatch] = useReducer(PatientReducer, initialState);

    const setCurrentPatient = (Patient) =>
    {

       

         dispatch({
            type: 'SET_CURRENT_PATIENT',
            payload: Patient

        })


    }

    return (
        <PatientContext.Provider
            value={{
                ...state,
                setCurrentPatient

            }}


        >
            {props.children}
        </PatientContext.Provider>
    )
}

export default PatientState
