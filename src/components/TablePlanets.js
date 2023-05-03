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
  if (planets) {
    [firstItem] = planets;
    headsPlanets = Object.keys(firstItem);
  }
  if (nameFilter) {
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
          {filteredPlanets && filteredPlanets.map((
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
  );
}
