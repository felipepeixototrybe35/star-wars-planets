import React, { useContext } from 'react';
import SWContext from '../context/SWcontext';

function Table() {
  const {
    data,
    setSearch,
    plsearched,
    column,
    comparison,
    value,
    saveOptions,
    handleFilter,
    columnOptions,
    filters, // req7
    excludeFilter, // req7
    excludeAllFilters, // req7
    setSort,
    sort,
    order,
    setColumnSort,
  } = useContext(SWContext);

  const dataKeys = Object.keys(data[0] || {});
  const comparisonOptions = ['maior que', 'menor que', 'igual a'];
  const columnSortOpt = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  return (
    <div>
      <input
        type="text"
        placeholder="Search planet"
        data-testid="name-filter"
        onChange={ ({ target }) => setSearch(target.value) }
      />
      <div>
        <label htmlFor="coluna">Coluna  </label>
        <select
          name="coluna"
          data-testid="column-filter"
          value={ column }
          onChange={ ({ target }) => saveOptions(target) }
        >
          {columnOptions.map((key: any) => (<option key={ key }>{key}</option>))}
        </select>
        {' '}
        <label htmlFor="operador">Operador  </label>
        <select
          name="operador"
          data-testid="comparison-filter"
          value={ comparison }
          onChange={ ({ target }) => saveOptions(target) }
        >
          {comparisonOptions.map((key) => (<option key={ key }>{key}</option>))}
        </select>
        <input
          type="number"
          name="valor"
          data-testid="value-filter"
          value={ value }
          onChange={ ({ target }) => saveOptions(target) }
        />
        <button data-testid="button-filter" onClick={ handleFilter }>
          Filtrar
        </button>
      </div>
      <div>
        {filters.map((filter: any) => ( // req7
          <div data-testid="filter" key={ filter.column }>
            <span>
              {filter.column}
              {' '}
            </span>
            <span>{filter.comparison}</span>
            <span>{filter.value}</span>
            <button type="button" onClick={ () => excludeFilter(filter.column) }>
              X
            </button>
          </div>
        ))}
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ excludeAllFilters }
        >
          Remover Filtros
        </button>
      </div>
      <div>
        <select
          onChange={ (e) => setColumnSort(e.target.value) }
          data-testid="column-sort"
        >
          {columnSortOpt.map((option) => (
            <option value={ option } key={ option }>
              {option}
            </option>
          ))}
        </select>
        <input
          id="asc"
          type="radio"
          value="ASC"
          onChange={ () => setSort('ASC') }
          checked={ sort === 'ASC' }
          data-testid="column-sort-input-asc"
        />
        <label htmlFor="asc">ASC</label>
        <input
          id="desc"
          type="radio"
          value="DESC"
          onChange={ () => setSort('DESC') }
          checked={ sort === 'DESC' }
          data-testid="column-sort-input-desc"
        />
        <label htmlFor="desc">DESC</label>
        <button type="button" onClick={ order } data-testid="column-sort-button">
          Ordenar
        </button>
      </div>
      <table>
        <thead>
          <tr>
            {dataKeys.map((key) => (
              <th key={ key }>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {plsearched.map((planet: any) => (
            <tr key={ planet.name }>
              {dataKeys.map((key: any) => (
                <td key={ key }>{planet[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
