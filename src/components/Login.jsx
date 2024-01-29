import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { addUser } from '../userSlice';

const Login = () => {

  const dispatch = useDispatch() ;
  const users = useSelector((state)=> state.user.users)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  
  const navigate = useNavigate() ;

  const handleSubmit = (event) => {
      event.preventDefault();
      
      // Check if the user with the entered email already exists
      const existingUser = users.find((user) => user.email === email);
      
    

    if (existingUser) {
      console.log('User already exists:', existingUser);
    } else {
      // Add a new user with the entered email and password
      const newUserData = {
        email: email,
        password: password,
        userDetails: {},
      };

      dispatch(addUser(newUserData))

      setEmail("");
      setPassword("") ;

      navigate('/userDetails')
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
