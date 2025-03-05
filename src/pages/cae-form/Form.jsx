import React from 'react';

import EventsList from 'common/components/caeEvents/EventList';

import './Form.css';

function Form() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    alert('Event added!');
  };

  return (
    <div id='form-bg'>
      
    <div className='Form--container'>
      <p>Submit Your Own Climate Contributions</p>
      
      <form onSubmit={handleSubmit}>
        <div className='form-col'>
          <p>Organization name</p>
            <input name='organization_name' placeholder='Organization Name' required />

          <p>Entity name</p>
            <input name='entity_name' placeholder='Entity Name' required />

          <p>Initiative 1</p>
            <input name='initiative1_description' placeholder='Initiative 1 description' required />

          <p>Initiative 2</p>
            <input name='initiative2_description' placeholder='Initiative 2 description' required />

          <p>Initiative 3</p>
            <input name='initiativee_description' placeholder='Initiative 3 description' required />
        </div>

        <div className='form-col'>
          <p>Date</p>
          <input type='date' name='event_date' required />
          <input name='event_location' placeholder='Location' required />
          <textarea name='event_description' placeholder='Description' required />
        </div>
      </form>

      <button type='submit'>Submit</button>
      {/* <EventsList /> */}
    </div>
    </div>
  );
}

export default Form;
