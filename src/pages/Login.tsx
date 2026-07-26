//IMPORTING HOOKS
import useAuth from '../hooks/useAuth';
import { useState } from 'react';

//IMPORTING HELPER COMPONENTS
import CombinedHeader from '../components/CombinedHeader';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const LoginPage = () => {
  const { handleChange, login, isLoading, userDetails } = useAuth();
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
            Enter your details to log into your account{' '}
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
            type={isPasswordVisible ? 'text' : 'password'}
            id="password"
            name="password"
            value={userDetails.password}
            placeholder="Password"
            onChange={handleChange}
            className="py-2 px-4 rounded-lg border-2  w-80"
          />

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

            <p>Show your password</p>
          </span>

          <button
            onClick={login}
            className="text-white bg-black rounded-lg py-3 px-5  w-80 text-center font-semibold cursor-pointer"
          >
            {isLoading ? (
              <span className=" loading loading-ring loading-xl font-bold text-white block mx-auto"></span>
            ) : (
              'Login'
            )}
          </button>
        </div>
      </section>

      <p className="text-center text-gray-700 font-semibold">
        {' '}
        Don't have an account?{' '}
        <Link to={'/sign-up'} className="underline">
          {' '}
          sign up{' '}
        </Link>{' '}
      </p>
    </>
  );
};

export default LoginPage;
