import { useState } from 'react';

export default function DataForm({ onSuccess }) {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || 'Failed to add data');
    }

    setName('');

    if (onSuccess) {
      await onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Add Data</button>
    </form>
  );
}