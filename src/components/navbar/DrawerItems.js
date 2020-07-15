import React, { useEffect, useState, useContext } from 'react'
import NewPatient from '../forms/NewPatient'
import Medicine from '../Medicine/Medicine'
import Consultations from '../Consultations/Consultations'
import Xray from '../X-ray/Xray'
import DrawerContext from '../../context/drawer/drawerContext'
import Investigations from '../Investigations/Investigations'
import Categories from '../Categories/Categories'
import Physiotherapy from '../Physiotherapy/Physiotherapy'
import UserContext from '../../context/user/userContext'
import ControlPanel from '../ControlPanel/ControlPanel'


import {

List, ListItemText, ListItemIcon, ListItem, Divider,


} from '@material-ui/core';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import ListIcon from '@material-ui/icons/List';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import ColorizeIcon from '@material-ui/icons/Colorize';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AirlineSeatFlatIcon from '@material-ui/icons/AirlineSeatFlat'
import SettingsIcon from '@material-ui/icons/Settings';


import { withRouter } from 'react-router-dom';

const DrawerItems = (props) => {



    const userContext = useContext(UserContext)
    const [toOpen, setToOpen] = useState(undefined)
    const drawerContext = useContext(DrawerContext)
    useEffect(() => {
        if (toOpen) {

            props.history.push(toOpen)
            setToOpen(undefined)
        }
        // else if(drawerContext.profile)
        //     props.history.push('/profile')

    }, [drawerContext.profile, toOpen, props.history])

    const open = (text) => (event) => {
        if (props.isMobile)
            props.handleDrawer()


        switch (text) {
            case 'Home Page':
                setToOpen('/home')
                break;
            case 'Waiting List':
                setToOpen('/waiting')
                break;
            case 'Add New Patient':
                drawerContext.handleNewPatient()
                break;
            case 'Medicine':
                drawerContext.handleMedicine()
                break;
            case 'Consultations':
                drawerContext.handleConsultations()
                break;
            case 'X-Ray':
                drawerContext.handleXray()
                break;
            case 'Investigations':
                drawerContext.handleInvestigations();
                break;
            case 'Reservation':
                setToOpen('/reservation')
                break;
            case 'Insurance':
                setToOpen('/insurance')
                break;
            case 'Categories':
                drawerContext.handleCatagories()
                break;
            case 'Physiotherapy':
                drawerContext.handlePhysiotherapy()
                break
            case 'Control Panel':
                drawerContext.handleControlPanel()
                break

            default:
                setToOpen(undefined)
                break;

        }

    }
    const getIcon = (text) => {
        switch (text) {
            case 'Home Page':
                return <HomeIcon />
            case 'Waiting List':
                return <ListIcon />
            case 'Add New Patient':
                return <GroupAddIcon />
            case 'Medicine':
                return <ColorizeIcon />
            case 'Consultations':
                return <SupervisorAccountIcon />
            case 'Reservation':
                return <EventAvailableIcon />
            case 'X-Ray':
                return <GroupWorkIcon />
            case 'Investigations':
                return <FingerprintIcon />
            case 'Insurance':
                return <LocalHospitalIcon />
            case 'Categories':
                return <MenuIcon />
            case 'Physiotherapy':
                return <AirlineSeatFlatIcon />
            case 'Control Panel':
                return <SettingsIcon />


            default:
                return <MailIcon />
        }
    }
    var buttons = ['Home Page', 'Waiting List', 'Add New Patient', 'Reservation', 'Consultations',
        , 'Medicine',
        'X-Ray', 'Investigations', 'Physiotherapy', 'Categories', 'Insurance', 'Control Panel']

    if (userContext.role === 'sec')
        buttons = ['Home Page', 'Add New Patient', 'Reservation']

    if (userContext.role === 'clinic')
        buttons = ['Home Page', 'Waiting List', 'Add New Patient', 'Reservation']

    return (
        <div>


            <NewPatient />
            <Consultations />
            <Medicine />
            <Xray />
            <Investigations />
            <Categories />
            <Physiotherapy />
            <ControlPanel />



            <div style={{ marginBottom: "64px" }}></div>
            <Divider />
            <List style={{ paddingBottom: "20px" }} >
                {buttons.map((text, index) => (
                    <ListItem button key={text} onClick={open(text)}>
                        <ListItemIcon>{getIcon(text)}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />

        </div>
    )
}



export default withRouter(DrawerItems)
