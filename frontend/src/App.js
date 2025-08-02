
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [phone, setPhone] = useState('');
  const [instructions, setInstructions] = useState('');

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/users');
    setUsers(res.data);
  };

  const createUser = async () => {
    await axios.post('http://localhost:5000/users', { phone, instructions });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Multi-User WhatsApp Bot Admin</h1>
      <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
      <input placeholder="Instructions" value={instructions} onChange={e => setInstructions(e.target.value)} />
      <button onClick={createUser}>Add User</button>
      <ul>
        {users.map(u => (
          <li key={u._id}>{u.phone} - {u.instructions}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
