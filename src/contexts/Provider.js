import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextAPI from './ContextAPI';

export default function Provider({ children }) {
  const [planets, setPlanets] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [operatorFilter, setOperatorFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [dataPlanets, setDataPlanets] = useState('');

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

  const changeFilteredPlanets = async () => {
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
      } }
    >
      {children}
    </ContextAPI.Provider>
  );
}
