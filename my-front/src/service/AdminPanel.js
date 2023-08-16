
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import userData from './users.json';



export function AdminPanel() {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const navigate = useNavigate();



    useEffect(() => {
        // Fetch data from your backend when the component mounts
        fetch('/api/users')
            .then(response => response.json())
            .then(data => setUsers(data));
    }, []);  // This effect runs once when the component mounts

    // function handleEdit(user) {
    const handleEdit = (userId) => {
        navigate(`/admin/user/${userId}/edit`);
        console.log("Editing user:", userId);
    }


    function handleDelete(userId) {
        fetch(`/api/users/${userId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                if (data.msg === "User Deleted.") {
                    const updatedUsers = users.filter(user => user.id !== userId);
                    setUsers(updatedUsers);
                }
            });
    }

    const toggleUserSelection = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(prevUsers => prevUsers.filter(id => id !== userId));
        } else {
            setSelectedUsers(prevUsers => [...prevUsers, userId]);
        }
    };

    const toggleAllUsersSelection = () => {
        if (selectedUsers.length === users.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(users.map(user => user.id));
        }
    };

    return (
        <div>
            <h1>AdminPanel</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th><input type="checkbox" checked={selectedUsers.length === users.length} onChange={toggleAllUsersSelection} /></th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Last Login</th>
                        <th>Registration Time</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td><input type="checkbox" checked={selectedUsers.includes(user.id)} onChange={() => toggleUserSelection(user.id)} /></td>

                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.last_login_time}</td>
                            <td>{user.registration_time}</td>
                            <td>{user.status}</td>
                            <td><button onClick={() => handleEdit(user.id)}>Edit</button></td>
                            <td><button onClick={() => handleDelete(user.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
