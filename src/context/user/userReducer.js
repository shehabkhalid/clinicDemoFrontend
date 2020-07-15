import
{

    LOGIN, LOADING, ERROR
} from '../types'

export default (state, action) =>
{

    switch (action.type)
    {
        case 'SAVE_USER':
            return {
                ...state,
                userName: action.payload.userName,
                role: action.payload.role,
                token: true,

            }
        default:
            return state

    }

};