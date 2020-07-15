import React, { useContext, Fragment, useState, useEffect } from "react";
import { navbarStyle } from "./navbarCss";
import Button from '@material-ui/core/Button';
import SearchIcon from "@material-ui/icons/Search";
import Search from "./Search";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  CssBaseline,
  Hidden,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";

import userContext from "../../context/user/userContext";

import DrawerItems from "./DrawerItems";

const Navbar = (props) => {
  const user = useContext(userContext);
  const classes = navbarStyle();
  const [mobileDrawer, setMobileDrawer] = useState(false);
  const handleDrawer = () => {
    setMobileDrawer(!mobileDrawer);
  };



  return (
    <Fragment>
      <div className={classes.nav}>
        <CssBaseline />
        <AppBar position="fixed" className={user.token && classes.appBar}>
          <Toolbar>
            {user.token && (
              <IconButton
                className={classes.drawerBtn}
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawer}
              >
                <MenuIcon />
              </IconButton>

            )}

            <Hidden Hidden mdUp implementation="css">
              <Typography variant="h8" noWrap>
                {" "}
              </Typography>
            </Hidden>

            <Hidden Hidden smDown implementation="css">
              <Typography variant="h6" noWrap>
                {" "}
                Clinic System{" "}
              </Typography>
            </Hidden>

            {user.token && (
              <div className={classes.root}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>

                  <Search classes={classes} />

                </div>
               

                <div  className={classes.root2} >
                  <Button onClick={ ()=> { window.location.reload()}} color="inherit"  >Logout</Button>
                 
                  </div>
              </div>
            )}


          </Toolbar>
        </AppBar>
      </div>

      {user.token && (
        <div>
          <Hidden Hidden smUp implementation="css">
            <Drawer
              open={mobileDrawer}
              onClose={handleDrawer}
              variant="temporary"
              ModalProps={{ keepMounted: true }}
              classes={{ paper: classes.drawerPaper }}
            >
              <DrawerItems isMobile={true} handleDrawer={handleDrawer} />
            </Drawer>
          </Hidden>

          <Hidden xsDown implementation="css">
            <Drawer
              variant="permanent"
              open
              classes={{ paper: classes.drawerPaper }}
            >
              <DrawerItems isMobile={false} handleDrawer={handleDrawer} />
            </Drawer>
          </Hidden>
        </div>
      )}
    </Fragment>
  );
};
export default Navbar;
