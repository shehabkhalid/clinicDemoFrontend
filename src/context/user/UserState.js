import React, { useReducer } from 'react'
import UserContext from './userContext'
import UserReducer from './userReducer'
import { LOGIN, LOADING, ERROR } from '../types'

import { gql } from 'apollo-boost'
import { useLazyQuery } from '@apollo/react-hooks';
import axios from 'axios'


const UserState = props =>
{

    const initialState = {
        userName: "",
        role: "",
        token: false
    }



    const [state, dispatch] = useReducer(UserReducer, initialState)

    const saveUser = ({userName,role,token}) =>
    {
     
        localStorage.setItem("token", token);
        const data = {
            userName,
            role,
        }
        dispatch({ type: 'SAVE_USER', payload: data })


    }


    return (
        <UserContext.Provider
            value={{
                ...state,
                saveUser,
            }}


        >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState
