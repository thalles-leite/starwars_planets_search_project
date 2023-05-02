import { Box, TextField } from '@mui/material';
import React, { useContext } from 'react';
import ContextAPI from '../contexts/ContextAPI';

export default function FormPlanets() {
  const { changeNameFilter, nameFilter } = useContext(ContextAPI);

  return (
    <Box component="form" noValidate autoComplete="off" marginBottom="20px">
      <TextField
        label="Nome do Planeta"
        inputProps={ {
          'data-testid': 'name-filter',
        } }
        value={ nameFilter }
        variant="standard"
        onChange={ ({ target }) => changeNameFilter(target.value) }
      />
    </Box>
  );
}
