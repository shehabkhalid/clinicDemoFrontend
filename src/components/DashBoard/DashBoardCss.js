import { makeStyles } from '@material-ui/core/styles';


export const DashBoardStyle = makeStyles(theme => ({



  nav: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: '240',
    flexShrink: 0,
  },
  drawerPaper: {
    width: '240',
  },
  content: {
    padding:theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
     
      marginLeft: "240px"
  }
  },
  toolbar:  theme.mixins.toolbar,
  centerElements: {
    display: "flex",
    justifyContent: "center"
  },





}));