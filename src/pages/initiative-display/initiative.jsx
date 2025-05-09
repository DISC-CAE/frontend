import React, {useState, useEffect} from 'react';

import default_image from '../../assets/default_image.png';
import './initiative.css';

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
  const [initiative, setInitiative] = useState([]);

  const fetchProgram = async ({programNameParam, initiativeNameParam}) => {
    try {
      const response = await fetch(
        `http://localhost:5050/cae/fetch-initiative?programName=${encodeURIComponent(programNameParam)}&initiativeName=${encodeURIComponent(initiativeNameParam)}`
      );
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setInitiative(data || []);
    } catch (error) {
      console.error('Error fetching initiatives:', {programNameParam, initiativeNameParam}, error);
      setInitiative([]);
    }
  };

  useEffect(() => {
    fetchProgram({
      programNameParam: 'Energy',
      initiativeNameParam: 'Solar Schools',
    });
  }, []);

  return (
    <div className='initiative-page'>
      <Sidebar /> {/* Sidebar */}
      <div className='column2-initiative-display'>
        <div className='initiative-title'>{initiative.initiativeName}</div>{' '}
        <div className='initiative-container'>
          <div className='column action-mode'>
            {' '}
            {/* Action Mode */}
            <h3>Action Mode</h3>
            <ul className='action-mode-options'>
              {['Serve', 'Educate', 'Advocate'].map((mode, idx) => (
                <li
                  key={idx}
                  className={
                    initiative?.modesOfAction?.includes(mode) ? 'highlighted' : ''
                  }
                >
                  {mode}
                </li>
              ))}
            </ul>
            <img
              src={initiative.imageURL || default_image}
              alt={initiative.initiativeName || 'Initiative Image'}
              className='initiative-image'
            />
          </div>
          <div className='column action-description'>
            {' '}
            {/* Action Description */}
            <h3>What Is It?</h3>
            <p>{initiative.description}</p>
          </div>
          <div className='column metrics'>
            {' '}
            {/* Metrics */}
            {initiative?.metrics ? (
            <>
              <h3>Metrics</h3>
              {['People', 'Policy', 'Place'].map((section) => (
                <div className='ppl-policy-place' key={section}>
                  <h4>{section}</h4>
                  <ul className={`${section.toLowerCase()}-list`}>
                    {initiative.metrics[section]?.length > 0 ? (
                      initiative.metrics[section].map((item, idx) => (
                        <li key={idx}>
                          {item.label}: {item.value}
                        </li>
                      ))
                    ) : (
                      <li>No data available</li>
                    )}
                  </ul>
                </div>
              ))}
            </>
          ) : (
            <p>Loading metrics...</p>
          )}
          </div>
          {/* End of People, Policy, Place Metrics */}
        </div>
      </div>
    </div>
  );
};

export default InitiativePage;
