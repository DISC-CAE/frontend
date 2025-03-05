import React, { useEffect, useState } from 'react';

const App = () => {
  const [formData, setFormData] = useState({
    event_id: '',
    event_name: '',
    event_date: '',
    event_location: '',
    event_description: '',
    partner_organizations: '',
    tags: '',
    mode_of_action: '',
  });

  const [events, setEvents] = useState([]); // Stores fetched events

  // Fetch events from backend
  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5050/fetch-events');
      const data = await response.json(); // Ensure JSON parsing
      if (Array.isArray(data)) {
        setEvents(data); // Set state only if it's an array
      } else {
        console.error('Fetched data is not an array:', data);
        setEvents([]); // Set to empty array if response is not an array
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents([]); // Fallback to empty array on error
    }
  };

  useEffect(() => {
    fetchEvents(); // Fetch events on component mount
  }, []);

  return (
    <div>
      <h2>List of Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.event_id}>
            <strong>{event.event_name}</strong> - {event.event_date} at{' '}
            {event.event_location}
            <p>{event.event_description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
