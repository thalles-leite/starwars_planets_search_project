import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow } from '@mui/material';
import React, { useContext } from 'react';
import ContextAPI from '../contexts/ContextAPI';

export default function TablePlanets() {
  const { planets, nameFilter } = useContext(ContextAPI);
  let headsPlanets = [];
  let firstItem = [];
  let filteredPlanets = [];
  if (planets.length > 0) {
    [firstItem] = planets;
    headsPlanets = Object.keys(firstItem);
  }
  if (nameFilter && planets) {
    filteredPlanets = planets
      .filter(({ name }) => name.toLowerCase().includes(nameFilter.toLowerCase()));
  } else {
    filteredPlanets = planets;
  }
  return (
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
          {filteredPlanets && filteredPlanets.map((planet) => (
            <TableRow key={ planet.name }>
              <TableCell data-testid="planet-name">{planet.name}</TableCell>
              <TableCell>{planet.rotation_period}</TableCell>
              <TableCell>{planet.orbital_period}</TableCell>
              <TableCell>{planet.diameter}</TableCell>
              <TableCell>{planet.climate}</TableCell>
              <TableCell>{planet.gravity}</TableCell>
              <TableCell>{planet.terrain}</TableCell>
              <TableCell>{planet.surface_water}</TableCell>
              <TableCell>{planet.population}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
