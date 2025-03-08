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
            <a href={item.href} className='sidebar-item'>
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

/* Scoreboard */
const Scoreboardheader = () => {
  return (
    <div className='scoreboard-header'>
      <h1>Community Scoreboard</h1>
      <p>Learn More about Evanston's Climate Wins!</p>
      <h2>Edible Evanston</h2> {/* temporarily hardcoded, make adaptable to sidebar */}
    </div>
  );
}

function Scoreboard() {
  return (
    <div className='scoreboard-page'>
      <Scoreboardheader />
      <div className='scoreboard-container'>
        <Sidebar /> 
      </div>
    </div>
  );
}

export default Scoreboard;
