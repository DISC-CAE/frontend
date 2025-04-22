import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';

const programOptions = [
  { value: 'beyond-waste', label: 'Beyond Waste' },
  { value: 'edible-evanston', label: 'Edible Evanston' },
  { value: 'energy', label: 'Energy' },
  { value: 'environmental-justice-evanston', label: 'Environmental Justice Evanston' },
  { value: 'natural-habitat-evanston', label: 'Natural Habitat Evanston' }
];

const initiativesByProgram = {
  'beyond-waste': [
    { value: 'repair-cafes', label: 'Repair Cafes' },
    { value: 'circular-evanston-roadmap', label: 'Circular Evanston Roadmap' },
  ],
  'edible-evanston': [
    { value: 'placeholder-ee', label: 'Placeholder Initiative' },
  ],
  'energy': [
    { value: 'placeholder-energy', label: 'Placeholder Initiative' },
  ],
  'environmental-justice-evanston': [
    { value: 'placeholder-eje', label: 'Placeholder Initiative' },
  ],
  'natural-habitat-evanston': [
    { value: 'placeholder-nhe', label: 'Placeholder Initiative' },
  ]
};

function InitiativeForm() {
  const navigate = useNavigate();
  const [program, setProgram] = useState('beyond-waste');
  const [showProgramDropdown, setShowProgramDropdown] = useState(false);

  const [initiative, setInitiative] = useState('');
  const [showInitiativeDropdown, setShowInitiativeDropdown] = useState(false);

  const [password, setPassword] = useState('');

  const handleProgramSelect = (value) => {
    setProgram(value);
    setInitiative('');
    setShowProgramDropdown(false);
    setShowInitiativeDropdown(false);
  };

  const handleInitiativeSelect = (value) => {
    setInitiative(value);
    setShowInitiativeDropdown(false);
    if (value === 'add-initiative') {
      navigate('/create-initiative/add');
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (initiative && initiative !== 'add-initiative') {
      navigate(`/edit-initiative/${program}/${initiative}`);
    } else {
      alert('Please select an initiative');

const organizations = [
  'Beyond Waste',
  'Edible Evanston',
  'Energy',
  'Environmental Justice',
  'Natural Habitat',
  'Climate Action',
];

function Form() {
  const [formData, setFormData] = useState({
    organization_name: '',
    initiative_name: '',
    event_date: '',
    event_location: '',
    event_description: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting form:', formData);

      const response = await fetch('http://localhost:5050/cae/add-initiative', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response:', data);
      alert('Event added successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit event.');
    }
  };

  return (

    <div className="Form--container">
      <form className="ProgramInitiativeForm" onSubmit={handleNext}>
        <h2>Program and Initiative Creation/Revision</h2>

        <label className="FormLabel">Program</label>
        <div className="custom-dropdown">
          <div
            className="dropdown-selected"
            onClick={() => setShowProgramDropdown(!showProgramDropdown)}
            tabIndex={0}
            onBlur={() => setTimeout(() => setShowProgramDropdown(false), 100)}
          >
            {programOptions.find(opt => opt.value === program)?.label}
            <span className="dropdown-arrow">▼</span>
          </div>
          {showProgramDropdown && (
            <div className="dropdown-menu">
              {programOptions.map(opt => (
                <div
                  key={opt.value}
                  className="dropdown-item"
                  onClick={() => handleProgramSelect(opt.value)}
                >
                  {opt.label}
                </div>
              ))}
            </div>
          )}
        </div>

        <label className="FormLabel">Initiative</label>
        <div className="custom-dropdown">
          <div
            className="dropdown-selected"
            onClick={() => setShowInitiativeDropdown(!showInitiativeDropdown)}
            tabIndex={0}
            onBlur={() => setTimeout(() => setShowInitiativeDropdown(false), 100)}
          >
            {initiative
              ? initiativesByProgram[program].find(opt => opt.value === initiative)?.label
              : 'Select Initiative'}
            <span className="dropdown-arrow">▼</span>
          </div>
          {showInitiativeDropdown && (
            <div className="dropdown-menu">
              {initiativesByProgram[program].map(opt => (
                <div
                  key={opt.value}
                  className="dropdown-item"
                  onClick={() => handleInitiativeSelect(opt.value)}
                >
                  {opt.label}
                </div>
              ))}
              <div
                className="dropdown-item add-initiative"
                onClick={() => handleInitiativeSelect('add-initiative')}
              >
                Add Initiative
              </div>
            </div>
          )}
        </div>

        <label className="FormLabel">Password</label>
        <input
          className="FormInput"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="FormButton">Next</button>
      </form>

    <div id='form-bg'>
      <div className='form-container'>
        <h2>Submit Your Climate Contribution</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-col'>
            <label>
              Organization Name
              <select
                name='organization_name'
                value={formData.organization_name}
                onChange={handleChange}
                required
              >
                <option value=''>Select Organization</option>
                {organizations.map((org) => (
                  <option key={org} value={org}>
                    {org}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Initiative
              <input
                name='initiative_name'
                value={formData.initiative1_description}
                onChange={handleChange}
                placeholder='Event Name'
                required
              />
            </label>
          </div>

          <div className='form-col'>
            <label>
              Date
              <input
                type='date'
                name='event_date'
                value={formData.event_date}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Location
              <input
                name='event_location'
                value={formData.event_location}
                onChange={handleChange}
                placeholder='Location'
                required
              />
            </label>

            <label>
              Description
              <textarea
                name='event_description'
                value={formData.event_description}
                onChange={handleChange}
                placeholder='Description'
                required
              />
            </label>
          </div>

          <button type='submit' className='cae-submit'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default InitiativeForm;
