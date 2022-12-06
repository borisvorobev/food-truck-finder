import React from 'react';
import Input from '../input/Input.jsx';
import Loading from '../loading/Loading.jsx';
import Results from './components/Results.jsx';
import './Sidebar.css';

const Sidebar = ({ selectedTruck, results, loading, showSidebar, query, setQuery = () => {}, onSearch = () => {}, onTruckSelect = () => {}, onReset = () => {} }, error) => (
    <div className={`sidebar ${showSidebar ? 'sidebar-show' : ''}`}>
        <form onReset={onReset} onSubmit={onSearch} className="sidebar__search-bar">
            <Input clearable className="sidebar__search-input" type="search" value={query} onInput={setQuery} />
            <button disabled={loading} type="submit" className="sidebar__search-button">
                Search
            </button>
        </form>
        {error && <p>{error.message}</p>}
        <Loading show={loading} />
        <Results onTruckSelect={onTruckSelect} trucks={results} selectedTruck={selectedTruck} />
    </div>
)

export default Sidebar;
