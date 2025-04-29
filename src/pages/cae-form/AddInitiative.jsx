import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Form.css';

//
const modeOfActionOptions = [
  { value: 'serve', label: 'Serve' },
  { value: 'educate', label: 'Educate' },
  { value: 'advocate', label: 'Advocate' },
];

function AddInitiative() {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const programName = searchParams.get('program') || 'Program';

  const [initiativeName, setInitiativeName] = useState('');
  const [description, setDescription] = useState('');
  const [modeOfAction, setModeOfAction] = useState('');
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [metrics, setMetrics] = useState({
    people: [{ value: '', label: '' }],
    place: [{ value: '', label: '' }],
    policy: [{ value: '', label: '' }]
  });

  const handleMetricChange = (category, index, field, value) => {
    const updatedMetrics = { ...metrics };
    updatedMetrics[category][index][field] = value;
    setMetrics(updatedMetrics);
  };

  const handleRemoveMetric = (category, index) => {
    const updatedMetrics = { ...metrics };
    updatedMetrics[category] = updatedMetrics[category].filter((_, i) => i !== index);
    setMetrics(updatedMetrics);
  };

  const handleAddMetric = (category) => {
    setMetrics(prev => ({
      ...prev,
      [category]: [...prev[category], { value: '', label: '' }]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/create-initiative');
  };

  return (
    <div className="Form--container">
      <form className="edit-form" onSubmit={handleSubmit}>
        <h2>
          Add New Initiative: <span style={{ textDecoration: 'underline' }}>{programName}</span>
        </h2>
        <div className="form-layout">
          <div className="left-column">
            <div className="form-group">
              <label>Short Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Enter short description"
                className="FormInput"
              />
            </div>
            <div className="form-group">
              <label>Mode of Action</label>
              <div className="custom-dropdown">
                <div
                  className="dropdown-selected"
                  onClick={() => setShowModeDropdown(!showModeDropdown)}
                  tabIndex={0}
                  onBlur={() => setTimeout(() => setShowModeDropdown(false), 100)}
                >
                  {modeOfAction
                    ? modeOfActionOptions.find(opt => opt.value === modeOfAction)?.label
                    : 'Choose mode of action'}
                  <span className="dropdown-arrow">▼</span>
                </div>
                {showModeDropdown && (
                  <div className="dropdown-menu">
                    {modeOfActionOptions.map(opt => (
                      <div
                        key={opt.value}
                        className="dropdown-item"
                        onClick={() => {
                          setModeOfAction(opt.value);
                          setShowModeDropdown(false);
                        }}
                      >
                        {opt.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="form-group">
              <label>If applicable, please upload any images related to your action</label>
              <div className="upload-btn">Upload .jpg</div>
            </div>
          </div>
          <div className="right-column">
            <div className="metrics-section">
              <h3>Metrics</h3>
              {/* people metrics */}
              <div className="metric-group">
                <div className="metric-header">
                  <span>People</span>
                </div>
                {metrics.people.map((metric, index) => (
                  <div key={index} className="metric-row">
                    <input
                      type="text"
                      className="metric-value"
                      value={metric.value}
                      onChange={e => handleMetricChange('people', index, 'value', e.target.value)}
                      placeholder="Enter value"
                    />
                    <input
                      type="text"
                      className="metric-label"
                      value={metric.label}
                      onChange={e => handleMetricChange('people', index, 'label', e.target.value)}
                      placeholder="Enter label"
                    />
                    <span
                      className="remove-btn"
                      onClick={() => handleRemoveMetric('people', index)}
                    >⊖</span>
                  </div>
                ))}
                <button
                  type="button"
                  className="add-metric-btn"
                  onClick={() => handleAddMetric('people')}
                >＋</button>
              </div>
              {/* place metrics */}
              <div className="metric-group">
                <div className="metric-header">
                  <span>Place</span>
                </div>
                {metrics.place.map((metric, index) => (
                  <div key={index} className="metric-row">
                    <input
                      type="text"
                      className="metric-value"
                      value={metric.value}
                      onChange={e => handleMetricChange('place', index, 'value', e.target.value)}
                      placeholder="Enter value"
                    />
                    <input
                      type="text"
                      className="metric-label"
                      value={metric.label}
                      onChange={e => handleMetricChange('place', index, 'label', e.target.value)}
                      placeholder="Enter label"
                    />
                    <span
                      className="remove-btn"
                      onClick={() => handleRemoveMetric('place', index)}
                    >⊖</span>
                  </div>
                ))}
                <button
                  type="button"
                  className="add-metric-btn"
                  onClick={() => handleAddMetric('place')}
                >＋</button>
              </div>
              {/* policy metrics */}
              <div className="metric-group">
                <div className="metric-header">
                  <span>Policy</span>
                </div>
                {metrics.policy.map((metric, index) => (
                  <div key={index} className="metric-row">
                    <input
                      type="text"
                      className="metric-value"
                      value={metric.value}
                      onChange={e => handleMetricChange('policy', index, 'value', e.target.value)}
                      placeholder="Enter value"
                    />
                    <input
                      type="text"
                      className="metric-label"
                      value={metric.label}
                      onChange={e => handleMetricChange('policy', index, 'label', e.target.value)}
                      placeholder="Enter label"
                    />
                    <span
                      className="remove-btn"
                      onClick={() => handleRemoveMetric('policy', index)}
                    >⊖</span>
                  </div>
                ))}
                <button
                  type="button"
                  className="add-metric-btn"
                  onClick={() => handleAddMetric('policy')}
                >＋</button>
              </div>
            </div>
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddInitiative;
