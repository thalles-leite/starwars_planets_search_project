import {
  Box,
  TextField,
  Button,
  Container,
  Stack,
  Chip,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider } from '@mui/material';
import React, { useContext } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
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
    filters,
    deleteFilter,
    deleteAllFilters,
    ordenatorFilter,
    changeOrdenatorFilter,
    sortFilter,
    changeSortFilter,
    changeOrderfilter,
  } = useContext(ContextAPI);

  return (
    <Container>

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
          variant="outlined"
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
          variant="outlined"
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
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box textAlign="center" display="flex" flexDirection="column">
          <label htmlFor="ordenator-filter">Ordenar</label>
          <select
            id="ordenator-filter"
            value={ ordenatorFilter }
            onChange={ ({ target }) => changeOrdenatorFilter(target.value) }
            data-testid="column-sort"
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </Box>
        <RadioGroup
          defaultValue="ASC"
          value={ sortFilter }
          onChange={ ({ target }) => changeSortFilter(target.value) }
        >
          <FormControlLabel
            value="ASC"
            control={
              <Radio data-testid="column-sort-input-asc" />
            }
            label="Ascendente"
          />
          <FormControlLabel
            value="DESC"
            control={
              <Radio data-testid="column-sort-input-desc" />
            }
            label="Descendente"
          />

        </RadioGroup>
        <Button
          variant="contained"
          data-testid="column-sort-button"
          onClick={ () => changeOrderfilter() }
        >
          ORDENAR

        </Button>

      </Box>
      <Box>
        {
          filters.length > 0 && (
            <>
              Filtros:
              <Stack direction="row" spacing={ 2 }>
                {filters.map(
                  ({ columnFilter: columFilterData,
                    operatorFilter: operatorFilterData,
                    valueFilter: valueFilterData,
                  }) => (<Chip
                    data-testid="filter"
                    key={ columFilterData }
                    label={ columFilterData }
                    onDelete={ () => {
                      deleteFilter(columFilterData, operatorFilterData, valueFilterData);
                    } }
                    deleteIcon={ <Button
                      sx={ {
                        display: 'flex',
                        padding: '0',

                        minWidth: '5px',
                      } }
                      startIcon={ <DeleteIcon /> }
                    /> }
                    variant="outlined"
                  />),
                )}

                <Button
                  variant="outlined"
                  color="error"
                  data-testid="button-remove-filters"
                  endIcon={ <DeleteForeverIcon /> }
                  sx={ { marginTop: '10px' } }
                  onClick={ () => { deleteAllFilters(); } }
                >
                  REMOVER FILTROS
                </Button>
              </Stack>
            </>)
        }
      </Box>
    </Container>
  );
}
