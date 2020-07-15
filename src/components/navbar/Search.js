import React, { useState, useContext, useEffect , useRef} from 'react'

import { TextField, CircularProgress, InputBase } from "@material-ui/core";
import { Autocomplete } from '@material-ui/lab';
import gql from 'graphql-tag'
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import PatientContext from '../../context/patient/patientContext'
import { withRouter } from 'react-router-dom';
const GQL_SEARCH = gql`
query search($patientName:String){
  search(name:$patientName) {
    _id
    name
    yearOfBirth
    gender
    address
    phone
    medicalConditionText
    drugTakeText
    knowledgeText
    location
    insurance
    medicalConditionArray {
      name
      active
    }
    knowledgeArray {
      name
      active
    }
    drugTakeArray {
      name
      active
    }
    catagories
  }
}
`
const Search = (props) =>
{


    const patientContext = useContext(PatientContext)
    
    
    const { classes } = props
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [searchText, setSearchText] = useState("")
    const { loading, refetch } = useQuery(GQL_SEARCH, {
        variables: {
            patientName: searchText
        },
        onCompleted: data =>
        {
            setOptions(data.search)
        }
    })
    return (
        <Autocomplete
           
            inputValue={searchText}
            id="asynchronous-demo"
            className={classes.autoComplete}
            open={open}
            freeSolo
            clearOnEscape
            
            onOpen={() =>
            {
                setOpen(true);
            }}
            onClose={() =>
            {
                setOpen(false);
            }}


            onChange={(value, option) =>
            {
 
              
             
                patientContext.setCurrentPatient(option)
                setOptions([])
                setSearchText("")             
                if (option)
                {
                    props.history.push('/profile')
                }

            }}

           
            getOptionSelected={(option, value) => option._id === value._id}

            getOptionLabel={option => option.name}
            options={options}
            loading={loading}


            renderInput={params => (
                <TextField
                    dir="rtl"
                    onChange={(event) =>
                    {

                        setSearchText(event.target.value)
                        refetch()

                    }}
                    {...params}
                    label="Search Patient"
                    variant="filled"


                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? (
                                    <CircularProgress color="inherit" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        )
                    }}
                />
            )}
        />
    )
}

export default withRouter(Search)
