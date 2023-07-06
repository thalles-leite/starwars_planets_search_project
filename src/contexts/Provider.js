/* eslint-disable spaced-comment */
/* eslint-disable max-len */
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
  const [ordenatorFilter, setOrdenatorFilter] = useState('population');
  const [sortFilter, setSortFilter] = useState('ASC');
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
  const changeOrdenatorFilter = (value) => {
    setOrdenatorFilter(value);
  };

  const changeSortFilter = (value) => {
    setSortFilter(value);
  };

  const filterFuncion = (ofParam, clParam, vlParam, data) => {
    let filteredPlanets = [];
    if (ofParam === 'maior que') {
      filteredPlanets = data
        .filter((planet) => Number(planet[clParam]) > Number(vlParam));
    }
    if (ofParam === 'menor que') {
      filteredPlanets = data
        .filter((planet) => Number(planet[clParam]) < Number(vlParam));
    }
    if (ofParam === 'igual a') {
      filteredPlanets = data
        .filter((planet) => Number(planet[clParam]) === Number(vlParam));
    }
    return filteredPlanets;
  };

  const changeOrderfilter = () => {
    const sortedPlanets = [...planets];
    if (sortFilter === 'ASC') {
      sortedPlanets
        .sort((a, b) => {
          const populationA = a[ordenatorFilter] === 'unknown'
            ? Infinity : Number(a[ordenatorFilter]);
          const populationB = b[ordenatorFilter] === 'unknown'
            ? Infinity : Number(b[ordenatorFilter]);

          return populationA - populationB;
        });
    } else {
      sortedPlanets
        .sort((a, b) => {
          const populationA = a[ordenatorFilter] === 'unknown'
            ? 0 : Number(a[ordenatorFilter]);
          const populationB = b[ordenatorFilter] === 'unknown'
            ? 0 : Number(b[ordenatorFilter]);

          return populationB - populationA;
        });
    }
    setPlanets(sortedPlanets);
  };
  const deleteAllFilters = () => {
    setPlanets(dataPlanets);
    setColumnsOptionsFilter(INITIAL_COLUMNS_FILTER);
    setFilters([]);
  };

  const deleteFilter = (columnFilterParam, operatorFilterParam, valueFilterParam) => {
    const newFilters = filters
      .filter(
        ({ columnFilter: columnFilterData }) => columnFilterData !== columnFilterParam,
      );
    setFilters(newFilters);
    setColumnsOptionsFilter([columnFilterParam, ...columnsOptionsFilter]);
    setColumnFilter(columnFilterParam);
    let newFilteredPlanets = [];

    if (operatorFilterParam === 'maior que') {
      newFilteredPlanets = dataPlanets.filter((planet) => Number(
        planet[columnFilterParam],
      ) <= Number(valueFilterParam)
        || (Number.isNaN(Number(planet[columnFilterParam]))));
    }
    if (operatorFilterParam === 'menor que') {
      newFilteredPlanets = dataPlanets.filter((planet) => Number(
        planet[columnFilterParam],
      ) > Number(valueFilterParam));
    }
    if (operatorFilterParam === 'igual a') {
      newFilteredPlanets = dataPlanets.filter((planet) => Number(
        planet[columnFilterParam],
      ) !== Number(valueFilterParam));
    }

    let reflterPlanets = [];

    newFilters.forEach((filter) => {
      reflterPlanets = filterFuncion(
        filter.operatorFilter,
        filter.columnFilter,
        filter.valueFilter,
        newFilteredPlanets,
      );
      newFilteredPlanets = [...reflterPlanets];
    });

    if (newFilters.length === 0) {
      reflterPlanets = newFilteredPlanets;
    }

    setPlanets([...planets, ...reflterPlanets]);
  };

  const changeFilteredPlanets = () => {
    const newColumnsFilters = columnsOptionsFilter
      .filter((column) => column !== columnFilter);
    setFilters([...filters, { operatorFilter, columnFilter, valueFilter }]);
    setColumnsOptionsFilter(newColumnsFilters);
    setColumnFilter(newColumnsFilters[0]);

    const filteredPlanets = filterFuncion(
      operatorFilter,
      columnFilter,

      valueFilter,

      planets,
    );
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
        changeOrdenatorFilter,
        ordenatorFilter,
        changeSortFilter,
        sortFilter,
        changeOrderfilter,
      } }
    >
      {children}
    </ContextAPI.Provider>
  );
}
