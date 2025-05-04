import React from 'react';

import './initiative.css';
import repair_cafe from '../../assets/repair_cafe.png';

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

const SidebarTemp = () => {
  return <div className='sidebarplaceholder'>SIDEBAR PLACEHOLDER</div>;
};

/* Main Initiatives Display */
const InitiativePage = () => {
  return (
      <div className='initiative-page'>
        <div className='column1-initiative-sidebar'> Sidebar placeholder </div> {/* Replace with proper sidebar nav */}
        <div className='column2-initiative-display'>
          <div className='initiative-title'>FOOD SHARING PROGRAM</div> {/* Temporarily hardcoded */}
          <div className='initiative-container'>
            <div className='column action-mode'> {/* Action Mode */}
              <h3>Action Mode</h3>
              <ul className='action-mode-options'>
                <li className='highlighted'>Serve</li>
                <li>Educate</li>
                <li>Advocate</li>
              </ul>
              <img src={repair_cafe} alt="Repair Cafe Event" className="initiative-image" /> {/* Temporarily hardcoded image */}
            </div>
            <div className='column action-description'> {/* Action Description */}
              <h3>Action</h3>
              <p className='action-title'>Repair Cafe</p>
              <p>
                On May 23, 2025, our Beyond Waste Program hosted a Repair Cafe in
                partnership with Evanston Public Library where residents received
                free repairs on household items.
              </p>
            </div>
            <div className='column metrics'> {/* Metrics */}
              <h3>Metrics</h3>
              <div className='ppl-policy-place'>
                <h4>People</h4>
                <ul className='ppl-list'>
                  <li>125 people served</li>
                  <li>46 volunteers</li>
                </ul>
              </div>
              <div className='ppl-policy-place'>
                <h4>Policy</h4>
                <ul className='policy-list'>
                  <li>Evanston's CARP Goals</li>
                  <li>The Circular Evanston Roadmap </li>
                </ul>
              </div>
              <div className='ppl-policy-place'>
                <h4>Place</h4>
                <ul className='place-list'>
                  <li>115 items repaired and not sent to landfill</li>
                </ul>
              </div>
            </div>
            {/* End of People, Policy, Place Metrics */}
        </div>
        </div>
      </div>
  );
};

export default InitiativePage;
