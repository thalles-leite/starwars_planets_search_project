import { Box } from '@mui/material';
import { Container } from '@mui/system';

import React from 'react';
import './App.css';
import FormPlanets from './components/FormPlanets';
import TablePlanets from './components/TablePlanets';
// import Table from './components/Table';

// coment test
function App() {
  return (
    <Container maxWidth="lg">
      <Box>
        LOGO
      </Box>
      <FormPlanets />
      <TablePlanets />
    </Container>
  );
}

export default App;
