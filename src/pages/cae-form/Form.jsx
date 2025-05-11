import React, { useEffect, useState } from 'react';

import './Form.css';
import InitiativeForm from './InitiativeForm';

const PROGRAMS = [
  'Beyond Waste',
  'Edible Evanston',
  'Energy',
  'Environmental Justice',
  'Natural Habitat',
  'Climate Action',
];

// Helper function to map program name to ID
function getProgramIdByName(name) {
  const mapping = {
    'Beyond Waste': 10,
    'Edible Evanston': 11,
    Energy: 12,
    'Environmental Justice': 13,
    'Natural Habitat': 14,
    'Climate Action': 15,
  };
  return mapping[name];
}

const Form = () => {
  const [programName, setProgramName] = useState('');
  const [password, setPassword] = useState('');
  const [initiativeOptions, setInitiativeOptions] = useState([]);
  const [selectedInitiative, setSelectedInitiative] = useState('');
  const [initiativeData, setInitiativeData] = useState(null);
  const [programDropdownOpen, setProgramDropdownOpen] = useState(false);
  const [initiativeDropdownOpen, setInitiativeDropdownOpen] = useState(false);
  const [step, setStep] = useState(0); // 0 = select, 1 = form
  const [loadingInitiatives, setLoadingInitiatives] = useState(false);
  const [authToken, setAuthToken] = useState('');
  const [isCreateMode, setIsCreateMode] = useState(false);

  // Fetch initiatives when program changes
  useEffect(() => {
    if (!programName) {
      setInitiativeOptions([]);
      setSelectedInitiative('');
      return;
    }
    setLoadingInitiatives(true);
    fetch(
      `http://localhost:5050/auth/fetch-scoreboard?programName=${encodeURIComponent(programName)}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setInitiativeOptions(data.initiatives || []);
        setSelectedInitiative('');
      })
      .catch(() => setInitiativeOptions([]))
      .finally(() => setLoadingInitiatives(false));
  }, [programName, authToken]);

  // Handler for Next button
  const handleNext = async () => {
    try {
      // Use the selected program's ID and password
      const res = await fetch('http://localhost:5050/auth/program-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          programId: getProgramIdByName(programName),
          password: password,
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      setAuthToken('program-session'); // You can generate a real token if you want
      setStep(1);
      setIsCreateMode(selectedInitiative === '__add__');
      setInitiativeData(null);
    } catch (err) {
      alert('Authentication failed: ' + err.message);
    }
  };

  // Handler for going back
  const handleBack = () => {
    setStep(0);
    setInitiativeData(null);
    setAuthToken('');
    setIsCreateMode(false);
  };

  // Fetch initiative data only if we're in edit mode
  useEffect(() => {
    if (step !== 1 || isCreateMode) return;

    if (selectedInitiative && selectedInitiative !== '__add__') {
      fetch(
        `http://localhost:5050/auth/fetch-initiative?programName=${encodeURIComponent(programName)}&initiativeName=${encodeURIComponent(selectedInitiative)}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => setInitiativeData(data))
        .catch(() => setInitiativeData(null));
    }
  }, [step, selectedInitiative, programName, authToken, isCreateMode]);

  return step === 0 ? (
    <div className='initiative-form-manager'>
      <h2 className='form-title'>Program and Initiative Creation/Revision</h2>
      <div className='flex-col-gap24'>
        {/* Program Dropdown */}
        <div>
          <div className='dropdown-label'>Program</div>
          <div className='dropdown-container'>
            <div
              className={`dropdown-selected${programName ? ' selected' : ''}`}
              onClick={() => {
                setProgramDropdownOpen((v) => !v);
                setInitiativeDropdownOpen(false);
              }}
            >
              {programName ? (
                <span style={{ color: '#bbb' }}>{programName}</span>
              ) : (
                <span style={{ color: '#bbb' }}>Select Program</span>
              )}
              <span style={{ marginLeft: 8, fontSize: 18 }}>&#9660;</span>
            </div>
            {programDropdownOpen && (
              <div className='dropdown-list'>
                {PROGRAMS.map((p) => (
                  <div
                    key={p}
                    className='dropdown-item'
                    onClick={() => {
                      setProgramName(p);
                      setProgramDropdownOpen(false);
                    }}
                  >
                    {p}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Initiative Dropdown */}
        <div>
          <div className='dropdown-label'>Initiative</div>
          <div className='dropdown-container'>
            <div
              className={`dropdown-selected${selectedInitiative ? ' selected' : ''}${!programName ? ' disabled' : ''}`}
              onClick={() => {
                if (programName) {
                  setInitiativeDropdownOpen((v) => !v);
                  setProgramDropdownOpen(false);
                }
              }}
            >
              {selectedInitiative
                ? selectedInitiative === '__add__'
                  ? 'Add Initiative'
                  : selectedInitiative
                : 'Select Initiative'}
              <span style={{ marginLeft: 8, fontSize: 18 }}>&#9660;</span>
            </div>
            {initiativeDropdownOpen && programName && (
              <div className='dropdown-list'>
                {loadingInitiatives ? (
                  <div className='dropdown-item'>Loading...</div>
                ) : (
                  <>
                    {initiativeOptions.map((i) => (
                      <div
                        key={i.name}
                        className='dropdown-item'
                        onClick={() => {
                          setSelectedInitiative(i.name);
                          setInitiativeDropdownOpen(false);
                        }}
                      >
                        {i.name}
                      </div>
                    ))}
                    <div
                      className='dropdown-item add'
                      onClick={() => {
                        setSelectedInitiative('__add__');
                        setInitiativeDropdownOpen(false);
                      }}
                    >
                      Add Initiative <span style={{ fontSize: 18 }}>+</span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Password Input */}
        <div>
          <div className='password-label'>Password</div>
          <input
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='password-input'
          />
        </div>

        {/* Next Button */}
        <button
          className='next-button'
          style={{ marginTop: 8 }}
          onClick={handleNext}
          disabled={!programName || !selectedInitiative || !password}
        >
          Next
        </button>
      </div>
    </div>
  ) : (
    <>
      <button
        className='initiative-form-back-arrow'
        onClick={handleBack}
        aria-label='Back'
      >
        &#8592; Back
      </button>
      <InitiativeForm
        mode={isCreateMode ? 'create' : 'edit'}
        programName={programName}
        initialData={isCreateMode ? null : initiativeData}
        authToken={authToken}
      />
    </>
  );
};

export default Form;
