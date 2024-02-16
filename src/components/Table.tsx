import React, { useContext } from 'react';
import SWContext from '../context/SWcontext';

function Table() {
  const { data } = useContext(SWContext);
  const dataKeys = Object.keys(data[0] || {});
  return (
    <div>
      <table>
        <thead>
          <tr>
            {dataKeys.map((key) => (
              <th key={ key }>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((planet: any) => (
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
