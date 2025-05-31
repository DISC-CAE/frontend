import React, { useCallback, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import './Scoreboard.css';

// Available program names
const PROGRAMS = [
  'Beyond Waste',
  'Edible Evanston',
  'Energy',
  'Environmental Justice',
  'Natural Habitat',
  'Climate Action',
];

// Function to get program icon filename
const getProgramIcon = (programName) => {
  const iconMap = {
    'Beyond Waste': 'beyondwaste.png',
    'Edible Evanston': 'edibleevanston.png',
    Energy: 'energy.png',
    'Environmental Justice': 'environmentjustice.png',
    'Natural Habitat': 'naturalhabitat.png',
    'Climate Action': 'climateaction.png', // assuming this exists or will be added
  };
  return iconMap[programName] || 'edibleevanston.png'; // fallback
};

// Sidebar Navigation
const Sidebar = ({ onSelect, activeProgram }) => (
  <aside className='sidebar-container'>
    <ul className='sidebar-list'>
      {PROGRAMS.map((program) => (
        <li key={program}>
          <button
            className={`sidebar-item barlow-semibold ${program === activeProgram ? 'active' : ''}`}
            onClick={() => onSelect(program)}
          >
            {program.toUpperCase()}
          </button>
        </li>
      ))}
    </ul>
  </aside>
);

// Initiative Grid
const InitiativesGrid = ({ initiatives, program }) => (
  <div className='grid-container'>
    {initiatives.length ? (
      initiatives.map(({ name, description, imageUrl }) => (
        <Link
          to={`/initiative/${encodeURIComponent(program)}/${encodeURIComponent(name)}`}
          key={name}
          className='card-link'
        >
          <div className='card'>
            <img
              src={`/${getProgramIcon(program)}`}
              alt={`${program} icon`}
              className='card-program-icon'
            />
            <div className='card-header barlow-semibold'>{name}</div>
            <div className='card-content'>
              <div className='card-description'>{description}</div>
              {imageUrl && (
                <img src={imageUrl} alt={name} className='card-image' />
              )}
              <div className='card-arrow'>›</div>
            </div>
          </div>
        </Link>
      ))
    ) : (
      <p>No initiatives available.</p>
    )}
  </div>
);

// Header
const ScoreboardHeader = ({ program }) => (
  <header className='scoreboard-header'>
    <h1 className='barlow-semibold'>COMMUNITY SCOREBOARD</h1>
    <p className='barlow-semibold'>Learn More about Evanston's Climate Wins!</p>
    <hr className='divider' />
    <h2 className='barlow-semibold'>{program.toUpperCase()}</h2>
  </header>
);

// Main Component
const Scoreboard = () => {
  const [currentProgram, setCurrentProgram] = useState('Beyond Waste');
  const [initiatives, setInitiatives] = useState([]);

  const fetchInitiatives = useCallback(async (programName) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/cae/fetch-scoreboard?programName=${encodeURIComponent(programName)}`
      );
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setInitiatives(data.initiatives || []);
    } catch (error) {
      console.error('Error fetching initiatives for', programName, error);
      setInitiatives([]);
    }
  }, []);

  useEffect(() => {
    fetchInitiatives(currentProgram);
  }, [currentProgram, fetchInitiatives]);

  const handleProgramSelect = (program) => {
    setCurrentProgram(program);
  };

  return (
    <main className='scoreboard-page'>
      <ScoreboardHeader program={currentProgram} />
      <div className='scoreboard-container'>
        <Sidebar
          onSelect={handleProgramSelect}
          activeProgram={currentProgram}
        />
        <InitiativesGrid initiatives={initiatives} program={currentProgram} />
      </div>
    </main>
  );
};

export default Scoreboard;
