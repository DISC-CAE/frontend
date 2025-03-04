import React from 'react';

import './Form.css';

function Form() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    alert('Event added!');
  };

  return (
    <div className='Form--container'>
      <form onSubmit={handleSubmit}>
        <input name='event_name' placeholder='Event Name' required />
        <input type='date' name='event_date' required />
        <input name='event_location' placeholder='Location' required />
        <textarea name='event_description' placeholder='Description' required />
        <button type='submit'>Add Event</button>
      </form>
    </div>
  );
}

export default Form;
