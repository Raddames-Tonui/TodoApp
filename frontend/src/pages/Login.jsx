import React, { useContext, useState } from 'react';
import { BiSolidBadgeCheck } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function Login() {
  const {login_user} = useContext(UserContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e){
    e.preventDefault();
    login_user(email, password);
    setEmail("")
    setPassword("")
  }
  
  return (
    <div className="h-[90vh] flex items-center justify-center py-12 px-6 lg:px-8">
      <div className='bg-white mx-auto flex flex-col items-center justify-center px-6 max-w-md w-full py-6 rounded-md'>
        
      <BiSolidBadgeCheck className='text-4xl  text-[#35ca22] mx-auto h-12 w-auto' />

        <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>

        <form className="space-y-6 mt-8 w-full" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email || ""}
                onChange={e => setEmail(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-green-500 hover:text-green-70">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password || ""}
                onChange={e => setPassword(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="relative w-full h-10 rounded-md text-md font-bold border-none overflow-hidden z-10 bg-gradient-to-r from-[#49f544] to-[#f9f047] hover:bg-gradient-to-r hover:from-[#0fd80f] hover:to-[#35ca22] ring-1 ring-gray-600 transition-all duration-500"
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="text-center mt-6 text-gray-600 text-md">
          Not a member?{" "}
          <Link
            to="/users/signup"
            className="text-green-500 hover:text-green-700 transition duration-300"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
