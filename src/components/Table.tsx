import React, { useContext } from 'react';
import SWpContext from '../context/SWcontext';

function Table() {
  const {
    data,
    setSearch,
    plsearched,
    column,
    // comparison,
    // value,
    // saveOptions,
    // handleFilter,
    columnOptions,
    // filters, // req7
    // excludeFilter, // req7
    // excludeAllFilters, // req7
  } = useContext(SWpContext);

  const dataKeys = Object.keys(data[0] || {});

  const comparisonOptions = ['maior que', 'menor que', 'igual a'];

  return (
    <>
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
        //   value={ column }
        //   onChange={ ({ target }) => saveOptions(target) }
        >
          {columnOptions.map((key: any) => (<option key={ key }>{key}</option>))}
        </select>
        {' '}
        <label htmlFor="operador">Operador  </label>
        <select
          name="operador"
          data-testid="comparison-filter"
        //   value={ comparison }
        //   onChange={ ({ target }) => saveOptions(target) }
        >
          {comparisonOptions.map((key) => (<option key={ key }>{key}</option>))}
        </select>
        <input
          type="number"
          name="valor"
          data-testid="value-filter"
        //   value={ value }
        //   onChange={ ({ target }) => saveOptions(target) }
        />
        <button
          data-testid="button-filter"
        //   onClick={ handleFilter }
          >
            Filtrar
          </button>
      </div>
      {filters.map((filter: any) => ( // req7
        <div data-testid="filter" key={ filter.column }>
          <span>
            {filter.column}
            {' '}
          </span>
          <span>{filter.comparison}</span>
          <span>{filter.value}</span>
          <button
            type="button"
            // onClick={ () => excludeFilter(filter.column) }
            >
              X
            </button>
        </div>
      ))}
      <button
        type="button"
        data-testid="button-remove-filters"
        // onClick={ excludeAllFilters }
      >
        Remover Filtros
      </button>
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
    </>
  );
}

export default Table;