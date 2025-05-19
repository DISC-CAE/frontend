import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import default_image from '../../assets/default_image.png';
import './initiative.css';


/* Main Initiatives Display */
const InitiativePage = () => {
  const [initiative, setInitiative] = useState([]);
  const { programNameParam, initiativeNameParam } = useParams();
  const navigate = useNavigate();

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
    if (!programNameParam || !initiativeNameParam) return;
  
    fetchProgram({
      programNameParam,
      initiativeNameParam,
    });
  }, [programNameParam, initiativeNameParam]);

  return (
    <div className='initiative-page'>
      <div className="initiative-layout">
        <button className="back-button" onClick={() => navigate('/scoreboard')}>
          ◀ Back to Scoreboard
        </button>
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
    </div>
  );
};

export default InitiativePage;
