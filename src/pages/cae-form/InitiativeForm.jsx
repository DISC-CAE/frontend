import React, { useEffect, useState } from 'react';

import './InitiativeForm.css';

const InitiativeForm = ({ mode, programName, initialData }) => {
  const [form, setForm] = useState({
    initiativeName: '',
    description: '',
    imageUrl: '',
    modesOfAction: [],
    metrics: {
      People: [],
      Place: [],
      Policy: [],
    },
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        initiativeName: initialData.initiativeName || '',
        description: initialData.description || '',
        imageUrl: initialData.imageUrl || '',
        modesOfAction: initialData.modesOfAction || [],
        metrics: initialData.metrics || { People: [], Place: [], Policy: [] },
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleMode = (mode) => {
    setForm((prev) => {
      const updated = prev.modesOfAction.includes(mode)
        ? prev.modesOfAction.filter((m) => m !== mode)
        : [...prev.modesOfAction, mode];
      return { ...prev, modesOfAction: updated };
    });
  };

  const handleMetricChange = (category, index, field, value) => {
    const updated = [...form.metrics[category]];
    updated[index] = { ...updated[index], [field]: value };
    setForm({ ...form, metrics: { ...form.metrics, [category]: updated } });
  };

  const addMetric = (category) => {
    setForm({
      ...form,
      metrics: {
        ...form.metrics,
        [category]: [...form.metrics[category], { label: '', value: '' }],
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint =
      mode === 'create'
        ? 'http://localhost:5050/cae/add-initiative'
        : 'http://localhost:5050/cae/edit-initiative';

    const body = {
      programName,
      ...form,
    };

    try {
      const res = await fetch(endpoint, {
        method: 'POST', // or PATCH if you prefer
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      alert(
        `Initiative ${mode === 'create' ? 'created' : 'updated'} successfully.`
      );
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <form
      className='initiative-form'
      onSubmit={handleSubmit}
      autoComplete='off'
    >
      <h2 className='initiative-form-title'>
        {mode === 'create' ? 'Add New Initiative' : 'Edit Initiative'}
        {form.initiativeName ? `: ${form.initiativeName}` : ''}
      </h2>
      <div className='initiative-form-grid'>
        <div className='initiative-form-left'>
          <div className='initiative-form-group'>
            <label className='initiative-form-label' htmlFor='initiativeName'>
              Name
            </label>
            <input
              id='initiativeName'
              name='initiativeName'
              className='initiative-form-input'
              value={form.initiativeName}
              onChange={handleChange}
              placeholder='Enter name'
              required
              disabled={mode === 'edit'}
            />
          </div>
          <div className='initiative-form-group'>
            <label className='initiative-form-label' htmlFor='description'>
              Short Description
            </label>
            <textarea
              id='description'
              name='description'
              className='initiative-form-textarea'
              value={form.description}
              onChange={handleChange}
              placeholder='Enter short description'
              required
            />
          </div>
          <div className='initiative-form-group'>
            <label className='initiative-form-label'>Mode of Action</label>
            <div className='initiative-form-checkbox-group'>
              {['Serve', 'Educate', 'Advocate'].map((modeOption) => (
                <label
                  key={modeOption}
                  className='initiative-form-checkbox-label'
                >
                  <input
                    type='checkbox'
                    checked={form.modesOfAction.includes(modeOption)}
                    onChange={() => toggleMode(modeOption)}
                  />
                  {modeOption}
                </label>
              ))}
            </div>
          </div>
          <div className='initiative-form-group'>
            <label className='initiative-form-label'>
              If applicable, please upload any images related to your action
            </label>
            <input
              type='text'
              name='imageUrl'
              className='initiative-form-input'
              value={form.imageUrl}
              onChange={handleChange}
              placeholder='Upload .jpg'
            />
          </div>
        </div>
        <div className='initiative-form-right'>
          <div className='initiative-form-metrics-header'>
            <span>Metrics</span>
            <hr className='initiative-form-metrics-divider' />
          </div>
          {['People', 'Place', 'Policy'].map((category) => (
            <div key={category} className='initiative-form-metric-group'>
              <div className='initiative-form-metric-header'>
                {category}
                <button
                  type='button'
                  className='initiative-form-metric-add'
                  onClick={() => addMetric(category)}
                  aria-label={`Add ${category} metric`}
                >
                  +
                </button>
              </div>
              <div className='initiative-form-metric-rows'>
                {form.metrics[category].map((metric, index) => (
                  <div key={index} className='initiative-form-metric-row'>
                    <input
                      type='text'
                      className='initiative-form-input metric-label-input'
                      placeholder='Enter label'
                      value={metric.label ?? ''}
                      onChange={(e) =>
                        handleMetricChange(
                          category,
                          index,
                          'label',
                          e.target.value
                        )
                      }
                    />
                    <input
                      type='number'
                      className='initiative-form-input metric-value-input'
                      placeholder='Enter value'
                      value={metric.value ?? ''}
                      onChange={(e) =>
                        handleMetricChange(
                          category,
                          index,
                          'value',
                          e.target.value
                        )
                      }
                    />
                    <button
                      type='button'
                      className='initiative-form-metric-remove'
                      onClick={() => {
                        const updated = [...form.metrics[category]];
                        updated.splice(index, 1);
                        setForm({
                          ...form,
                          metrics: { ...form.metrics, [category]: updated },
                        });
                      }}
                      aria-label={`Remove ${category} metric`}
                    >
                      −
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='initiative-form-submit-row'>
        <button type='submit' className='initiative-form-submit'>
          Submit
        </button>
      </div>
    </form>
  );
};

export default InitiativeForm;
