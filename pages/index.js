import { useEffect, useState } from 'react';
import DataForm from '../components/DataForm';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export default function Home() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      setError('');
      const response = await fetch(`${API_BASE_URL}/api/data`);

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Failed to fetch data');
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Data List</h1>
      <DataForm onSuccess={fetchData} />
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data.length === 0 ? (
        <p>No data found.</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}