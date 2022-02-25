import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function Table() {
  const {
    planets,
    filterByName,
    setFilterByName,
    setPlanets } = useContext(PlanetContext);

  const getFilteredPlanets = ({ target }) => {
    setFilterByName({ name: target.value });
    if (target.value.length !== 0) {
      setPlanets(planets.filter((planet) => planet.name
        .toLowerCase().includes(target.value)));
    }
    return planets;
  };

  return (
    <>
      <form>
        <input
          type="text"
          value={ filterByName.name }
          data-testid="name-filter"
          onChange={ getFilteredPlanets }
        />
      </form>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>rotation_period</th>
            <th>orbital_period</th>
            <th>diameter</th>
            <th>climate</th>
            <th>gravity</th>
            <th>terrain</th>
            <th>surface_water</th>
            <th>population</th>
            <th>films</th>
            <th>created</th>
            <th>edited</th>
            <th>url</th>
          </tr>
        </thead>
        <tbody>
          {planets.map((planet) => (
            <tr key={ planet.name }>
              <td>{ planet.name }</td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>{ planet.films }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
