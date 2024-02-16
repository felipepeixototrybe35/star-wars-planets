import { useEffect, useState } from "react";
import SWContext from "./SWcontext";

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
  const [column, setColumn] = useState(columnOptions[0]);

  const handleColumnOptions = () => {
    if (columnOptions.length !== 6) {
      setColumnOptions(columnOptions
        .filter((columnOption) => columnOption !== column));
    }
    setColumn(columnOptions[0]);
  };

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

  return (
    <SWContext.Provider
      value={ {
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
      } }
    >
      {children}
    </SWContext.Provider>
  );

}

export default SWProvider;