import React, { useState, useContext } from "react";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { withStyles } from "@material-ui/core/styles";
import { DialogsCss } from "./DialogsCss";
import IconButton from "@material-ui/core/IconButton";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

import PrintIcon from "@material-ui/icons/Print";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import PatientContext from "../../../context/patient/patientContext";


const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const PrescriptionDg = (props) =>
{
  const GQL_MEDICINE_QUERY = gql`
    query {
      medicines {
        _id
        name
        description
      }
    }
  `;
  const GQL_MAKE_ROSHTA = gql`
    mutation ($info:[String]) {
  makeRoshta(info:$info)
}
  `
  const [selectedData, setSelectedData] = useState([]);

  const patient = useContext(PatientContext);
  const classes = DialogsCss();

  const [prescriptionList, setPrescriptionList] = useState([]);
  useQuery(GQL_MEDICINE_QUERY, {
    onCompleted: (data) =>
    {
      // const newData = data.medicines.map((e) => e.name);
      setPrescriptionList(data.medicines);
    },
  });

  const [makeRoshta] = useMutation(GQL_MAKE_ROSHTA)
  const [open, setOpen] = useState(false);



  return (
    <div>
      <Dialog
        onClose={props.handleClose("Prescription")}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        modal={true}
        autoDetectWindowHeight={false}
        autoScrollBodyContent={false}
        fullWidth={false}
        maxWidth={"md"}
      >
        <DialogContent dividers>
          <div className={classes.root}>
            <div className={classes.set}>
              <Autocomplete
                className={classes.formControlMulti}
                multiple
                id="medicines"
                options={prescriptionList}
                getOptionLabel={(option) => option.name}
                getOptionSelected={(option, value) => option._id === value._id}
                onChange={(value, option) =>
                {
                  if (option != null)
                  {
                    let newData = selectedData;
                    newData.push(option);
                    setSelectedData(newData);
                  }
                }}
                clearOnEscape
                renderInput={(params) => (
                  <TextField {...params} variant="standard" label="Name" />
                )}
              />
              <div>
                <div>
                  <IconButton
                    aria-label="print"
                    color="secondary"
                    //  onClick={handleToggle}
                    onClick={async () =>
                    {
                      let cat = ""
                      
               
                      patient.catagories.forEach((e ,i)  => { (i!=patient.catagories.length-1)? cat += e + ', ': cat+= e })
                   
                      let info = [patient._id,patient.name,cat,'pre']

                     
                      selectedData[selectedData.length-1].forEach(e =>{

                     
                        info.push(e.name)
                        info.push(e.description)
                      })


                    

                      try
                      {


                        setOpen(true)
                        const roshta = await makeRoshta({
                          variables: {

                            info
                          }
                        })



                        var win = window.open(
                          `https://docs.google.com/document/d/${roshta.data.makeRoshta}/edit#`
                        );
                        win.focus();
                      } catch (error)
                      {

                      }
                      setOpen(false)

                    }}
                  >
                    <PrintIcon />
                  </IconButton>
                  <Backdrop
                    className={classes.backdrop}
                    open={open}

                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PrescriptionDg;
