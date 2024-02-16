import React, { useContext } from 'react';
import SWContext from '../context/SWcontext';

function Table() {
  const {
    data,
    setSearch,
    plsearched,
  } = useContext(SWContext);
  const dataKeys = Object.keys(data[0] || {});
  return (
    <div>
      <input
        type="text"
        placeholder="Search planet"
        data-testid="name-filter"
        onChange={ ({ target }) => setSearch(target.value) }
      />
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
