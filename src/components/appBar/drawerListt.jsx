import * as React from 'react';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Add, PersonAddAlt1 } from '@mui/icons-material';
import { PeopleAlt } from '@mui/icons-material';
import { Sort } from '@mui/icons-material';
import { Sync } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';
import { HouseSharp } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import FeedIcon from '@mui/icons-material/Feed';
import { Box, Button } from '@mui/material';
import { ID_USER, NAME_USER, PHONE_USER, TYPE_USER, VALIDE_USER } from '../../contexts/constantesVar';
import AppContext from '../../contexts/ServiceContext';

const drawerWidth = 200;

const listIconStyle = {
    color: "textColorTitle2",
    fontSize: '27px',
    fontWeight: "600px"
}

const listTextStyle = {
    fontWeight: "900",
    color: "textColorTitle2"
}



function DrawerListt() {
    const { userId, dispatch, typeUser } = React.useContext(AppContext)

    const CloseSesion = () => {
        dispatch({
            type: VALIDE_USER,
            payload: false
        })
        dispatch({
            type: NAME_USER,
            payload: ""
        })

        dispatch({
            type: ID_USER,
            payload: ""
        })


        dispatch({
            type: TYPE_USER,
            payload: ""
        })
        dispatch({
            type: PHONE_USER,
            payload: ""
        })

        window.localStorage.setItem("tokenGnop", "")
        window.localStorage.setItem("qsaw", "")
        window.localStorage.setItem("enableT", false)
    }
    const listePath = [
        { text: 'Enviar', link: "/enviar" },
        { text: 'Recibir', link: "/recibir" },
        { text: 'Transacciones', link: "/" },
        { text: 'Flujo de saldo', link: "/flujo" },
        { text: 'Info de la caja', link: `/caja_master_info/${userId}` },
        { text: 'Cambiar contrasena', link: "/cambiar_password" },
    ]
    return (
        <div>
            <Toolbar title="TITLE" >
                <Box sx={{
                    marginTop: 3,
                }}>
                    <img
                        src={'https://res.cloudinary.com/mumbex/image/upload/v1690124154/logo_llkugd.png'}
                        alt={"gnob"}
                        loading="lazy"
                        width={200}

                    />
                </Box>

                {/*<Typography sx={{ color: "#eee" }} variant='h5'>
                    G-NOB
    </Typography>*/}
            </Toolbar>

            <List>
                {listePath.map((menu, index) => (
                    <ListItem key={menu.text} disablePadding divider={true} sx={{ color: "#212121", fontSize: '30px', fontWeight: "800px" }}>
                        <ListItemButton component={NavLink} to={menu.link}  >
                            <ListItemIcon  >
                                {menu.text === "Enviar" ? <Sync sx={listIconStyle} /> : <></>}
                                {menu.text === "Transacciones" ? <Sync sx={listIconStyle} /> : <></>}
                                {menu.text === "Flujo de saldo" ? <Sort sx={listIconStyle} /> : <></>}
                                {menu.text === "Cambiar contrasena" ? <Sort sx={listIconStyle} /> : <></>}
                                {menu.text === "Info de la caja" ? <Sort sx={listIconStyle} /> : <></>}
                                {menu.text === "Recibir" ? <Sort sx={listIconStyle} /> : <></>}
                            </ListItemIcon>
                            <ListItemText primary={menu.text} sx={listTextStyle} />
                        </ListItemButton>

                    </ListItem>

                ))}

            </List>
            <List>
                <ListItem disablePadding divider={true} sx={{ color: "#212121", marginTop: 3, fontSize: '30px', fontWeight: "800px" }}>
                    <ListItemButton onClick={() => {
                        CloseSesion()
                    }} >
                        <ListItemIcon  >

                            <LockIcon sx={listIconStyle} />
                        </ListItemIcon>
                        <ListItemText primary={'Cerra sesion'} sx={listTextStyle} />
                    </ListItemButton>
                </ListItem>
            </List>



        </div>
    )
}

export default DrawerListt