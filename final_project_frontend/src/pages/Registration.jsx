import React, { useState } from 'react';

const Registration = () => {
  // Define state variables to store form input values
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const url = 'http://localhost:8000/register/'

  // Function to handle form submission
  const handleRegistration = async (e) => {
    e.preventDefault();

    // Create a user registration request to your backend API
    const registrationData = { username, email, password };

    // You can use the fetch API or an HTTP library like Axios to send the registration request
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      if (response.status === 200) {
        // Registration was successful
        // You can redirect the user to a login page or any other page
      } else {
        // Handle registration errors (e.g., display error messages to the user)
      }
    } catch (error) {
      // Handle network or other errors
    }
  };

  return (
    <div>
      <h2>User Registration</h2>
      <form onSubmit={handleRegistration}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
