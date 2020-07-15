import React, { Fragment, useState, forwardRef, useContext, useEffect } from "react";
import CloseIcon from "@material-ui/icons/Close";
import DrawerContext from "../../context/drawer/drawerContext";
import { useTheme } from "@material-ui/core/styles";
import PatientContext from '../../context/patient/patientContext'
import { useSnackbar } from 'notistack';
import { NewPatientCss } from "./FormsCss";
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from 'react-router-dom';
import clsx from "clsx";
import {
Button, Dialog,
Input, Chip,
MenuItem, AppBar,
Toolbar, IconButton,
Typography, Slide,
TextField, Select,
FormControl, InputLabel,
OutlinedInput, Grid
} from "@material-ui/core";
import test from './test';

const GQL_ADD_PATIENT = gql`
  mutation addPatient($input:PatientInput){
  addPatient(patientInput: $input ) {
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
    
  }
}

`

const methods = [
  "Net / Facebook",
  "Patient referral",
  "Doctor referral",
  "Insurance Company",
  "Friend or Relation"
];

const conditions = [
  "Blood thinning drugs",
  "Hypertension",
  "Heart condition",
  "Diabetes"
];
const drugs = [
  "Blood thinning drugs",
  "Hypertension",
  "Heart condition",
  "Diabetes"
];

function getStyles(name, method, theme) {
  return {
    fontWeight:
      method.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NewPatient = (props) => {

  const initialState = {
    name: "",
    phone: "",
    yearOfBirth: "",
    address: "",
    gender: "Male",
    location: "Maddi",
    insurance: "none",
    knowledgeArray: [],
    medicalConditionArray: [],
    drugTakeArray: [],
    medicalConditionText: "",
    drugTakeText: "",
    knowledgeText: ""
  };

  const [patient, setPatient] = useState(initialState);



  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const drawerContext = useContext(DrawerContext);
  const patientContext = useContext(PatientContext);


  const [addPatientGQL, { loading }] = useMutation(GQL_ADD_PATIENT, { errorPolicy: 'ignore', onCompleted: (data) => { patientContext.setCurrentPatient(data.addPatient) } })
  const createFinalData = () => {

    const newMedicalConditionArray = conditions.map(con => {

      return { name: con, active: patient.medicalConditionArray.includes(con) ? true : false }
    })
    const newKnowledgeArray = methods.map(method => {

      return { name: method, active: patient.knowledgeArray.includes(method) ? true : false }

    })

    const newDrugTakeArray = drugs.map(drug => {

      return { name: drug, active: patient.drugTakeArray.includes(drug) ? true : false }

    })

    const finalData = {

      ...patient,
      knowledgeArray: newKnowledgeArray,
      medicalConditionArray: newMedicalConditionArray,
      drugTakeArray: newDrugTakeArray,
      yearOfBirth: Number(patient.yearOfBirth)

    }
    return finalData

  }


  const action = key => (

    <Fragment>
      <Button onClick={() => { props.history.push('/profile') }}>
        Open Profile
      </Button>
      <Button onClick={() => { closeSnackbar(key) }}>
        Dismiss
    </Button>
    </Fragment>
  )


  const Save = async () => {


    const input = createFinalData()

    try {
      await addPatientGQL({
        variables: {
          input
        }
      })
      setPatient(initialState)
      enqueueSnackbar('Saved', { variant: 'success', action, autoHideDuration: 3000 })
      handleClose()
    } catch (e) {
      enqueueSnackbar(e.message, {
        variant: 'error',
        autoHideDuration: 3000,
      })
    }
  }

  const changeValue = type => event => {

    setPatient({ ...patient, [type]: event.target.value });

  };


  const theme = useTheme();

  const handleClose = () => {
    drawerContext.handleNewPatient();
  };


  const classes = NewPatientCss();
  return (




    <Dialog
      fullScreen
      open={drawerContext.newPatient}
      onClose={handleClose}
      TransitionComponent={Transition}
    >

      {loading && (
        <Backdrop className={classes.backdrop} open={true} >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}


      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            New Patient
          </Typography>
          <Button autoFocus color="inherit" onClick={Save}>
            save
          </Button>
        </Toolbar>
      </AppBar>





      <div style={{marginTop:'100px'}}>
        <Grid container spacing={3}>




          <Grid item xs={12} >
            <FormControl variant="outlined" className={classes.inputCss}>
              <InputLabel htmlFor="nameTxt">Patient Name</InputLabel>
              <OutlinedInput
                id="nameTxt"
                type="text"
                value={patient.name}
                onChange={changeValue("name")}
                labelWidth={150}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.inputCss}>
              <InputLabel htmlFor="phoneTxt">Phone</InputLabel>
              <OutlinedInput
                id="phoneTxt"
                type="number"
                value={patient.phone}
                onChange={changeValue("phone")}
                labelWidth={80}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.inputCss}>
              <InputLabel htmlFor="ageTxt">Age</InputLabel>
              <OutlinedInput
                id="ageTxt"
                type="number"
                value={patient.yearOfBirth}
                onChange={changeValue("yearOfBirth")}
                labelWidth={50}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.inputCss}>
              <InputLabel htmlFor="addressTxt">Address</InputLabel>
              <OutlinedInput
                id="addressTxt"
                type="text"
                value={patient.address}
                onChange={changeValue("address")}
                labelWidth={100}
              />
            </FormControl>
          </Grid>
        </Grid>


      </div>




      <div className={classes.multiSelectCont}>

        <FormControl variant="outlined" className={clsx(classes.formControlSelect, classes.selectStyle)}>
          <InputLabel htmlFor="gender">Gender</InputLabel>
          <Select
            native
            defaultValue="Male"
            value={patient.gender}
            onChange={changeValue("gender")}
            labelWidth="100"
            inputProps={{
              name: "gender",
              id: "gender"
            }}>

            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
        </FormControl>


        <FormControl variant="outlined" className={clsx(classes.formControlSelect, classes.selectStyle)}>

          <InputLabel htmlFor="clinic">Clinic</InputLabel>
          <Select
            native
            defaultValue="Maadi"
            value={patient.location}
            onChange={changeValue('location')}
            labelWidth="100"
            inputProps={{

              name: "clinic",
              id: "clinic"
            }}
          >

            <option value="Maadi" >Maadi</option>
            <option value="El sayeda">El sayeda</option>
            <option value="EL Tagmo3">EL Tagmo3</option>
            <option value="Sheikh zayed">Sheikh zayed</option>
          </Select>
        </FormControl>


        <FormControl variant="outlined" className={clsx(classes.formControlSelect, classes.selectStyle)}>
          <InputLabel htmlFor="insurance">Insurance</InputLabel>
          <Select
            native
            defaultValue="nome"

            value={patient.insurance}
            onChange={changeValue("insurance")}
            labelWidth="100"
            inputProps={{
              name: "insurance",
              id: "insurance"
            }}
          >

            <option value="none">none</option>
            <option>AXA</option>
            <option>CBE</option>
            <option>Cement</option>
          </Select>
        </FormControl>
      </div>


      <div className={classes.multiSelectCont}>

        <div className={classes.multiSelectCont}>
          <FormControl className={clsx(classes.formControlMulti)}>
            <InputLabel id="method">
              Methods of knowledge about the clinic
          </InputLabel>
            <Select
              labelId="method-label"
              id="method"
              multiple
              value={patient.knowledgeArray.map((val) => val.name ? val.name : val)}
              onChange={changeValue('knowledgeArray')}
              input={<Input id="select-multiple-chip" />}
              renderValue={selected => (
                <div className={classes.know}>
                  {selected.map(value => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={classes.PaperProps}
            >
              {methods.map(method => (
                <MenuItem
                  key={method}
                  value={method}
                  style={getStyles(method, patient.knowledgeArray, theme)}
                >
                  {method}
                </MenuItem>
              ))}
            </Select>
          </FormControl>


          <FormControl className={classes.formControlMulti}>
            <InputLabel id="medical-conditions">
              Present of past medical conditions
          </InputLabel>
            <Select
              MenuProps={classes.PaperProps}
              labelId="medical-conditions"
              id="medical"
              multiple
              value={patient.medicalConditionArray}
              onChange={changeValue('medicalConditionArray')}
              input={<Input id="select-multiple-condition" />}
              renderValue={selected => (
                <div className={classes.know}>
                  {selected.map(value => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
            >
              {conditions.map(condition => (
                <MenuItem
                  key={condition}
                  value={condition}
                  style={getStyles(condition, patient.medicalConditionArray, theme)}
                >
                  {condition}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className={classes.formControlMulti}>
            <InputLabel id="medicineCurr">
              Prescription medication currently using
          </InputLabel>
            <Select
              MenuProps={classes.PaperProps}
              labelId="medicineCondition"
              id="medicine"
              multiple
              value={patient.drugTakeArray}
              onChange={changeValue('drugTakeArray')}
              input={<Input id="select-multiple-condition" />}
              renderValue={selected => (
                <div className={classes.know}>
                  {selected.map(value => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
            >
              {drugs.map(drug => (
                <MenuItem
                  key={drug}
                  value={drug}
                  style={getStyles(drug, patient.drugTakeArray, theme)}
                >
                  {drug}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className={classes.multiSelectCont}>
          <form className={classes.multiLine} noValidate autoComplete="off">
            <div>
              <TextField
                id="methods-note"
                label="Methods of knowledge "
                multiline
                rows="7"
                defaultValue=""
                variant="outlined"
                onChange={changeValue('knowledgeText')}
              />
            </div>
          </form>

          <form className={classes.multiLine} noValidate autoComplete="off">
            <div>
              <TextField
                id="conditions-note"
                label="Present of past medical conditions"
                multiline
                rows="7"
                defaultValue=""
                variant="outlined"
                onChange={changeValue('medicalConditionText')}
              />
            </div>
          </form>

          <form className={classes.multiLine} noValidate autoComplete="off">
            <div>
              <TextField
                id="medicine-note"
                label="Prescription medication currently using"
                multiline
                rows="7"
                defaultValue=""
                variant="outlined"
                onChange={changeValue('drugTakeText')}
              />
            </div>
          </form>
        </div>

      </div>


    </Dialog>
  );
};

export default withRouter(NewPatient);
