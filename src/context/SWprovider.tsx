import { useEffect, useState } from 'react';
import SWContext from './SWcontext';

function SWProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState([]);

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

  return <SWContext.Provider value={ { data } }>{children}</SWContext.Provider>;
}

export default SWProvider;
