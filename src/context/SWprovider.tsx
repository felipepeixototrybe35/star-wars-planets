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
  const [filters, setFilters] = useState<any[]>([]); // req7
  const [sort, setSort] = useState('');
  const [columnSort, setColumnSort] = useState('population');

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
  useEffect(() => {
    const searchedData = () => {
      const newData = data.filter((planet: any) => planet
        .name.includes(search.toLowerCase()));
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
    const dataFiltered = plsearched.filter((planet: any) => {
      if (comparison === 'maior que') return Number(planet[column]) > Number(value);
      if (comparison === 'menor que') return Number(planet[column]) < Number(value);
      return Number(planet[column]) === Number(value);
    });
    setPlsearched(dataFiltered);
    handleColumnOptions();
    const newFilter = { // req7
      column,
      comparison,
      value,
    };
    setFilters([...filters, newFilter]); // req7
  };

  const excludeFilter = (filterDelete: any) => { // req7
    const newFilterdel = filters.filter((filter) => filter.column !== filterDelete);
    setFilters(newFilterdel);
    setColumnOptions([...columnOptions, filterDelete]);
    if (newFilterdel.length !== 0) {
      newFilterdel.forEach((e) => {
        const lastData = data.filter((planet: any) => {
          if (e.comparison === 'maior que') {
            return Number(planet[e.column]) > Number(e.value);
          }
          if (e.comparison === 'menor que') {
            return Number(planet[e.column]) < Number(e.value);
          }
          return Number(planet[e.column]) === Number(e.value);
        });
        setPlsearched(lastData);
      });
    } else {
      setPlsearched(data);
    }
  };
  const excludeAllFilters = () => { // req7
    setFilters([]);
    setColumnOptions([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
    setPlsearched(data);
  };

  const order = () => {
    const plsearchedSort = [...plsearched].slice().sort((a, b) => {
      if (a[columnSort] === 'unknown') { return 1; }
      if (b[columnSort] === 'unknown') { return -1; }
      if (sort === 'DESC') { return b[columnSort] - a[columnSort]; }
      return a[columnSort] - b[columnSort];
    });
    // console.log(plsearchedSort);
    setPlsearched(plsearchedSort);
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
        filters, // req7
        excludeFilter, // req7
        excludeAllFilters, // req7
        setSort,
        sort,
        order,
        setColumnSort,
      } }
    >
      {children}
    </SWContext.Provider>
  );
}
export default SWProvider;
