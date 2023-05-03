import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextAPI from './ContextAPI';

const INITIAL_COLUMNS_FILTER = ['population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water'];

export default function Provider({ children }) {
  const [planets, setPlanets] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [operatorFilter, setOperatorFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [dataPlanets, setDataPlanets] = useState('');
  const [filters, setFilters] = useState([]);
  const [columnsOptionsFilter,
    setColumnsOptionsFilter] = useState(INITIAL_COLUMNS_FILTER);

  const requestApi = useCallback(async () => {
    const response = await fetch('https://swapi.dev/api/planets');
    const { results } = await response.json();
    const newResults = results.map((result) => {
      const { residents, ...otherValues } = result;
      return otherValues;
    });
    setPlanets(newResults);
    setDataPlanets(newResults);
  }, []);

  useEffect(() => {
    requestApi();
  }, [requestApi]);

  const changeNameFilter = (namePlanet) => {
    setNameFilter(namePlanet);
  };

  const changeColumnFilter = (column) => {
    setColumnFilter(column);
  };

  const changeOperatorFilter = (operator) => {
    setOperatorFilter(operator);
  };

  const changeValueFilter = (value) => {
    setValueFilter(value);
  };
  const deleteAllFilters = () => {
    setPlanets(dataPlanets);
    setColumnsOptionsFilter(INITIAL_COLUMNS_FILTER);
    setFilters([]);
  };
  const deleteFilter = (columnFilterParam, operatorFilterParam, valueFilterParam) => {
    const newFilters = filters
      .filter(({
        columnFilter: columnFilterData }) => columnFilterData !== columnFilterParam);
    setFilters(newFilters);
    setColumnsOptionsFilter([columnFilterParam, ...columnsOptionsFilter]);
    setColumnFilter(columnFilterParam);
    let newFilteredPlanets = [];
    if (operatorFilterParam === 'maior que') {
      newFilteredPlanets = dataPlanets.filter((planet) => (
        Number(planet[columnFilterParam]) <= Number(valueFilterParam))
        || (Number.isNaN(Number(planet[columnFilterParam]))));
    } else if (operatorFilterParam === 'menor que') {
      newFilteredPlanets = dataPlanets
        .filter((planet) => Number(
          planet[columnFilterParam],
        ) > Number(valueFilterParam));
    } else if (operatorFilterParam === 'igual a') {
      newFilteredPlanets = dataPlanets
        .filter((planet) => Number(
          planet[columnFilterParam],
        ) !== Number(valueFilterParam));
    }
    let reflterPlanets = [];
    newFilters.forEach((filter) => {
      if (filter.operatorFilter === 'maior que') {
        reflterPlanets = newFilteredPlanets
          .filter((planet) => Number(
            planet[filter.columnFilter],
          ) > Number(filter.valueFilter));
      } else if (operatorFilter === 'menor que') {
        reflterPlanets = newFilteredPlanets
          .filter((planet) => Number(
            planet[filter.columnFilter],
          ) < Number(filter.valueFilter));
      } else if (operatorFilter === 'igual a') {
        reflterPlanets = newFilteredPlanets
          .filter((planet) => Number(
            planet[filter.columnFilter],
          ) === Number(filter.valueFilter));
      }
    });
    if (newFilters.length === 0) {
      reflterPlanets = newFilteredPlanets;
    }
    console.log(newFilteredPlanets);
    console.log(reflterPlanets);

    const newPlanets = [...planets, ...reflterPlanets];
    setPlanets(newPlanets);
    console.log(newPlanets);
  };

  const changeFilteredPlanets = () => {
    const newColumnsFilters = columnsOptionsFilter
      .filter((column) => column !== columnFilter);
    setFilters([...filters, { operatorFilter, columnFilter, valueFilter }]);

    setColumnsOptionsFilter(newColumnsFilters);
    setColumnFilter(newColumnsFilters[0]);

    let filteredPlanets = [];
    if (operatorFilter === 'maior que') {
      filteredPlanets = planets
        .filter((planet) => Number(planet[columnFilter]) > Number(valueFilter));
    } else if (operatorFilter === 'menor que') {
      filteredPlanets = planets
        .filter((planet) => Number(planet[columnFilter]) < Number(valueFilter));
    } else if (operatorFilter === 'igual a') {
      filteredPlanets = planets
        .filter((planet) => Number(planet[columnFilter]) === Number(valueFilter));
    }
    setPlanets(filteredPlanets);
  };

  Provider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  return (
    <ContextAPI.Provider
      value={ {
        planets,
        changeNameFilter,
        nameFilter,
        changeColumnFilter,
        columnFilter,
        operatorFilter,
        changeOperatorFilter,
        changeValueFilter,
        valueFilter,
        changeFilteredPlanets,
        columnsOptionsFilter,
        filters,
        deleteFilter,
        deleteAllFilters,
      } }
    >
      {children}
    </ContextAPI.Provider>
  );
}
