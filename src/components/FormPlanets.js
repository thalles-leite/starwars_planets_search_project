import { Box, TextField, Button } from '@mui/material';
import React, { useContext } from 'react';
import ContextAPI from '../contexts/ContextAPI';

export default function FormPlanets() {
  const {
    changeNameFilter,
    nameFilter,
    changeColumnFilter,
    columnFilter,
    changeOperatorFilter,
    operatorFilter,
    changeValueFilter,
    valueFilter,
    changeFilteredPlanets,
    columnsOptionsFilter,
  } = useContext(ContextAPI);

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      marginBottom="20px"
      display="flex"
      gap="10px"
      alignItems="center"
      justifyContent="space-between"

    >
      <TextField
        label="Nome do Planeta"
        inputProps={ {
          'data-testid': 'name-filter',
        } }
        value={ nameFilter }
        variant="standard"
        onChange={ ({ target }) => changeNameFilter(target.value) }
      />
      <Box textAlign="center" display="flex" flexDirection="column">
        <label htmlFor="column-filter">Coluna</label>
        <select
          id="column-filter"
          value={ columnFilter }
          onChangeCapture={ ({ target }) => changeColumnFilter(target.value) }
          data-testid="column-filter"
        >
          {columnsOptionsFilter
            .map((column) => <option key={ column } value={ column }>{column}</option>)}
        </select>
      </Box>
      <Box textAlign="center" display="flex" flexDirection="column">
        <label htmlFor="comparison-filter">Operador</label>
        <select
          id="comparison-filter"
          value={ operatorFilter }
          onChange={ ({ target }) => changeOperatorFilter(target.value) }
          data-testid="comparison-filter"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </Box>

      <TextField
        type="number"
        onChange={ ({ target }) => changeValueFilter(target.value) }
        value={ valueFilter }
        inputProps={ {
          'data-testid': 'value-filter',
        } }
        sx={ {
          maxWidth: '100px',
        } }
      />

      <Button
        variant="contained"
        sx={ {
          height: '100%',
        } }
        data-testid="button-filter"
        onClick={ () => { changeFilteredPlanets(); } }
      >
        FILTRAR
      </Button>

    </Box>
  );
}
