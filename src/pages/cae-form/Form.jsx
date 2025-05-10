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

  // Fetch initiatives when program changes
  useEffect(() => {
    if (!programName) {
      setInitiativeOptions([]);
      setSelectedInitiative('');
      return;
    }
    setLoadingInitiatives(true);
    fetch(
      `http://localhost:5050/cae/fetch-scoreboard?programName=${encodeURIComponent(programName)}`
    )
      .then((res) => res.json())
      .then((data) => {
        setInitiativeOptions(data.initiatives || []);
        setSelectedInitiative('');
      })
      .catch(() => setInitiativeOptions([]))
      .finally(() => setLoadingInitiatives(false));
  }, [programName]);

  // Fetch initiative data if editing
  useEffect(() => {
    if (step !== 1) return;
    if (selectedInitiative && selectedInitiative !== '__add__') {
      fetch(
        `http://localhost:5050/cae/fetch-initiative?programName=${encodeURIComponent(programName)}&initiativeName=${encodeURIComponent(selectedInitiative)}`
      )
        .then((res) => res.json())
        .then((data) => setInitiativeData(data))
        .catch(() => setInitiativeData(null));
    } else {
      setInitiativeData(null);
    }
  }, [step, selectedInitiative, programName]);

  // Handler for Next button
  const handleNext = () => {
    setStep(1);
  };

  // Handler for going back
  const handleBack = () => {
    setStep(0);
    setInitiativeData(null);
  };

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
        mode={selectedInitiative === '__add__' ? 'create' : 'edit'}
        programName={programName}
        initialData={selectedInitiative === '__add__' ? null : initiativeData}
      />
    </>
  );
};

export default Form;
