import { Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow } from '@mui/material';
import { Container } from '@mui/system';

import React, { useContext } from 'react';
import './App.css';
import ContextAPI from './contexts/ContextAPI';
// coment test
function App() {
  const { planets } = useContext(ContextAPI);
  console.log(planets);
  let headsPlanets = [];
  let firstItem = [];
  if (planets) {
    [firstItem] = planets;
    headsPlanets = Object.keys(firstItem);
    console.log(planets);
  }
  return (
    <Container maxWidth="lg">
      <Box>
        LOGO
      </Box>
      <TableContainer component={ Paper }>
        <Table sx={ { minWidth: 650 } } aria-label="Planet table">
          <TableHead>
            <TableRow>
              {planets && headsPlanets.map(
                (headplanets) => (
                  <TableCell key={ headplanets }>{headplanets}</TableCell>),
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {planets && planets.map((
              {
                name,
                rotation_period: rotationPeriod,
                orbital_period: orbitalPeriod,
                diameter,
                climate,
                gravity,
                terrain,
                surface_water: surfaceWater,
                population,
                films,
                created,
                edited,
                url },
            ) => (
              <TableRow key={ name }>
                <TableCell>{name}</TableCell>
                <TableCell>{rotationPeriod}</TableCell>
                <TableCell>{orbitalPeriod}</TableCell>
                <TableCell>{diameter}</TableCell>
                <TableCell>{climate}</TableCell>
                <TableCell>{gravity}</TableCell>
                <TableCell>{terrain}</TableCell>
                <TableCell>{surfaceWater}</TableCell>
                <TableCell>{population}</TableCell>
                <TableCell>{films}</TableCell>
                <TableCell>{created}</TableCell>
                <TableCell>{edited}</TableCell>
                <TableCell>{url}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default App;
