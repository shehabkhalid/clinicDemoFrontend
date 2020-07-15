import React, { useReducer } from 'react'
import drawerReducer from './drawerReducer'
import drawerContext from './drawerContext'
import {NEWPATIENT , MEDICINE, CONSULTATIONS , XRAY, INVESTIGATION, PHYSIOTHERAPY, CONTROLPANEL} from '../../context/types'


const DrawerState = props =>
{

    const initialState = {

        newPatient :  false,
        medicine: false,
        consultations:false,
        xray:false,
        investigation: false,
        catagories: false,
        Physiotherapy: false,
        control: false,
    };
    const [state, dispatch] = useReducer(drawerReducer,initialState);

    const handleNewPatient = () =>
    {
        dispatch({ type: NEWPATIENT})
    }

    const handleXray = ()=>{
        dispatch({type:XRAY})
    }

    const handleConsultations = () =>{
        dispatch({type:CONSULTATIONS})
    }
    
    const handleMedicine = () =>{
        dispatch({type: MEDICINE})
    }
    const handleInvestigations = () =>{
        dispatch({type:INVESTIGATION})
    }
    const handleCatagories = () =>{
        dispatch({type:'CATAGORIES'})
    }
    const handlePhysiotherapy = () =>{
        dispatch({type:'PHYSIOTHERAPY'})
    }
    const handleControlPanel = () =>{
        dispatch({type:'CONTROLPANEL'})
    }

    return (
        <drawerContext.Provider

            value={{
                ...state,
                handleNewPatient,
                handleMedicine,
                handleConsultations,
                handleXray,
                handleInvestigations,
                handleCatagories,
                handlePhysiotherapy,
                handleControlPanel
            }}
        >
            {props.children}
        </drawerContext.Provider>


    )
}

export default DrawerState
