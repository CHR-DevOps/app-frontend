import { useEffect, useState } from 'react';
import DataForm from '../components/DataForm';

export default function Home() {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const response = await fetch('/api/data');
        const result = await response.json();
        setData(result);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>Data List</h1>
            <DataForm onDataAdded={fetchData} />
            <ul>
                {data.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}