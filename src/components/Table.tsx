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
  } = useContext(SWContext);

  const dataKeys = Object.keys(data[0] || {});
  const comparisonOptions = ['maior que', 'menor que', 'igual a'];
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
        <button data-testid="button-filter" onClick={ handleFilter }>Filtrar</button>
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
