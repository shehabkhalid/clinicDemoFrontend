import { makeStyles } from "@material-ui/core/styles";
export const PatientInfoCss = makeStyles((theme) => ({

    ContFlex: {
        display: "flex",
        justifyContent: 'space-evenly',
        flexFlow: "wrap"

    },
    Column: {

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: "20px 20px"

    },
    TextField: {
        marginBottom: 8
    },
    PaperProps: {
        maxHeight: 224,
        width: 250
    },
    chips: {
        margin:2,
        display: "flex",
        flexWrap: "wrap",
    },
    formControlMulti: {
      
        margin:0,
        marginBottom:8,
        padding: 0,
        minWidth: 300,
        maxWidth: 300,
       
      },
    selectRow:{

        display: "flex",
        flexWrap: "no-wrap",
        justifyContent: 'space-between',
        maxWidth: 312,
        marginTop: 15
        
    },
    TextFieldMulti:{
        marginTop:15,
        minWidth: 300,
        maxWidth: 300,
    },
    Buttons:{
      
        marginTop:20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    limit:{
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        margin: theme.spacing(1),
      },

}))