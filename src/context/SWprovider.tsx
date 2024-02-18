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
      // console.log(newData);
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
    setPlsearched(data);
    console.log(newFilterdel);
    newFilterdel.forEach((e) => {
      const lastData = plsearched.filter((planet: any) => {
        if (e.comparison === 'maior que') {
          return Number(planet[e.column]) > Number(e.value);
        }
        if (e.comparison === 'menor que') {
          return Number(planet[e.column]) < Number(e.value);
        }
        return Number(planet[e.column]) === Number(e.value);
      });
      console.log(lastData);
      setPlsearched(lastData);
    });
  };
  // useEffect(() => {
  //   const newFilterData = () => {
  //     setPlsearched(data);
  //     console.log(filters);
  //     filters.forEach((filter) => {
  //       const lastData = plsearched.filter((planet: any) => {
  //         if (filter.comparison === 'maior que') return Number(planet[filter
  //           .column]) > Number(filter.value);
  //         if (filter.comparison === 'menor que') return Number(planet[filter
  //           .column]) < Number(filter.value);
  //         return Number(planet[filter.column]) === Number(filter.value);
  //       });
  //       console.log(lastData);
  //       setPlsearched(lastData);
  //     });
  //   };
  //   newFilterData();
  // }, [filters]);

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
      } }
    >
      {children}
    </SWContext.Provider>
  );
}

export default SWProvider;
