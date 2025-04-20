import React, { useEffect, useState } from 'react';

import './Initiative.css';

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


/* Main Initiatives Display */
const InitiativePage = () => {
  return (
    <div className="initiative-display">
      <h2 className="initiative-title">FOOD SHARING INITIATIVE</h2>
      <div className="initiative-container">
        <div className="initiative-content">
          <h3>Action Mode</h3>
          <ul>
            <li>Serve</li>
            <li>Educate</li>
            <li>Advocate</li>
          </ul>
        </div>
      </div>
    </div>
  );
};



export default InitiativePage;
