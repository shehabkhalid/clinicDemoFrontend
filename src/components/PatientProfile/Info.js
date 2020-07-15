import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Container } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import { InfoCss } from "./InfoCss";

import {
  Input,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";

const GQL_CATEGORY_QUERY = gql`
  query {
    categories {
      _id
      name
    }
  }
`;

const methods = [
  "Net / Facebook",
  "Patient referral",
  "Doctor referral",
  "Insurance Company",
  "Friend or Relation",
];

const conditions = [
  "Blood thinning drugs",
  "Hypertension",
  "Heart condition",
  "Diabetes",
];
const drugs = [
  "Blood thinning drugs",
  "Hypertension",
  "Heart condition",
  "Diabetes",
];
const Info = () => {
  const classes = InfoCss();

  const theme = useTheme();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const changeValue = (type) => (event) => {
    setPatient({ ...patient, [type]: event.target.value });
  };
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
    knowledgeText: "",
  };
  const [patient, setPatient] = useState(initialState);
  // const categoriesList = ["1st MTP OA", "AAFFD", "ACL Partial", "ACL Sprain"];
  const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const { loading } = useQuery(GQL_CATEGORY_QUERY, {
    onCompleted: (data) => {
      setState({ ...state, data: data.categories });
    },
  });

  return (
    <Container>
      <Paper elevation={3} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <div className={classes.flex2}>
            <TextField
              id="name"
              label="Name"
              defaultValue="Mohamed"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              id="phone"
              label="Phone"
              defaultValue="0115556698"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              id="address"
              label="Address"
              defaultValue="5001 m3raga"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              id="age"
              label="Age"
              defaultValue="21"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        </form>
        <div className={classes.flex}>
          <div className={classes.multiSelectCont}>
            <FormControl className={clsx(classes.formControlMulti)}>
              <InputLabel id="method">
                Methods of knowledge about the clinic
              </InputLabel>
              <Select
                labelId="method-label"
                id="method"
                multiple
                value={patient.knowledgeArray.map((val) =>
                  val.name ? val.name : val
                )}
                onChange={changeValue("knowledgeArray")}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div className={classes.know}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={classes.PaperProps}
              >
                {methods.map((method) => (
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
                onChange={changeValue("medicalConditionArray")}
                input={<Input id="select-multiple-condition" />}
                renderValue={(selected) => (
                  <div className={classes.know}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
              >
                {conditions.map((condition) => (
                  <MenuItem
                    key={condition}
                    value={condition}
                    style={getStyles(
                      condition,
                      patient.medicalConditionArray,
                      theme
                    )}
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
                onChange={changeValue("drugTakeArray")}
                input={<Input id="select-multiple-condition" />}
                renderValue={(selected) => (
                  <div className={classes.know}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
              >
                {drugs.map((drug) => (
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
            <div className={classes.select}>
              <FormControl
                variant="outlined"
                className={clsx(classes.formControlSelect, classes.selectStyle)}
              >
                <InputLabel htmlFor="gender">Gender</InputLabel>
                <Select
                  native
                  defaultValue="Male"
                  value={patient.gender}
                  onChange={changeValue("gender")}
                  labelWidth="100"
                  inputProps={{
                    name: "gender",
                    id: "gender",
                  }}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Select>
              </FormControl>

              <FormControl
                variant="outlined"
                className={clsx(classes.formControlSelect, classes.selectStyle)}
              >
                <InputLabel htmlFor="clinic">Clinic</InputLabel>
                <Select
                  native
                  defaultValue="Maadi"
                  value={patient.location}
                  onChange={changeValue("location")}
                  labelWidth="100"
                  inputProps={{
                    name: "clinic",
                    id: "clinic",
                  }}
                >
                  <option value="Maadi">Maadi</option>
                  <option value="El sayeda">El sayeda</option>
                </Select>
              </FormControl>

              <FormControl
                variant="outlined"
                className={clsx(classes.formControlSelect, classes.selectStyle)}
              >
                <InputLabel htmlFor="insurance">Insurance</InputLabel>
                <Select
                  native
                  defaultValue="nome"
                  value={patient.insurance}
                  onChange={changeValue("insurance")}
                  labelWidth="100"
                  inputProps={{
                    name: "insurance",
                    id: "insurance",
                  }}
                >
                  <option value="none">none</option>
                  <option>AXA</option>
                  <option>CBE</option>
                  <option>Cement</option>
                </Select>
              </FormControl>
              <div className={classes.cat}>
                <Autocomplete
                  isLoading={loading}
                  multiple
                  id="categories"
                  options={loading}
                  // getOptionLabel={(option) => option}
                  defaultValue={loading}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Categories"
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className={classes.flex}>
            <div className={classes.multiSelectCont}>
              <form className={classes.multiLine} noValidate autoComplete="off">
                <div>
                  <TextField
                    id="methods-note"
                    label="Methods of knowledge "
                    multiline
                    rows="2"
                    defaultValue=""
                    variant="outlined"
                    // onChange={changeValue('knowledgeText')}
                  />
                </div>
              </form>

              <form className={classes.multiLine} noValidate autoComplete="off">
                <div>
                  <TextField
                    id="conditions-note"
                    label="Present of past medical conditions"
                    multiline
                    rows="2"
                    defaultValue=""
                    variant="outlined"
                    // onChange={changeValue('medicalConditionText')}
                  />
                </div>
              </form>

              <form className={classes.multiLine} noValidate autoComplete="off">
                <div>
                  <TextField
                    id="medicine-note"
                    label="Prescription medication currently using"
                    multiline
                    rows="2"
                    defaultValue=""
                    variant="outlined"
                    // onChange={changeValue('drugTakeText')}
                  />
                </div>
              </form>
              <div></div>
            </div>
            <FormControlLabel
              control={
                <Switch
                  checked={state.checkedA}
                  onChange={handleChange}
                  name="checkedA"
                />
              }
              label="Edit"
            />
          </div>
        </div>
      </Paper>
    </Container>
  );
};

export default Info;
