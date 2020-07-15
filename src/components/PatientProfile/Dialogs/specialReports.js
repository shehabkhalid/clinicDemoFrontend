import React, { useState, useContext } from "react";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { withStyles } from "@material-ui/core/styles";
import { DialogsCss } from "./DialogsCss";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from '@material-ui/core/Button';
import Patient from '../../../context/patient/patientContext'




const GQL_MAKE_SPECIAL_DOCS = gql`
mutation($info:[String])
{
  makeSpecialDocs(info:$info)
}
`
const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const SpecialReportsDg = (props) =>
{
    const patient = useContext(Patient)
    const [makeSpecialDoc] = useMutation(GQL_MAKE_SPECIAL_DOCS)
    const [open, setOpen] = useState(false)
    const handleClose = () =>
    {
        setOpen(false);
    };
    const handleToggle = () =>
    {
        setOpen(!open);
    };

    const classes = DialogsCss();


    const makeSpecialDocs = async (copyId, docName) =>
    {
        setOpen(true)

        const info = [patient._id, patient.name, copyId, docName]
        try
        {
            const doc = await makeSpecialDoc({
                variables: {
                    info
                }
            })

            var win = window.open(
                `https://docs.google.com/document/d/${doc.data.makeSpecialDocs}/edit#`
            );
            win.focus();

        } catch (error)
        {
            console.log(error)
        }
        setOpen(false)
    }

    return (
        <Dialog
            onClose={props.handleClose("Reports")}
            aria-labelledby="customized-dialog-title"
            open={props.open}
            fullWidth={false}
            maxWidth={"md"}
        >

            <Backdrop
                className={classes.backdrop}
                open={open}
               
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <DialogContent dividers>
                <div className={classes.Column}>

                    <Button variant="contained" color="primary" onClick={() => { makeSpecialDocs('1ktomrH6eiIEGbe2qIcqISaUJIsrtqERV6ubMtsrko0w', 'Arabic A4 report and receipt') }}
                    >
                        Arabic A4 report and receipt
                    </Button>

                    <Button variant="contained" color="secondary" onClick={() => { makeSpecialDocs('1YKCRo6RS2RWQ5IxOpQ2d7Xnu1qMyY4RG36qCYO6tEuk', 'A5 report Arabic') }}>

                        A5 report Arabic
                    </Button>

                    <Button variant="contained" color="primary" onClick={() => { makeSpecialDocs('1St9aG1QnG73NCTNSVFjf9_3WyQG1aINac2WAxf9B8zE', 'A5 report English') }}>

                        A5 report English
                    </Button>

                    <Button variant="contained" color="secondary" onClick={() => { makeSpecialDocs('1Crv_pepd-SjOPAZQ4yVQ2tf5LOy5DQ7wirMtICyxE6U', 'English A4 medical report and quotation ENG word') }}>

                        English A4 medical report and quotation ENG word
                    </Button>

                    <Button variant="contained" color="primary"
                        onClick={() => { makeSpecialDocs('11SwcppqIca3czcfHUnZWOGUBQK2Ll-av8K5s2KM9b5I', 'Operation request A5') }}>


                        Operation request A5

                    </Button>

                    <Button variant="contained" color="secondary"

                        onClick={() => { makeSpecialDocs('1meLLOj1sE5dCgD3aPigdSOK-AKHXMJx2IYt2YDb7LBM', 'Sick leave report A5') }}
                    >
                        Sick leave report A5
                    </Button>

                    <Button variant="contained" color="primary"
                        onClick={() => { makeSpecialDocs('16mgBqhVwfHyofJl4Fg8PyzJcFN5wT2cF7_lTRELomHA', 'Transefer operation A5') }}
                    >
                        Transefer operation A5
                    </Button>

                </div>
            </DialogContent>



        </Dialog>
    )
}

export default SpecialReportsDg
