import React, { useState } from 'react';

export default function MessageForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    subject: '',
    message: '',
    sendmessage: false  // Boolean for button state
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setStatus('Error: ' + errorData.error);
        return;
      }

      const result = await response.json();
      setStatus('Message sent! ID: ' + result._id);

      setFormData({
        username: '',
        email: '',
        subject: '',
        message: '',
        sendmessage: false
      });
    } catch (err) {
      setStatus('Network error: ' + err.message);
    }
  };

  return (
    <div>
      <h2>Send a Message</h2>
      <form onSubmit={handleSubmit}>
        {/* other fields unchanged */}
        <label>
          Username:<br />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required />
        </label>
        <br /><br />

        <label>
          Email:<br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required />
        </label>
        <br /><br />

        <label>
          Subject:<br />
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required />
        </label>
        <br /><br />

        <label>
          Message:<br />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required />
        </label>
        <br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
