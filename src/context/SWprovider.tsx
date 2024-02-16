import { useEffect, useState } from 'react';
import SWContext from './SWcontext';

function SWProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [plsearched, setPlsearched] = useState([]);
  const [columnOptions, setColumnOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [column, setColumn] = useState(columnOptions[0]);

  useEffect(() => {
    const fetchSWPlanets = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      let resultData = await response.json();
      resultData = resultData.results.map((planet: any) => {
        const { residents, ...planetNotResidents } = planet;
        return planetNotResidents;
      });
      setData(resultData);
    };
    fetchSWPlanets();
  }, []);

  useEffect(() => { // req2
    const searchedData = () => {
      const newData = data.filter((planet: any) => planet
        .name.includes(search.toLowerCase()));
      console.log(newData);
      setPlsearched(newData);
    };
    searchedData();
  }, [data, search]);

  const handleColumnOptions = () => {
    if (columnOptions.length !== 6) {
      setColumnOptions(columnOptions
        .filter((columnOption) => columnOption !== column));
    }
    setColumn(columnOptions[0]);
  };

  const saveOptions = (target: any) => {
    if (target.name === 'coluna') setColumn(target.value);
    if (target.name === 'operador') setComparison(target.value);
    if (target.name === 'valor') setValue(target.value);
  };
  const handleFilter = () => {
    const dataFiltered = plsearched.filter((planet: any) => { // req7avançado
      if (comparison === 'maior que') return Number(planet[column]) > Number(value);
      if (comparison === 'menor que') return Number(planet[column]) < Number(value);
      return Number(planet[column]) === Number(value);
    });
    setPlsearched(dataFiltered);
    handleColumnOptions();
  };

  return (
    <SWContext.Provider
      value={ {
        data,
        setSearch,
        plsearched,
        column,
        comparison,
        value,
        handleFilter,
        saveOptions,
        columnOptions,
      } }
    >
      {children}
    </SWContext.Provider>
  );
}

export default SWProvider;
