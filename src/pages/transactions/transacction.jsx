import React, { useState ,useContext } from 'react'
import MenuAppBars from '../../components/appBar/appBarr'
import { Grid, Tab, Tabs, Box } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import Envios from '../../components/transacciones/envios/envios';
import Recepciones from '../../components/transacciones/recepciones/recepciones';
import AppContext from '../../contexts/ServiceContext';
import EnviosCancelados from '../../components/transacciones/enviosCancelados/envios';

function Transacction() {
  const { typeUser, valideLogin, userId, userName, userCode, userPhone, dispatch ,acciones} = useContext(AppContext)

  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MenuAppBars>
      {!acciones.includes('ver_info') ?
        <Grid
          bgcolor="backgroundColorPage"
          sx={{

          }}
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
                <Tab value={1} label="Envios" />
                <Tab value={2} label="Recepciones" />
                <Tab value={3} label="Envios cancelados" />
              </Tabs>
            </Box>
            <TabPanel value={1} sx={{ paddingInline: "0px" }}><Envios /></TabPanel>
            <TabPanel value={2} sx={{ paddingInline: "0px" }}><Recepciones /></TabPanel>
            <TabPanel value={3} sx={{ paddingInline: "0px" }}><EnviosCancelados /></TabPanel>
          </TabContext>
        </Grid>
        :
        <></>
      }


    </MenuAppBars>
  )
}


export default Transacction