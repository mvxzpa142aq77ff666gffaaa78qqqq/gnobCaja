import React, { useState,useContext } from 'react'
import MenuAppBars from '../../components/appBar/appBarr'
import { Grid, Tab, Tabs, Box } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import Recargas from '../../components/flujoSaldo/recargas/recargas';
import DeCajaAMasters from '../../components/flujoSaldo/deCajaAMaster/deCajaAMasters';
import AppContext from '../../contexts/ServiceContext';

function Filtersss() {
  const { typeUser, valideLogin, userId, userName, userCode, userPhone, dispatch, acciones } = useContext(AppContext)

  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <MenuAppBars>
      {!acciones.includes('ver_info') ?
        <Grid
          bgcolor="backgroundColorPage"
          sx={{}}
        >
          <TabContext value={value}>
            <Box sx={{ bgcolor: 'background.paper' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                <Tab value={1} label="Recargas" />
                <Tab value={2} label="De caja a master" />
              </Tabs>
            </Box>
            <TabPanel value={1} sx={{ paddingInline: "0px" }}><Recargas /></TabPanel>
            <TabPanel value={2} sx={{ paddingInline: "0px" }}><DeCajaAMasters /></TabPanel>
          </TabContext>
        </Grid>
        :
        <></>
      }

    </MenuAppBars>
  )
}


export default Filtersss