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
import AddIcon from "@material-ui/icons/Add";
import PrintIcon from "@material-ui/icons/Print";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import PatientContext from "../../../context/patient/patientContext";

import
  {
    Search,
    ViewColumn,SaveAlt,ChevronLeft,
    ChevronRight,FirstPage,LastPage,
    Check,FilterList,Remove,Edit,AddBox,
    Clear,DeleteOutline,ArrowDownward,
  } from "@material-ui/icons";

import { useTheme } from "@material-ui/core";


const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};
const XrayDg = (props) =>
{
  const GQL_XRAY_QUERY = gql`
    query {
      xrays {
        _id
        name
      }
    }
  `;
  const GQL_MAKE_XRAY = gql`
  mutation ($info:[String]) {
makeRoshta(info:$info)
}
`
const [selectedData, setSelectedData] = useState([]);
  const [makeXray] = useMutation(GQL_MAKE_XRAY)
  const [xraysList, setXraysList] = useState([]);
  useQuery(GQL_XRAY_QUERY, {
    onCompleted: (data) =>
    {
      const newData = data.xrays.map((e) => e.name);
      setXraysList(newData);
    },
  });
 

  // const [test, setTest] = {}

  // const changeValue = (type) => (event) =>
  // {
  //   setTest({ ...test, [type]: event.target.value });
  // };

  const [open, setOpen] = useState(false);
  const handleClose = () =>
  {
    setOpen(false);
  };
  
  const classes = DialogsCss();

  const patient = useContext(PatientContext);
  return (
    <div>
      <Dialog
        onClose={props.handleClose("XRay")}
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
                id="xrays"
                // onChange={changeValue("name")}
                options={xraysList}
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
                  <TextField {...params} variant="standard" label="X-Ray" />
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
                   
                      let info = [patient._id,patient.name,cat,'xray']

                     
                      selectedData[selectedData.length-1].forEach(e =>{

                        
                        info.push(e)
                     
                      })


                      console.log(info)

                      try
                      {


                        setOpen(true)
                        const xray = await makeXray({
                          variables: {

                            info
                          }
                        })



                        var win = window.open(
                          `https://docs.google.com/document/d/${xray.data.makeRoshta}/edit#`
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

export default XrayDg;
