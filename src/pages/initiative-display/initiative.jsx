import React, { useEffect, useState } from 'react';


import './initiative.css';


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


/* Main Initatives Display */
<div className="initative-display">
 <h2 className="initiative-title">FOOD SHARING INITATIVE</h2>
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

