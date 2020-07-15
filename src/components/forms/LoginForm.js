import React, { Fragment, useState, useContext, useEffect } from 'react'
import
{
    Container, Paper,
    Avatar, IconButton,
    OutlinedInput,
    InputLabel, InputAdornment,
    FormControl, Button, Fade,
    CircularProgress
}
    from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { loginFormCss } from './FormsCss'
import clsx from 'clsx';
import UserContext from '../../context/user/userContext'
import Alert from '@material-ui/lab/Alert';

import gql from 'graphql-tag'
import { useLazyQuery } from '@apollo/react-hooks';

const GQL_LOGIN = gql`
 query login($user:String!,$pass:String!)
{
    login(userName:$user,password:$pass) 
    {
        userName
        role
        token
    }
}
`;
const LoginForm = (props) =>
{




    const userContext = useContext(UserContext);

    const [user, setUser] = useState({

        userName: "",
        password: "",
        showPassword: false,
        


    })
   
    const [login, { loading, data, error }] = useLazyQuery(GQL_LOGIN, {
        onCompleted: data => {  (data.login !== null) && userContext.saveUser(data.login) }
    })
    const finalLogin = () =>
    {


        login({
            variables: {
                user: user.userName,
                pass: user.password
            }
        })
    }


    useEffect(() =>
    {
        localStorage.clear();
        if (userContext.token)
        {
            props.history.push('/home')
        }

    }, [userContext.token, props.history])




    const changeInput = (type) => (event) =>
    {
        setUser({ ...user, [type]: event.target.value })
    }

    const handleClickShowPassword = () =>
    {

        setUser({ ...user, showPassword: !user.showPassword })
    }
    const classes = loginFormCss();
    return (
        <div className={classes.content}>
            <div className={classes.toolbar} />
            <Container maxWidth="sm" >

                <Paper elevation={3} className={classes.paper} >


                    <div className={classes.centerElements}>
                        <Avatar className={classes.logo} variant="square" src={require('../../static/Logo.png')} />
                    </div>




                    {(!userContext.token && data != null) && (
                        <Alert severity="error">{'Invalid userName or Password'} </Alert>
                    )}
                    <form noValidate autoComplete="yes">

                        <FormControl variant="outlined" className={clsx(classes.centerElements, classes.input)}  >
                            <InputLabel htmlFor="userNameTxt"> User Name</InputLabel>
                            <OutlinedInput
                                id="userNameTxt"
                                type="text"
                                value={user.userName}
                                onChange={changeInput('userName')}
                                labelWidth={80}

                            />
                        </FormControl>

                        <FormControl variant="outlined" className={clsx(classes.centerElements, classes.input)} >
                            <InputLabel htmlFor="passwordTxt"> Password</InputLabel>
                            <OutlinedInput
                                id="passwordTxt"
                                type={user.showPassword ? "text" : "password"}
                                onChange={changeInput('password')}
                                labelWidth={70}
                                value={user.password}
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

                                disabled={loading ? true : false}

                                onClick={finalLogin}
                            >
                                Login 
                            </Button>
                        </div>
                        {
                            loading && (


                                <div className={clsx(classes.loading, classes.centerElements)}>

                                    <Fade in={loading}
                                        unmountOnExit
                                    >
                                        <CircularProgress />
                                    </Fade>

                                </div>
                            )
                        }
                    </form>

                </Paper>





            </Container>

        </div>
    )
}

export default LoginForm
