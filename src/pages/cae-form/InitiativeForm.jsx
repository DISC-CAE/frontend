import React, { useEffect, useState } from 'react';

import './InitiativeForm.css';

const InitiativeForm = ({ mode, programName, initialData, authToken }) => {
  const [form, setForm] = useState({
    initiativeName: '',
    description: '',
    modesOfAction: [],
    metrics: {
      People: [],
      Place: [],
      Policy: [],
    },
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [modalState, setModalState] = useState({
    isOpen: false,
    category: '',
    labelIndex: -1,
    values: [],
  });

  useEffect(() => {
    // Only set initial data if we're in edit mode and have data
    if (mode === 'edit' && initialData) {
      setForm({
        initiativeName: initialData.initiativeName || '',
        description: initialData.description || '',
        modesOfAction: initialData.modesOfAction || [],
        metrics: initialData.metrics || { People: [], Place: [], Policy: [] },
      });
      setPreviewUrl(initialData.imageUrl || '');
    } else if (mode === 'create') {
      // Reset form for create mode
      setForm({
        initiativeName: '',
        description: '',
        modesOfAction: [],
        metrics: {
          People: [],
          Place: [],
          Policy: [],
        },
      });
      setPreviewUrl('');
      setSelectedImage(null);
    }
  }, [mode, initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleMode = (mode) => {
    setForm((prev) => {
      const updated = prev.modesOfAction.includes(mode)
        ? prev.modesOfAction.filter((m) => m !== mode)
        : [...prev.modesOfAction, mode];
      return { ...prev, modesOfAction: updated };
    });
  };

  const addMetric = (category) => {
    setForm({
      ...form,
      metrics: {
        ...form.metrics,
        [category]: [
          ...form.metrics[category],
          { label: '', values: [], showInScoreboard: true },
        ],
      },
    });
  };

  const removeMetric = (category, index) => {
    const updated = [...form.metrics[category]];
    updated.splice(index, 1);
    setForm({
      ...form,
      metrics: { ...form.metrics, [category]: updated },
    });
  };

  const handleLabelChange = (category, index, value) => {
    const updated = [...form.metrics[category]];
    updated[index] = { ...updated[index], label: value };
    setForm({ ...form, metrics: { ...form.metrics, [category]: updated } });
  };

  const handleShowInScoreboardChange = (category, index, value) => {
    const updated = [...form.metrics[category]];
    updated[index] = { ...updated[index], showInScoreboard: value };
    setForm({ ...form, metrics: { ...form.metrics, [category]: updated } });
  };

  const openValuesModal = (category, labelIndex) => {
    const currentValues = form.metrics[category][labelIndex]?.values || [];
    setModalState({
      isOpen: true,
      category,
      labelIndex,
      values: [...currentValues],
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      category: '',
      labelIndex: -1,
      values: [],
    });
  };

  const saveModalValues = () => {
    const { category, labelIndex, values } = modalState;
    const updated = [...form.metrics[category]];
    updated[labelIndex] = { ...updated[labelIndex], values: [...values] };
    setForm({ ...form, metrics: { ...form.metrics, [category]: updated } });
    closeModal();
  };

  const addValueToModal = () => {
    setModalState((prev) => ({
      ...prev,
      values: [
        ...prev.values,
        { value: '', date: new Date().toISOString().split('T')[0], notes: '' },
      ],
    }));
  };

  const removeValueFromModal = (index) => {
    setModalState((prev) => ({
      ...prev,
      values: prev.values.filter((_, i) => i !== index),
    }));
  };

  const updateModalValue = (index, field, value) => {
    setModalState((prev) => ({
      ...prev,
      values: prev.values.map((v, i) =>
        i === index ? { ...v, [field]: value } : v
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !form.initiativeName ||
      !form.description ||
      form.modesOfAction.length === 0
    ) {
      alert(
        'Please fill in all required fields: Name, Description, and at least one Mode of Action'
      );
      return;
    }

    // Validate metrics
    const hasEmptyMetrics = Object.values(form.metrics).some((category) =>
      category.some(
        (metric) =>
          !metric.label ||
          !metric.values.length ||
          metric.values.some((v) => !v.value)
      )
    );
    if (hasEmptyMetrics) {
      alert('Please fill in all metric fields (label and at least one value)');
      return;
    }

    const endpoint =
      mode === 'create'
        ? `${process.env.REACT_APP_BACKEND_URL}/auth/add-initiative`
        : `${process.env.REACT_APP_BACKEND_URL}/auth/edit-initiative`;

    const formData = new FormData();
    formData.append('programName', programName);
    formData.append(
      'initiativeName',
      initialData?.initiativeName || form.initiativeName
    );
    formData.append('description', form.description);
    formData.append('modesOfAction', JSON.stringify(form.modesOfAction));
    formData.append('metrics', JSON.stringify(form.metrics));

    // Only append image if it's a new upload
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
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
              Upload Initiative Image
            </label>
            <div className='initiative-form-image-upload'>
              <input
                type='file'
                accept='image/jpeg,image/png,image/gif'
                onChange={handleImageChange}
                className='initiative-form-file-input'
                required={mode === 'create'}
              />
              {previewUrl && (
                <div className='initiative-form-image-preview'>
                  <img src={previewUrl} alt='Preview' />
                </div>
              )}
            </div>
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
                    <label className='initiative-form-scoreboard-checkbox'>
                      <input
                        type='checkbox'
                        checked={metric.showInScoreboard ?? true}
                        onChange={(e) =>
                          handleShowInScoreboardChange(
                            category,
                            index,
                            e.target.checked
                          )
                        }
                      />
                      Show
                    </label>
                    <input
                      type='text'
                      className='initiative-form-input metric-label-input'
                      placeholder='Enter label'
                      value={metric.label ?? ''}
                      onChange={(e) =>
                        handleLabelChange(category, index, e.target.value)
                      }
                    />
                    <div className='metric-summary'>
                      Total:{' '}
                      {metric.values?.reduce(
                        (sum, entry) => sum + (parseInt(entry.value) || 0),
                        0
                      ) || 0}
                      ({metric.values?.length || 0} entries)
                    </div>
                    <button
                      type='button'
                      className='initiative-form-metric-values'
                      onClick={() => openValuesModal(category, index)}
                      aria-label={`Open values for ${category} metric`}
                    >
                      Details
                    </button>
                    <button
                      type='button'
                      className='initiative-form-metric-remove'
                      onClick={() => removeMetric(category, index)}
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
      {modalState.isOpen && (
        <div className='initiative-form-values-modal'>
          <div className='initiative-form-values-modal-content'>
            <h3>Values for {modalState.category} metric</h3>
            <div className='initiative-form-values-table-container'>
              <table className='initiative-form-values-table'>
                <thead>
                  <tr>
                    <th>Value</th>
                    <th>Date</th>
                    <th>Notes</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {modalState.values.map((valueEntry, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type='number'
                          className='initiative-form-input metric-value-input'
                          placeholder='Enter value'
                          value={valueEntry.value ?? ''}
                          onChange={(e) =>
                            updateModalValue(index, 'value', e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type='date'
                          className='initiative-form-input metric-date-input'
                          value={valueEntry.date ?? ''}
                          onChange={(e) =>
                            updateModalValue(index, 'date', e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <textarea
                          className='initiative-form-textarea metric-notes-input'
                          placeholder='Notes (optional)'
                          value={valueEntry.notes ?? ''}
                          onChange={(e) =>
                            updateModalValue(index, 'notes', e.target.value)
                          }
                          rows={2}
                        />
                      </td>
                      <td>
                        <button
                          type='button'
                          className='initiative-form-metric-remove'
                          onClick={() => removeValueFromModal(index)}
                          aria-label='Remove this value'
                        >
                          −
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                type='button'
                className='initiative-form-metric-add'
                onClick={addValueToModal}
                aria-label='Add new value'
              >
                + Add Value
              </button>
            </div>
            <div className='initiative-form-values-actions'>
              <button
                type='button'
                className='initiative-form-metric-save'
                onClick={saveModalValues}
                aria-label='Save values'
              >
                Save
              </button>
              <button
                type='button'
                className='initiative-form-metric-cancel'
                onClick={closeModal}
                aria-label='Cancel and close modal'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default InitiativeForm;
