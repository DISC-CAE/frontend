import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import default_image from '../../assets/default_image.png';
import './initiative.css';

/* Main Initiatives Display */
const InitiativePage = () => {
  const [initiative, setInitiative] = useState([]);
  const { programNameParam, initiativeNameParam } = useParams();
  const navigate = useNavigate();

  const fetchProgram = async ({ programNameParam, initiativeNameParam }) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/cae/fetch-initiative?programName=${encodeURIComponent(programNameParam)}&initiativeName=${encodeURIComponent(initiativeNameParam)}`
      );
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setInitiative(data || []);
    } catch (error) {
      console.error(
        'Error fetching initiatives:',
        { programNameParam, initiativeNameParam },
        error
      );
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
      <div className='initiative-layout'>
        <button className='back-button' onClick={() => navigate('/scoreboard')}>
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
                      initiative?.modesOfAction?.includes(mode)
                        ? 'highlighted'
                        : ''
                    }
                  >
                    {mode}
                  </li>
                ))}
              </ul>
              <img
                src={initiative.imageUrl || default_image}
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
                      {initiative.metrics[section]?.filter(
                        (item) => item.showInScoreboard !== false
                      ).length > 0 ? (
                        <div className='metrics-list'>
                          {initiative.metrics[section]
                            .filter((item) => item.showInScoreboard !== false)
                            .map((item, idx) => (
                              <div key={idx} className='metric-item'>
                                <span className='metric-label'>
                                  {item.label}
                                </span>
                                <span className='metric-total'>
                                  {item.values?.reduce(
                                    (sum, entry) =>
                                      sum + (parseInt(entry.value) || 0),
                                    0
                                  ) || 0}
                                </span>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <p className='no-data'>No data available</p>
                      )}
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
