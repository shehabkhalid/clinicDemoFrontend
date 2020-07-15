

export default (state, action) =>
{
  

    switch (action.type)
    {

        
        case 'SET_CURRENT_PATIENT':
            return {

                ...state,
                ...action.payload
            }

        default:
            return state
         
    }

};