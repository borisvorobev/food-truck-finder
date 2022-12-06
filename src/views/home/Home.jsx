import React, { useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Map from '../../components/map/Map';
import useFetch from 'use-http';
import './Home.css';

const searchParams = new URLSearchParams(document.location.search);

const Home = () => {
  const [trucks, setTrucks] = React.useState([]);
  const [query, setQuery] = React.useState('');
  const { get, response, loading, error } = useFetch(
    'https://data.sfgov.org',
  );
  const [selectedTruck, setSelectedTruck] = React.useState(null);

  const [isOpenSidebar, setOpenSidebar] = React.useState(true);

  useEffect(() => {
    const paramQuery = searchParams.get('q');
    if (paramQuery) loadInitialTrucks(paramQuery)
    else getAPITrucks();
  }, [searchParams]);

  const onTruckSelected = (truck) => {
    truck.ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
    setSelectedTruck(truck)
  };

  const loadInitialTrucks = async (paramQuery = '') => {
    const initialTrucks = await get(`/resource/rqzj-sfat?$q=${paramQuery}`);
    if (response.ok) {
      const referencedTrucks = initialTrucks.map((truck) => {
        truck.ref = React.createRef();
        return truck;
      })
      setTrucks(referencedTrucks);
      setQuery(paramQuery);
    } 
  };

  const getAPITrucks = async () => {
    const trucks = await get(`/resource/rqzj-sfat${query ? '?$q=' + query : ''}`);
    if (response.ok) {
      const referencedTrucks = trucks.map((truck) => {
        truck.ref = React.createRef();
        return truck;
      })
      setTrucks(referencedTrucks);
      if (query.length) setQuery(query);
    };
  };

  const onSearch = (e) => {
    e.preventDefault();
    getAPITrucks();
    searchParams.set('q', query);
    window.history.pushState({}, null, `?${searchParams.toString()}`);
  }

  const onReset = (e) => {
    e.preventDefault();
    setQuery('');
    window.history.pushState({}, null, `?${searchParams.toString()}`);
    searchParams.set('q', '');
    loadInitialTrucks();
  }

  return (
    <div className="home">
      <Sidebar
        selectedTruck={selectedTruck}
        onTruckSelected={onTruckSelected}
        results={trucks}
        loading={loading}
        error={error}
        showSidebar={isOpenSidebar}
        query={query}
        setQuery={setQuery}
        onSearch={onSearch}
        onTruckSelect={onTruckSelected}
        onReset={onReset}
      />
      <Map
        selectedTruck={selectedTruck}
        results={trucks}
        onTruckSelect={onTruckSelected}
      />
    </div>
  );
};

export default Home;
