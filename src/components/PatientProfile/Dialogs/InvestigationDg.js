import React, { useState, forwardRef, useContext } from "react";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { withStyles } from "@material-ui/core/styles";
import { DialogsCss } from "./DialogsCss";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import MaterialTable, { MTableToolbar } from "material-table";
import SaveIcon from "@material-ui/icons/Save";
import PrintIcon from "@material-ui/icons/Print";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from "@material-ui/icons/Add";
import PatientContext from "../../../context/patient/patientContext";
import
{
  Search,
  ViewColumn,
  SaveAlt,
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
  Check,
  FilterList,
  Remove,
  Edit,
  AddBox,
  Clear,
  DeleteOutline,
  ArrowDownward,
} from "@material-ui/icons";

import { useTheme } from "@material-ui/core";

const GQL_INVESTIGATION_QUERY = gql`
  query {
    investigations {
      _id
      name
    }
  }
`;
const GQL_MAKE_INV = gql`
    mutation ($info:[String]) {
  makeRoshta(info:$info)
}
  `


const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const InvestigationDg = (props) =>
{

  const [selectedData, setSelectedData] = useState([]);
  const patient = useContext(PatientContext);
  const [makeINV] = useMutation(GQL_MAKE_INV)


  const classes = DialogsCss();


  const [investigationList, setInvestigationList] = useState([]);
  useQuery(GQL_INVESTIGATION_QUERY, {
    onCompleted: (data) =>
    {
      const newData = data.investigations.map((e) => e.name);
      setInvestigationList(newData);
    },
  });
  const [open, setOpen] = useState(false);
  const handleClose = () =>
  {
    setOpen(false);
  };
  const handleToggle = () =>
  {
    setOpen(!open);
  };
  return (
    <div>
      <Dialog
        onClose={props.handleClose("Investigation")}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        fullWidth={false}
        maxWidth={"md"}
      >
        <DialogContent dividers>

          <div className={classes.root2}>
            <div className={classes.set}>

              <Autocomplete
                className={classes.formControlMulti}
                 multiple
                id="investigations"
              
                options={investigationList}
                onChange={(value, option) =>
                {
                  if (option != null)
                  {
                    let newData = selectedData;
                    newData.push(option);
                    setSelectedData(newData);
                  }
                }}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Name"
                  />
                )}
              />
                <div>
                <IconButton
                  aria-label="print"
                  color="secondary"
                  onClick={async () =>
                    {
                      let cat = ""
                      
               
                      patient.catagories.forEach((e ,i)  => { (i!=patient.catagories.length-1)? cat += e + ', ': cat+= e })
                   
                      let info = [patient._id,patient.name,cat,'inv']

                     
                      selectedData[selectedData.length-1].forEach(e =>{

                        
                        info.push(e)
                     
                      })


                      console.log(info)

                      try
                      {


                        setOpen(true)
                        const inv = await makeINV({
                          variables: {

                            info
                          }
                        })



                        var win = window.open(
                          `https://docs.google.com/document/d/${inv.data.makeRoshta}/edit#`
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
                  onClick={handleClose}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvestigationDg;
