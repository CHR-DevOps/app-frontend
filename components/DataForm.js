import { useState } from 'react';

export default function DataForm({ onDataAdded }) {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:5000/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }),
        });
        setName('');
        onDataAdded(); // Refresh the data list
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter a name"
            />
            <button type="submit">Add Data</button>
        </form>
    );
}