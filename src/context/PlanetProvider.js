import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';
import fetchAPI from '../service/fetchAPI';

function PlanetProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  const getPlantes = async () => {
    const results = await fetchAPI();
    setPlanets(results);
  };

  useEffect(() => {
    getPlantes();
  }, []);

  const value = { planets };

  return (
    <PlanetContext.Provider value={ value }>
      { children }
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetProvider;
