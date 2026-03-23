import { useEffect, useState } from 'react';
import DataForm from '../components/DataForm';

export default function Home() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('/api/data');

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `Request failed with status ${response.status}`);
      }

      const result = await response.json();
      setData(Array.isArray(result) ? result : []);
    } catch (err) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main style={{ padding: '24px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Data List</h1>

      <DataForm onSuccess={fetchData} />

      {loading && <p>Loading...</p>}

      {error && (
        <p style={{ color: 'red' }}>
          Error: {error}
        </p>
      )}

      {!loading && !error && data.length === 0 && (
        <p>No data found.</p>
      )}

      {!loading && !error && data.length > 0 && (
        <ul>
          {data.map((item) => (
            <li key={item.id ?? item.name}>{item.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
}