import { makeStyles } from '@material-ui/core/styles';

export const WaitingStyle = makeStyles(theme => ({


  content: {

    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      marginLeft: "240px",

    },
  },
  toolbar: theme.mixins.toolbar,
  tabStyle: {

    borderRadius: '25%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    margin: 0,
    height: 'auto'
  },




}));