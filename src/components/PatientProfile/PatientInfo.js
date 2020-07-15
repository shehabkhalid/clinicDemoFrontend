import React, { useState, useEffect, useContext } from "react";
import { PatientInfoCss } from "./PatientInfoCss";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import IconButton from "@material-ui/core/IconButton";
import
{
  Button,
  Input,
  Chip,
  MenuItem,
  Select,
  FormControl,
  CircularProgress,
  InputLabel,
  TextField,
  FormControlLabel,
  Switch,
  Backdrop,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { useTheme } from "@material-ui/core/styles";
import PatientContext from "../../context/patient/patientContext";
import { useSnackbar } from "notistack";
import DeleteIcon from "@material-ui/icons/Delete";

const GQL_CATEGORY_QUERY = gql`
  query {
    categories {
     
      name
    }
  }
`;

const GQL_UPDATE_PATIENT = gql`
  mutation($input: PatientInput) {
    updatePatient(patientInput: $input) {
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
      drugTakeArray {
        name
        active
      }
      knowledgeArray {
        name
        active
      }
      catagories
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


function getStyles(name, personName, theme)
{
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const PatientInfo = () =>
{
  const classes = PatientInfoCss();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const showMessage = (msg, variant) =>
  {
    let time = 1000;
    if (variant === "error") time = 3000;
    enqueueSnackbar(msg, { variant, autoHideDuration: time });
  };

  const initialState = {
    name: "",
    phone: "",
    yearOfBirth: "",
    address: "",
    gender: "",
    location: "",
    insurance: "",
    knowledgeArray: [],
    medicalConditionArray: [],
    drugTakeArray: [],
    medicalConditionText: "",
    drugTakeText: "",
    knowledgeText: "",
    catagories: [],
  };
  const [patient, setPatient] = useState(initialState);
  const createFinalData = () =>
  {
    const newMedicalConditionArray = conditions.map((con) =>
    {
      return {
        name: con,
        active: patient.medicalConditionArray.includes(con) ? true : false,
      };
    });
    const newKnowledgeArray = methods.map((method) =>
    {
      return {
        name: method,
        active: patient.knowledgeArray.includes(method) ? true : false,
      };
    });

    const newDrugTakeArray = drugs.map((drug) =>
    {
      return {
        name: drug,
        active: patient.drugTakeArray.includes(drug) ? true : false,
      };
    });

    const finalData = {
      ...patient,
      knowledgeArray: newKnowledgeArray,
      medicalConditionArray: newMedicalConditionArray,
      drugTakeArray: newDrugTakeArray,
      yearOfBirth: Number(patient.yearOfBirth),
    };
    return finalData;
  };
  const patientContext = useContext(PatientContext);
  const createPatientStateData = () =>
  {
    const {
      _id,
      name,
      phone,
      address,
      yearOfBirth,
      gender,
      location,
      insurance,
      knowledgeArray,
      medicalConditionArray,
      drugTakeArray,
      medicalConditionText,
      drugTakeText,
      knowledgeText,
      catagories,
    } = patientContext;

    setPatient({
      ...patient,
      _id,
      name,
      phone,
      address,
      yearOfBirth,
      gender,
      location,
      insurance,
      knowledgeArray: knowledgeArray
        .filter((v) => v.active && v.name)
        .map((v) => v.name),
      medicalConditionArray: medicalConditionArray
        .filter((v) => v.active && v.name)
        .map((v) => v.name),
      drugTakeArray: drugTakeArray
        .filter((v) => v.active && v.name)
        .map((v) => v.name),
      medicalConditionText,
      catagories,
      drugTakeText,
      knowledgeText,
    });
  };
  useEffect(() =>
  {
    createPatientStateData();
  }, [patientContext]);

  const [enabled, setEnabled] = useState(false);

  const changeValue = (type) => (event) =>
  {
    setPatient({ ...patient, [type]: event.target.value });
  };

  const [updatePatient, { loading }] = useMutation(GQL_UPDATE_PATIENT);

  const save = async () =>
  {
    try
    {
      const input = createFinalData();

      await updatePatient({
        variables: {
          input,
        },
      });

      patientContext.setCurrentPatient(input);

      showMessage("Updated", "success");
    } catch (error)
    {
      showMessage(error.message, "error");
    }
  };

  const [categoriesList, setCategoriesList] = useState([]);
  useQuery(GQL_CATEGORY_QUERY, {
    onCompleted: (data) =>
    {
      const newData = data.categories.map(e => e.name)
      setCategoriesList(newData);
    },
  });
  
  if (loading)
  {
    return (
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  };



  return (
    <div className={classes.ContFlex}>
      <div className={classes.Column}>
        <TextField
          className={classes.TextField}
          label="Name"
          disabled={!enabled}
          value={patient.name}
          onChange={changeValue("name")}
        />
        <TextField
          className={classes.TextField}
          type="number"
          label="Phone"
          disabled={!enabled}
          value={patient.phone}
          onChange={changeValue("phone")}
        />
        <TextField
          className={classes.TextField}
          label="Address"
          disabled={!enabled}
          value={patient.address}
          onChange={changeValue("address")}
        />
        <TextField
          className={classes.TextField}
          type="number"
          label="Age"
          onChange={changeValue("yearOfBirth")}
          value={patient.yearOfBirth}
          disabled={!enabled}
        />

        <div className={classes.selectRow}>
          <FormControl variant="outlined">
            <InputLabel>Gender</InputLabel>
            <Select
              native
              disabled={!enabled}
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

          <FormControl variant="outlined">
            <InputLabel>Clinic</InputLabel>
            <Select
              native
              disabled={!enabled}
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
              <option value="EL Tagmo3">EL Tagmo3</option>
              <option value="Sheikh zayed">Sheikh zayed</option>
            </Select>
          </FormControl>

          <FormControl variant="outlined">
            <InputLabel>Insurance</InputLabel>
            <Select
              native
              disabled={!enabled}
              defaultValue="none"
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
        </div>
      </div>

      <div className={classes.Column}>
        <FormControl className={classes.formControlMulti}>
          <InputLabel>Methods of knowledge about the clinic</InputLabel>
          <Select
            disabled={!enabled}
            multiple
            value={patient.knowledgeArray}
            onChange={changeValue("knowledgeArray")}
            input={<Input />}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {selected.map((value) => (
                  <Chip key={value} label={value} style={{ margin: 2 }} />
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
          <InputLabel>Present of past medical conditions</InputLabel>
          <Select
            MenuProps={classes.PaperProps}
            disabled={!enabled}
            multiple
            value={patient.medicalConditionArray}
            onChange={changeValue("medicalConditionArray")}
            input={<Input />}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {selected.map((value) => (
                  <Chip key={value} label={value} style={{ margin: 2 }} />
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
          <InputLabel>medication currently using </InputLabel>
          <Select
            MenuProps={classes.PaperProps}
            multiple
            disabled={!enabled}
            value={patient.drugTakeArray}
            onChange={changeValue("drugTakeArray")}
            input={<Input />}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {selected.map((value) => (
                  <Chip key={value} label={value} style={{ margin: 2 }} />
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

        <Autocomplete
          className={classes.formControlMulti}
          multiple
          id="categories"
          value={patient.catagories}
          onChange={(value, option) =>
          {
            setPatient({ ...patient, catagories: option });
          }}
          options={categoriesList}
          getOptionLabel={(option) => option}
          disabled={!enabled}
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="Categories" />
          )}
        />
      </div>

      <div className={classes.Column}>
        <TextField
          onChange={changeValue("knowledgeText")}
          value={patient.knowledgeText}
          disabled={!enabled}
          className={classes.TextFieldMulti}
          label="Methods of knowledge "
          multiline
          rows="4"
          variant="outlined"
        />
        <TextField
          value={patient.medicalConditionText}
          onChange={changeValue("medicalConditionText")}
          disabled={!enabled}
          className={classes.TextFieldMulti}
          label="Medical conditions"
          multiline
          rows="4"
          defaultValue=""
          variant="outlined"
        />
        <TextField
          onChange={changeValue("drugTakeText")}
          value={patient.drugTakeText}
          className={classes.TextFieldMulti}
          label="Medication currently using"
          multiline
          rows="4"
          disabled={!enabled}
          defaultValue=""
          variant="outlined"
        />

        <div className={classes.Buttons}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            disabled={!enabled}
            onClick={save}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
          <FormControlLabel
            control={
              <Switch
                className={classes.button}
                checked={enabled}
                onChange={() =>
                {
                  setEnabled(!enabled);
                }}
                name="enabled"
              />
            }
            label="Edit"
          />
          <IconButton
            aria-label="delete"
            color="secondary"
            disabled={!enabled}
            className={classes.button}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;
