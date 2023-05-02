import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextAPI from './ContextAPI';

export default function Provider({ children }) {
  const [planets, setPlanets] = useState();

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

  Provider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  return (
    <ContextAPI.Provider value={ { planets } }>
      {children}
    </ContextAPI.Provider>
  );
}
