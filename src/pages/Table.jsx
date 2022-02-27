import React, { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';

const COMPARISON = ['maior que', 'menor que', 'igual a'];
const COLUMN = ['population', 'orbital_period', 'diameter',
  'rotation_period', 'surface_water'];

function Table() {
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [numericValue, setNumericValue] = useState('0');
  const {
    planets,
    filterByName,
    getFilteredPlanets,
    setFilterByNumericValues,
  } = useContext(PlanetContext);

  return (
    <>
      <form>
        <input
          placeholder="Filtre planetas por nome"
          type="text"
          value={ filterByName.name }
          data-testid="name-filter"
          onChange={ getFilteredPlanets }
        />
        <select
          type="select"
          data-testid="column-filter"
          value={ column }
          onChange={ ({ target }) => setColumn(target.value) }
        >
          { COLUMN.map((opt) => (
            <option key={ opt } value={ opt }>{ opt }</option>
          ))}
        </select>
        <select
          type="select"
          data-testid="comparison-filter"
          value={ comparison }
          onChange={ ({ target }) => setComparison(target.value) }
        >
          { COMPARISON.map((opt) => (
            <option key={ opt } value={ opt }>{ opt }</option>
          ))}
        </select>
        <input
          placeholder="Valor"
          type="number"
          data-testid="value-filter"
          value={ numericValue || 0 }
          onChange={ ({ target }) => setNumericValue(target.value) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => setFilterByNumericValues((prevState) => [...prevState, {
            column,
            comparison,
            numericValue,
          }]) }
        >
          Filtrar
        </button>
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
          {planets
            .map((planet) => (
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
