import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await axios.get('http://localhost:5000/api/inventory');
      setItems(res.data);
    };
    fetchItems();
  }, []);

  return (
    <div>
      <h2>Inventory Dashboard</h2>
      <ul>
        {items.map(item => (
          <li key={item._id}>{item.name} - {item.quantity}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;