import { Box } from '@mui/material';
import { Container } from '@mui/system';

import React from 'react';
import './App.css';
import FormPlanets from './components/FormPlanets';
import HeaderLogo from './components/HeaderLogo';
import TablePlanets from './components/TablePlanets';
// import Table from './components/Table';

// coment test
function App() {
  return (
    <Container maxWidth="lg">
      <HeaderLogo />
      <FormPlanets />
      <TablePlanets />
    </Container>
  );
}

export default App;
