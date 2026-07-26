//IMPORTING HELPER COMPONENTS
import CombinedHeader from '../components/CombinedHeader';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

//IMPORTING HOOKS
import useAuth from '../hooks/useAuth';
import { useState } from 'react';

const SignUpPage = () => {
  const { userDetails, handleChange, isLoading, signup } = useAuth();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
      <CombinedHeader />
      <section className="p-5 md:p-10 lg:p-15 xl:p-20 flex flex-col gap-5">
        <div>
          <h1 className="text-center text-2xl text-gray-700 font-semibold mt-30">
            {' '}
            Enter your details to create a new account{' '}
          </h1>
        </div>

        <div className="flex flex-col items-center gap-3">
          <input
            type="text"
            name="email"
            value={userDetails.email}
            placeholder="Enter your Email"
            onChange={handleChange}
            className="py-2 px-4 rounded-lg border-2  w-80"
          />
          <input
            type="text"
            name="firstName"
            value={userDetails.firstName}
            placeholder="First name"
            onChange={handleChange}
            className="py-2 px-4 rounded-lg border-2  w-80"
          />
          <input
            type="text"
            name="lastName"
            value={userDetails.lastName}
            placeholder="Last name"
            onChange={handleChange}
            className="py-2 px-4 rounded-lg border-2  w-80"
          />
          <label
            htmlFor="password"
            className="relative flex justify-end items-center"
          >
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              id="password"
              name="password"
              value={userDetails.password}
              placeholder="Password"
              onChange={handleChange}
              className="py-2 px-4 rounded-lg border-2  w-80"
            />
          </label>
          <label
            htmlFor="confirmPassword"
            className="relative flex justify-end items-center"
          >
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={userDetails.confirmPassword}
              placeholder="Confirm your password"
              onChange={handleChange}
              className="py-2 px-4 rounded-lg border-2  w-80"
            />
          </label>
          <span className="flex items-center gap-2  w-80">
            <input
              type="checkbox"
              id="checkbox"
              onChange={(e: any) => {
                if (e.target.checked) {
                  setIsPasswordVisible(true);
                } else {
                  setIsPasswordVisible(false);
                }
              }}
            />

            <p>Show your passwords</p>
          </span>

          <button
            onClick={signup}
            className="text-white bg-black rounded-lg py-3 px-5  w-80 text-center font-semibold cursor-pointer"
          >
            {isLoading ? (
              <span className="loading loading-ring loading-xl font-bold text-white block mx-auto"></span>
            ) : (
              ' Sign up'
            )}
          </button>
        </div>
      </section>

      <p className="text-center text-gray-700 font-semibold">
        {' '}
        Already have an account?{' '}
        <Link to={'/login'} className="underline">
          {' '}
          login{' '}
        </Link>{' '}
      </p>
    </>
  );
};

export default SignUpPage;
