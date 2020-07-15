import { makeStyles } from '@material-ui/core/styles';
export const ControlPanelCss = makeStyles(theme => ({


    appBar: {
        position: "relative"
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1
    },
    paper: {
        marginTop: "30px",
        padding: theme.spacing(5),
        width: "600px"

      },
    centerElements: {
        display: "flex",
        justifyContent: "center"
      },
      input: {
        margin: "20px auto",
        width: "90%"
      },
      btnLogin: {
        width: "40%"
      },  
}))