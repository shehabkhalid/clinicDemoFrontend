import React, { useContext, forwardRef, useState } from "react";
import DrawerContext from "../../context/drawer/drawerContext";
import { ControlPanelCss } from "./ControlPanelCss";
import CloseIcon from "@material-ui/icons/Close";
import MaterialTable from "material-table";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";

import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Slide,
    Container,
    useTheme,
    Dialog,
    Paper,
    FormControl,
    OutlinedInput,
    InputLabel,
    InputAdornment,
    Button
} from "@material-ui/core";
import { Visibility, VisibilityOff } from '@material-ui/icons'

import clsx from 'clsx';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const ControlPanel = () => {
    const drawerContext = useContext(DrawerContext);
    const handleClose = () => {
        drawerContext.handleControlPanel();
    };
    const classes = ControlPanelCss();


    const [user, setUser] = useState({

        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        showPassword: false,



    })

    const changeInput = (type) => (event) => {
        setUser({ ...user, [type]: event.target.value })
    }
    const handleClickShowPassword = () => {

        setUser({ ...user, showPassword: !user.showPassword })
    }
    return (
        <Dialog
            fullScreen
            open={drawerContext.control}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Control Panel
          </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg">
                <Paper elevation={3} className={classes.paper} >
                    <form noValidate >
                        <FormControl variant="outlined" className={clsx(classes.centerElements, classes.input)}  >
                            <InputLabel htmlFor="oldPassword"> Old Password</InputLabel>
                            <OutlinedInput
                                id="oldPassword"
                                type="text"
                                value={user.oldPassword}
                                onChange={changeInput('oldPassword')}
                                labelWidth={150}

                            />
                        </FormControl>

                        <FormControl variant="outlined" className={clsx(classes.centerElements, classes.input)} >
                            <InputLabel htmlFor="newPassword">New Password</InputLabel>
                            <OutlinedInput
                                id="newPassword"
                                type={user.showPassword ? "text" : "password"}
                                onChange={changeInput('newPassword')}
                                labelWidth={150}
                                value={user.newPassword}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {user.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>

                        <FormControl variant="outlined" className={clsx(classes.centerElements, classes.input)} >
                            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                            <OutlinedInput
                                id="confirmPassword"
                                type={user.showPassword ? "text" : "password"}
                                onChange={changeInput('confirmPassword')}
                                labelWidth={150}
                                value={user.confirmPassword}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {user.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <div className={clsx(classes.centerElements)} >
                            <Button className={classes.btnLogin}
                                fullWidth variant="contained"
                                size="large" color="primary"
                                onClick={''}
                            >
                                Change Password
                        </Button>
                        </div>

                    </form>
                </Paper>

            </Container>
        </Dialog>
    );
};

export default ControlPanel;
