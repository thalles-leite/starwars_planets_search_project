import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextAPI from './ContextAPI';

export default function Provider({ children }) {
  const [planets, setPlanets] = useState();
  const [nameFilter, setNameFilter] = useState('');

  const requestApi = async () => {
    const response = await fetch('https://swapi.dev/api/planets');
    const { results } = await response.json();
    const newResults = results.map((result) => {
      const { residents, ...otherValues } = result;
      return otherValues;
    });
    setPlanets(newResults);
  };

  useEffect(() => {
    requestApi();
  }, []);

  const changeNameFilter = (namePlanet) => {
    console.log(namePlanet);
    setNameFilter(namePlanet);
  };

  Provider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  return (
    <ContextAPI.Provider value={ { planets, changeNameFilter, nameFilter } }>
      {children}
    </ContextAPI.Provider>
  );
}
