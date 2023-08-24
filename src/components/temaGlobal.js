import { ThemeProvider, createTheme,responsiveFontSizes } from '@mui/material/styles';
import { esES } from '@mui/material/locale';


const TemaGlobals = createTheme({
    palette: {
      primary: {
        main:'#6200ea'
      },
      textColorTitle:"#424242",
      textColorTitle2:"#eeeeee",
      backgroundColorPage:"#f5f5f5",
      principalColor:"#6200ea",
      
    },
},
esES
);

export const TemaGlobal = responsiveFontSizes(TemaGlobals)