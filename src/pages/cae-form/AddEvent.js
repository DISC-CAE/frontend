import React, { useState } from 'react';

import { addEvent } from '../api';

const AddEvent = () => {
  const [formData, setFormData] = useState({
    event_name: '',
    event_date: '',
    event_location: '',
    event_description: '',
    partner_organizations: '',
    tags: [],
    mode_of_action: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addEvent(formData);
    alert('Event added!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name='event_name'
        placeholder='Event Name'
        onChange={handleChange}
        required
      />
      <input type='date' name='event_date' onChange={handleChange} required />
      <input
        name='event_location'
        placeholder='Location'
        onChange={handleChange}
        required
      />
      <textarea
        name='event_description'
        placeholder='Description'
        onChange={handleChange}
        required
      />
      <button type='submit'>Add Event</button>
    </form>
  );
};

export default AddEvent;
