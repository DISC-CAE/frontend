import React, { useEffect, useState } from 'react';

import './Scoreboard.css';

/* Map Display Names to API Query Parameters */
const entityQueryMap = {
  'BEYOND WASTE': 'beyond_waste',
  'EDIBLE EVANSTON': 'edible_evanston',
  ENERGY: 'energy',
  'ENVIRONMENTAL JUSTICE': 'environment_justice',
  'NATURAL HABITAT': 'natural_habitat',
  'CLIMATE ACTION': 'climate_action',
};

/* Navigation Sidebar */
const Sidebar = ({ fetchInitiatives, setCurrentEntity }) => {
  return (
    <aside className='sidebar-container'>
      <ul className='sidebar-list'>
        {Object.keys(entityQueryMap).map((name, index) => (
          <li key={index}>
            <a
              className='sidebar-item barlow-semibold'
              onClick={() => {
                setCurrentEntity(name); // Update header
                fetchInitiatives(entityQueryMap[name]); // Fetch new data
              }}
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

/* Initiatives Grid */
const InitiativesGrid = ({ initiatives }) => {
  return (
    <div className='grid-container'>
      {initiatives.length > 0 ? (
        initiatives.map((program, index) => (
          <div key={index} className='card'>
            <div className='card-header barlow-semibold'>{program.name}</div>
            <div className='card-content'>{program.description}</div>
          </div>
        ))
      ) : (
        <p>No initiatives available.</p>
      )}
    </div>
  );
};

/* Scoreboard Header */
const ScoreboardHeader = ({ currentEntity }) => {
  return (
    <div className='scoreboard-header'>
      <h1 className='barlow-semibold'>COMMUNITY SCOREBOARD</h1>
      <p className='barlow-semibold'>
        Learn More about Evanston's Climate Wins!
      </p>
      <hr className='divider' />
      <h2 className='barlow-semibold'>{currentEntity}</h2>
    </div>
  );
};

/* Scoreboard Component */
function Scoreboard() {
  const [initiatives, setInitiatives] = useState([]);
  const [currentEntity, setCurrentEntity] = useState('EDIBLE EVANSTON'); // Default entity

  useEffect(() => {
    fetchInitiatives(entityQueryMap[currentEntity]);
  }, []);

  const fetchInitiatives = async (entityParam) => {
    try {
      const response = await fetch(
        `http://localhost:5050/cae/fetch-scoreboard?entity=${encodeURIComponent(entityParam)}`
      );
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setInitiatives(data || []);
    } catch (error) {
      console.error('Error fetching initiatives:', entityParam, error);
      setInitiatives([]);
    }
  };

  return (
    <div className='scoreboard-page'>
      <ScoreboardHeader currentEntity={currentEntity} />
      <div className='scoreboard-container'>
        <Sidebar
          fetchInitiatives={fetchInitiatives}
          setCurrentEntity={setCurrentEntity}
        />
        <InitiativesGrid initiatives={initiatives} />
      </div>
    </div>
  );
}

export default Scoreboard;
