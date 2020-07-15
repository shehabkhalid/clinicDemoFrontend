import React, { useContext, useState } from "react";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import EditIcon from "@material-ui/icons/Edit";
import ReceiptIcon from "@material-ui/icons/Receipt";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import FolderIcon from '@material-ui/icons/Folder';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import { useLazyQuery } from "@apollo/react-hooks";
import Patient from '../../context/patient/patientContext'
import Backdrop from "@material-ui/core/Backdrop";
import { DialogsCss } from "./Dialogs/DialogsCss";
import CircularProgress from "@material-ui/core/CircularProgress";
import AirlineSeatFlatIcon from '@material-ui/icons/AirlineSeatFlat'


import gql from "graphql-tag";
const actions = [
  { icon: <ReceiptIcon />, name: "Prescription" },
  { icon: <GroupWorkIcon />, name: "XRay" },
  { icon: <RemoveRedEyeIcon />, name: "Investigation" },
  { icon: <AirlineSeatFlatIcon />, name: "Physiotherapy" },
  { icon: <AllInboxIcon />, name: "Reports" },
  { icon: <FolderIcon />, name: "Patient Folder" }


];

const GQL_GET_FOLDER_ID = gql`
query($id:String){
  getPatientFolderID(_id:$id)
}
`
const Speed = (props) =>
{
  const classes = DialogsCss();
  const [open, setOpen] = useState(false);

  const patient = useContext(Patient)
  const {
    hidden,
    handleClose,
    openDial,
    handleOpen,
    handleDialogs,
    css,
  } = props;

  const [getFolderID] = useLazyQuery(GQL_GET_FOLDER_ID, {
    onCompleted: data =>
    {

      var win = window.open(
        `https://drive.google.com/drive/folders/${data.getPatientFolderID}`
      );
      win.focus();
      setOpen(false)
    }
  })
  return (
    <div>
      <Backdrop
        //className={classes.backdrop}
        open={open}

      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <SpeedDial
        ariaLabel="SpeedDial"
        className={css}
        hidden={hidden}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={openDial}
      >

        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={(action.name === 'Patient Folder') ? async () =>
            {

             

              try
              {
                setOpen(true)
                await getFolderID({
                  variables: {
                    id: patient._id
                  }
                })
                
              }
              catch (error)
              {
                console.log(error)
              }

            } : handleDialogs(action.name)}
          />
        ))}

      </SpeedDial>
    </div>
  );
};

export default Speed;
