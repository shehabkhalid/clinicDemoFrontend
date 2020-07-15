import { NEWPATIENT, MEDICINE , CONSULTATIONS , XRAY , INVESTIGATION, PHYSIOTHERAPY, CONTROLPANEL } from '../types'




export default (state, action) =>
{


    switch (action.type)
    {
        case NEWPATIENT:
            return {

                ...state,
                newPatient: !state.newPatient,
            }
        case MEDICINE:
            return {
                ...state,
                medicine: !state.medicine,
            }
        case CONSULTATIONS:
            return{
                ...state,
                consultations:!state.consultations,
            }
        case XRAY:
            return{
                ...state,
                xray:!state.xray,
            }
        case INVESTIGATION:
            return{
                ...state,
                investigation:!state.investigation,
            }
        case 'CATAGORIES':
            return{
                ...state,
                catagories:!state.catagories
            }
        case 'PHYSIOTHERAPY':
            return{
                ...state,
                physiotherapy:!state.physiotherapy,
            }

        case 'CONTROLPANEL':
            return{
                ...state,
                control:!state.control,
            }


        default:
            return state
    }

};