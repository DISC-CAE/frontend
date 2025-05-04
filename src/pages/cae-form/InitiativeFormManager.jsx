import React, { useEffect, useState } from 'react';
import InitiativeForm from './InitiativeForm';

const PROGRAMS = [
  'Beyond Waste',
  'Edible Evanston',
  'Energy',
  'Environmental Justice',
  'Natural Habitat',
  'Climate Action',
];

const InitiativeFormManager = () => {
  const [mode, setMode] = useState('create'); // 'create' or 'edit'
  const [programName, setProgramName] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [formLocked, setFormLocked] = useState(false); // prevent mode switching
  const [initiativeOptions, setInitiativeOptions] = useState([]);
  const [selectedInitiative, setSelectedInitiative] = useState('');
  const [initiativeData, setInitiativeData] = useState(null);

  const handleProgramAuth = async () => {
    if (programName && password) {
      setAuthenticated(true);
      setFormLocked(true); // lock mode switching

      if (mode === 'edit') {
        const res = await fetch(
          `http://localhost:5050/cae/fetch-scoreboard?programName=${encodeURIComponent(programName)}`
        );
        const data = await res.json();
        setInitiativeOptions(data.initiatives || []);
      }
    } else {
      alert('Please select a program and enter password.');
    }
  };

  useEffect(() => {
    if (mode !== 'edit' || !selectedInitiative) return;

    const fetchInitiative = async () => {
      try {
        const res = await fetch(
          `http://localhost:5050/cae/fetch-initiative?programName=${encodeURIComponent(programName)}&initiativeName=${encodeURIComponent(selectedInitiative)}`
        );
        const data = await res.json();
        console.log('[DEBUG] Loaded initiative data:', data);
        setInitiativeData(data);
      } catch (err) {
        console.error('Failed to load initiative:', err);
      }
    };

    fetchInitiative();
  }, [mode, selectedInitiative, programName]);

  return (
    <div className='initiative-form-manager'>
      <h2>
        {mode === 'create'
          ? 'Create New Initiative'
          : 'Edit Existing Initiative'}
      </h2>

      {/* Show mode switch only before auth */}
      {!authenticated && (
        <div>
          <label>
            <input
              type='radio'
              value='create'
              checked={mode === 'create'}
              onChange={() => {
                if (!formLocked) setMode('create');
              }}
            />
            Create
          </label>
          <label>
            <input
              type='radio'
              value='edit'
              checked={mode === 'edit'}
              onChange={() => {
                if (!formLocked) setMode('edit');
              }}
            />
            Edit
          </label>
        </div>
      )}

      {!authenticated ? (
        <div>
          <select
            value={programName}
            onChange={(e) => setProgramName(e.target.value)}
            required
          >
            <option value=''>Select Program</option>
            {PROGRAMS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <input
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleProgramAuth}>Continue</button>
        </div>
      ) : mode === 'edit' && !initiativeData ? (
        <div>
          <select
            value={selectedInitiative}
            onChange={(e) => setSelectedInitiative(e.target.value)}
            required
          >
            <option value=''>Select Initiative</option>
            {initiativeOptions.map((i) => (
              <option key={i.name} value={i.name}>
                {i.name}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <InitiativeForm
          mode={mode}
          programName={programName}
          initialData={mode === 'edit' ? initiativeData : null}
        />
      )}
    </div>
  );
};

export default InitiativeFormManager;
