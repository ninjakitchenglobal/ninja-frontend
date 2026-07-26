// HOOKS & DEPS
import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

import useProfile from '../hooks/useProfile';
import useAuth from '../hooks/useAuth';
import { DEV_API } from '../lib/utils/api-url';
import { ToastContainer } from 'react-toastify';

// COMPONENTS
import CombinedHeader from './CombinedHeader';

export default function ProfileClient() {
  const { token, user } = useAppContext();
  const navigate = useNavigate();

  const [mounted, setMounted] = useState(false);

  const { getUser, isLoading, userDetails } = useProfile();
  const { logout } = useAuth();

  /* -------------------- MOUNT GUARD -------------------- */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* -------------------- AUTH GUARD -------------------- */
  useEffect(() => {
    if (mounted && !token) {
      navigate('/login');
    }
  }, [mounted, token]);

  /* -------------------- FETCH USER -------------------- */
  useEffect(() => {
    if (!mounted || !user) return;

    getUser();
  }, [mounted, user, DEV_API]);

  /* -------------------- HYDRATION BLOCK -------------------- */
  if (!mounted) return null;

  /* -------------------- LOADING -------------------- */
  if (isLoading) {
    return (
      <>
        <CombinedHeader />
        <section className="flex justify-center mt-70">
          <span className="loading loading-ring loading-xl w-25 block" />
        </section>
      </>
    );
  }

  /* -------------------- UI -------------------- */
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

      <section className="mt-30 flex flex-col gap-3 p-5 md:p-10 lg:p-15 xl:p-20">
        <h1 className="text-center text-2xl text-gray-700 font-semibold">
          Profile details
        </h1>

        <p className="text-xl text-gray-700 font-semibold">
          First name: {userDetails?.firstName}
        </p>
        <p className="text-xl text-gray-700 font-semibold">
          Last name: {userDetails?.lastName}
        </p>
        <p className="text-xl text-gray-700 font-semibold">
          Email: {userDetails?.email}
        </p>

        {userDetails?.isAdmin ? (
          <button
            onClick={() => {
              navigate('/admin');
            }}
            className="py-2 px-4 bg-black text-white rounded-lg text-lg font-semibold w-[60%] mx-auto mt-20 hover:scale-105 transition-all cursor-pointer"
          >
            Admin Panel
          </button>
        ) : (
          ''
        )}
        <button
          onClick={() => {
            navigate('/orders');
          }}
          className="py-2 px-4 bg-black text-white rounded-lg text-lg font-semibold w-[60%] mx-auto mt-20 hover:scale-105 transition-all cursor-pointer"
        >
          Orders
        </button>
        <button
          onClick={logout}
          className="py-2 px-4 bg-black text-white rounded-lg text-lg font-semibold w-[60%] mx-auto mt-5 hover:scale-105 transition-all cursor-pointer"
        >
          Logout
        </button>
      </section>
    </>
  );
}
