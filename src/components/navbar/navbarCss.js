import { makeStyles,fade } from '@material-ui/core/styles';


export const navbarStyle = makeStyles(theme => ({


    nav: {
        display: 'flex',
        justifyContent: 'spaceBetween'
    },
    autoComplete:{
        [theme.breakpoints.down("md")]: {
            width: 220,
        },
        zIndex:  10,
        width:320,
        padding: theme.spacing(0, 0),
        
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - 240px)`,
            marginLeft: "240px"
        }

    },
    toolbar: theme.mixins.toolbar,
    drawerBtn: {
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },

    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: "240px",
            flexShrink: 0,
            background: "red"
        }
    },
    drawerPaper: {
        zIndex: theme.zIndex.drawer + 1,
        width: "240px",

    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.80),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.90),
        },
        marginLeft: '35px',
        width: 'auto',
      
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(9),
            width: 'auto',
        },
    },
    searchIcon: {
        margin: theme.spacing(0, -4),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        
        transition: theme.transitions.create('width'),
        width: '100%',
     

        [theme.breakpoints.up('md')]: {
          
            width: '50ch',
            '&:focus': {
                width: '55ch',
            },
        },

        [theme.breakpoints.down('xs')]: {
          
            
            width: '15ch',
            '&:focus': {
                width: '18ch',
            },
        },
    },
    root: {
            display: 'flex',
            justifyContent:'spaceAround'

    },
    root2: {


        position: 'absolute',
        marginTop:'8px',
        marginLeft:'68%',
        [theme.breakpoints.up('lg')]: {
          
            marginLeft:'80%',
        },
       

    },
    grow: {
        flexGrow: 1,
      },



}));