import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import { BiSolidBadgeCheck } from "react-icons/bi";

function SignUpForm() {
  const { register_user } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (password !== repeatPassword) {
      toast.error("Passwords do not match");
    } else {
      register_user(username, email, avatar, password);
      setUsername("");
      setEmail("");
      setPassword("");
      setRepeatPassword("");
      setAvatar("");
    }
  }
  // console.log(username)

  return (
    <section className="  flex items-center justify-center py-12 px-6 lg:px-8">
      <div className="bg-white mx-auto flex flex-col items-center justify-center px-6 max-w-md w-full py-6 rounded-md shadow-md">
        <BiSolidBadgeCheck className='text-4xl  text-[#35ca22] mx-auto h-12 w-auto' />

        <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create your account
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-2 mt-2 w-full">
          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
              Username
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                type="email"
                id="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="repeatPassword" className="block text-sm font-medium leading-6 text-gray-900">
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                id="repeatPassword"
                placeholder="Confirm Password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="avatar" className="block text-sm font-medium leading-6 text-gray-900">
              Add Profile Picture
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="avatar"
                placeholder="Enter URL"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="relative w-full h-10 rounded-md text-md font-bold border-none overflow-hidden z-10 bg-gradient-to-r from-[#49f544] to-[#f9f047] hover:bg-gradient-to-r hover:from-[#0fd80f] hover:to-[#35ca22] ring-1 ring-gray-600 transition-all duration-500"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="text-center mt-6 text-gray-600 text-md">
          Already have an account?{" "}
          <Link
            to="/users/signin"
            className="text-green-500 hover:text-green-700 transition duration-300"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default SignUpForm;
