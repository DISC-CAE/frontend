import React, { useState } from 'react';

import EventsList from 'common/components/caeEvents/EventList';

import './Form.css';

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

export default Form;
