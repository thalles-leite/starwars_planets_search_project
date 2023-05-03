import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Light from './themes/Light';
import App from './App';
import Provider from './contexts/Provider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <Provider>
      <ThemeProvider theme={ Light }>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>,
  );
