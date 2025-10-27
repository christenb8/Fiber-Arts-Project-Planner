import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from './ProjectList.jsx';
import './ProjectModal.css';

function EditProjectModal({ projectId, onClose, onSave }) {
  const { data, loading, error } = useQuery(GET_PROJECT, {
    variables: { id: projectId },
    skip: !projectId, // only run when projectId is set
  });

  const [form, setForm] = useState({
    name: '',
    description: '',
    completed: false,
  });

  useEffect(() => {
    if (data?.getProject) {
      setForm({
        name: data.getProject.name,
        description: data.getProject.description,
        completed: data.getProject.completed,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: projectId, ...form });
    onClose();
  };

  if (!projectId) return null;
  if (loading) return <div className="modal">Loading...</div>;
  if (error) return <div className="modal">Error loading project.</div>;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit Project</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Project name"
          />
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <label>
            <b>Completed? </b>
            <select
              name="completed"
              value={form.completed ? 'yes' : 'no'}
              onChange={(e) => setForm({ ...form, completed: e.target.value === 'yes' })}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
          <div className="modal-buttons" style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
            <button className="modal-button" type="submit">Save</button>
            <button className="modal-button" type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProjectModal;
