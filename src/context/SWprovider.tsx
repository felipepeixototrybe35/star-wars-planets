import { useEffect, useState } from 'react';
import SWContext from './SWcontext';

function SWProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [plsearched, setPlsearched] = useState([]);

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
      } }
    >
      {children}
    </SWContext.Provider>
  );
}

export default SWProvider;
