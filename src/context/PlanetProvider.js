import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';
import fetchAPI from '../service/fetchAPI';

function PlanetProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [columnOptions, setColumnOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [comparisonOptions, setComparisonOptions] = useState([
    'maior que',
    'menor que',
    'igual a',
  ]);

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
        .toLowerCase().includes(target.value.toLowerCase()));
      setPlanets(newFilterPlanets);
    }
    if (target.value.length === 0) {
      getPlantes();
    }
  };

  useEffect(() => {
    if (filterByNumericValues.length) {
      const lengthNumericValues = filterByNumericValues.length - 1;
      const {
        column,
        comparison,
        numericValue } = filterByNumericValues[lengthNumericValues];
      const newPlanets = planets
        .filter((planet) => {
          if (comparison === 'maior que') {
            return Number(planet[column]) > Number(numericValue);
          }
          if (comparison === 'menor que') {
            return Number(planet[column]) < Number(numericValue);
          }
          if (comparison === 'igual a') {
            return Number(planet[column]) === Number(numericValue);
          }
          return null;
        });
      const newOptions = columnOptions.filter((col) => col !== column);
      setColumnOptions(newOptions);
      const newComparison = comparisonOptions.filter((com) => com !== comparison);
      setComparisonOptions(newComparison);
      if (planets.length !== newPlanets.length) setPlanets(newPlanets);
    }
  }, [filterByNumericValues, planets]);

  const value = {
    planets,
    filterByName,
    filteredPlanets,
    columnOptions,
    comparisonOptions,
    setFilterByName,
    setPlanets,
    setFilteredPlanets,
    getFilteredPlanets,
    setFilterByNumericValues,
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
