import React, { useEffect, useState } from 'react';
import './Scoreboard.css';

/* Display Names map directly to programName in DB */
const programNames = [
  'Beyond Waste',
  'Edible Evanston',
  'Energy',
  'Environmental Justice',
  'Natural Habitat',
  'Climate Action',
];

/* Navigation Sidebar */
const Sidebar = ({ fetchInitiatives, setCurrentProgram }) => {
  return (
    <aside className='sidebar-container'>
      <ul className='sidebar-list'>
        {programNames.map((name, index) => (
          <li key={index}>
            <a
              className='sidebar-item barlow-semibold'
              onClick={() => {
                setCurrentProgram(name);
                fetchInitiatives(name);
              }}
            >
              {name.toUpperCase()}
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
            {program.imageUrl && (
              <img src={program.imageUrl} alt={program.name} className='card-image' />
            )}
          </div>
        ))
      ) : (
        <p>No initiatives available.</p>
      )}
    </div>
  );
};

/* Scoreboard Header */
const ScoreboardHeader = ({ currentProgram }) => {
  return (
    <div className='scoreboard-header'>
      <h1 className='barlow-semibold'>COMMUNITY SCOREBOARD</h1>
      <p className='barlow-semibold'>
        Learn More about Evanston's Climate Wins!
      </p>
      <hr className='divider' />
      <h2 className='barlow-semibold'>{currentProgram.toUpperCase()}</h2>
    </div>
  );
};

/* Scoreboard Component */
function Scoreboard() {
  const [initiatives, setInitiatives] = useState([]);
  const [currentProgram, setCurrentProgram] = useState('Edible Evanston'); // Default program

  useEffect(() => {
    fetchInitiatives(currentProgram);
  }, []);

  const fetchInitiatives = async (programName) => {
    try {
      const response = await fetch(
        `http://localhost:5050/cae/fetch-scoreboard?programName=${encodeURIComponent(programName)}`
      );
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setInitiatives(data.initiatives || []);
    } catch (error) {
      console.error('Error fetching initiatives:', programName, error);
      setInitiatives([]);
    }
  };

  return (
    <div className='scoreboard-page'>
      <ScoreboardHeader currentProgram={currentProgram} />
      <div className='scoreboard-container'>
        <Sidebar
          fetchInitiatives={fetchInitiatives}
          setCurrentProgram={setCurrentProgram}
        />
        <InitiativesGrid initiatives={initiatives} />
      </div>
    </div>
  );
}

export default Scoreboard;