/* Scoreboard Page */
import React from 'react';

import './Scoreboard.css';

/* Navigation Sidebar */
const menuItems = [
  { name: 'Beyond Waste', href: '#' }, /* '# is placeholder for the href */,
  { name: 'Edible Evanston', href: '#' },
  { name: 'Energy', href: '#' },
  { name: 'Environmental Justice', href: '#' },
  { name: 'Natural Habitat', href: '#' },
];

const Sidebar = () => {
  return (
    <aside className='sidebar-container'>
      <ul className='sidebar-list'>
        {menuItems.map((item, index) => (
          <li key={index}>
            <a href={item.href} className='sidebar-item barlow-semibold'>
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

/* Initiatives grid */
const Initiatives = [
  { title: 'Food Sharing Program' },
  { title: 'Food Sharing Program' },
  { title: 'Food Sharing Program' },
  { title: 'Food Sharing Program' },
  { title: 'Food Sharing Program' },
  { title: 'Food Sharing Program' },
  { title: 'Food Sharing Program' },
  { title: 'Food Sharing Program' },
  { title: 'Food Sharing Program' },
];

const InitiativesGrid = () => {
  return (
    <div className='grid-container'>
      {Initiatives.map((program, index) => (
        <div key={index} className='card'>
          <div className='card-header barlow-semibold'>{program.title}</div>
          <div className='card-content'>
            {/* todo: update with card content */}
          </div>
        </div>
      ))}
    </div>
  );
};

/* Scoreboard */
const ScoreboardHeader = () => {
  return (
    <div className='scoreboard-header'>
      <h1 className='barlow-semibold'>COMMUNITY SCOREBOARD</h1>
      <p className='barlow-semibold'>Learn More about Evanston's Climate Wins!</p>
      <h2 className='barlow-semibold'>Edible Evanston</h2> 
      {/* temporarily hardcoded, todo: make adaptable to sidebar */}
    </div>
  );
}

function Scoreboard() {
  return (
    <div className='scoreboard-page'>
      <ScoreboardHeader />
      <div className='scoreboard-container'>
        <Sidebar /> 
        <InitiativesGrid />
      </div>
    </div>
  );
}

export default Scoreboard;
