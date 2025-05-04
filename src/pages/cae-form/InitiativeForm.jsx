import React, { useEffect, useState } from 'react';

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
        [category]: [...form.metrics[category], { label: '', value: 0 }],
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
    <form className='initiative-form' onSubmit={handleSubmit}>
      <h3>{mode === 'create' ? 'Create Initiative' : 'Edit Initiative'}</h3>

      <input
        name='initiativeName'
        value={form.initiativeName}
        onChange={handleChange}
        placeholder='Initiative Name'
        required
        disabled={mode === 'edit'}
      />

      <textarea
        name='description'
        value={form.description}
        onChange={handleChange}
        placeholder='Description'
        required
      />

      <input
        name='imageUrl'
        value={form.imageUrl}
        onChange={handleChange}
        placeholder='Image URL'
      />

      <div>
        <label>
          <input
            type='checkbox'
            checked={form.modesOfAction.includes('Serve')}
            onChange={() => toggleMode('Serve')}
          />
          Serve
        </label>
        <label>
          <input
            type='checkbox'
            checked={form.modesOfAction.includes('Educate')}
            onChange={() => toggleMode('Educate')}
          />
          Educate
        </label>
        <label>
          <input
            type='checkbox'
            checked={form.modesOfAction.includes('Advocate')}
            onChange={() => toggleMode('Advocate')}
          />
          Advocate
        </label>
      </div>

      {/* Metric input per category */}
      {['People', 'Place', 'Policy'].map((category) => (
        <div key={category}>
          <h4>{category} Metrics</h4>
          {form.metrics[category].map((metric, index) => (
            <div key={index} style={{ display: 'flex', gap: '8px' }}>
              <input
                type='text'
                placeholder='Label'
                value={metric.label}
                onChange={(e) =>
                  handleMetricChange(category, index, 'label', e.target.value)
                }
              />
              <input
                type='number'
                placeholder='Value'
                value={metric.value}
                onChange={(e) =>
                  handleMetricChange(
                    category,
                    index,
                    'value',
                    parseInt(e.target.value) || 0
                  )
                }
              />
            </div>
          ))}
          <button type='button' onClick={() => addMetric(category)}>
            + Add {category} Metric
          </button>
        </div>
      ))}

      <button type='submit'>{mode === 'create' ? 'Create' : 'Update'}</button>
    </form>
  );
};

export default InitiativeForm;
