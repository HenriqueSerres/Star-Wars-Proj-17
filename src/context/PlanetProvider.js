import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';
import fetchAPI from '../service/fetchAPI';

function PlanetProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  const getPlantes = async () => {
    const results = await fetchAPI();
    setPlanets(results);
  };

  useEffect(() => {
    getPlantes();
  }, []);

  const getFilteredPlanets = ({ target }) => {
    setFilterByName({ name: target.value });
    if (target.value.length !== 0) {
      const newFilterPlanets = planets.filter((planet) => planet.name
        .toLowerCase().includes(target.value));
      setFilteredPlanets(newFilterPlanets);
    }
    if (target.value.length === 0) {
      getPlantes();
    }
  };

  const value = {
    planets,
    filterByName,
    filteredPlanets,
    setFilterByName,
    setPlanets,
    setFilteredPlanets,
    getFilteredPlanets,
  };

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
