import { createTheme } from '@mui/material';

const Light = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#F5E71A', // Amarelo
    },
    secondary: {
      main: '#B9B6B3', // Cinza
    },
    background: {
      default: '#000', // Preto
      paper: '#222', // Cinza escuro
    },
    text: {
      primary: '#fff', // Branco
      secondary: '#B9B6B3', // Cinza
    },

  },
});

export default Light;
