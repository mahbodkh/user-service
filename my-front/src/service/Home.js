import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom';



export function Home() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerName, setRegisterName] = useState('');

    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/admin');
    }


    const handleLogin = async () => {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: username, password })
            });

            const data = await response.json();

            if (data.success) {
                // Redirect to Admin page if login is successful
                handleNavigation();
            } else {
                alert(data.message || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    const handleRegister = async () => {
        if (!registerPassword) {
            alert("Passwords is empty");
            return;
        }
        
        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: registerUsername, password: registerPassword, name: registerName })
            });

            const data = await response.json();

            if (data.success) {
                alert("Registration successful");
            } else {
                alert(data.message || "Registration failed");
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("An error occurred during registration. Please try again.");
        }
    };

    return (
        <div>
            {/* Registration Section */}
            <div>
                <h2>Register</h2>
                <p>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={registerName}
                        onChange={e => setRegisterName(e.target.value)}
                        placeholder="Enter your Name for registration"
                    />
                </p>
                <p>
                    <label>Email:</label>
                    <input
                        type="text"
                        value={registerUsername}
                        onChange={e => setRegisterUsername(e.target.value)}
                        placeholder="Enter your email for registration"
                    />
                </p>
                <p>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={registerPassword}
                        onChange={e => setRegisterPassword(e.target.value)}
                        placeholder="Enter a password for registration"
                    />
                </p>
                <button onClick={handleRegister}>Register</button>
            </div>
            
            {/* Login Section */}
            <div>
                <h2>Login</h2>
                <p>
                    <label>Email:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Enter your email to login"
                    />
                </p>
                <p>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter your password to login"
                    />
                </p>
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}
