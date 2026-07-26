import { useState } from 'react';
import { DEV_API } from '../lib/utils/api-url';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
type UserDetails = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  confirmPassword?: string;
};

const useAuth = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState<UserDetails>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setUserDetails((prevDetails) => {
      return {
        ...prevDetails,
        [name]: value,
      };
    });
  };

  /* SIGN IN FUNCTIONALITY */
  const login = async () => {
    try {
      const { email, password } = userDetails;
      setIsLoading(true);

      const response = await axios.post(`${DEV_API}/auth/user-login`, {
        email,
        password,
      });

      localStorage.setItem('ninja-token', response.data.data.token);
      localStorage.setItem('ninja-user', response.data.data.userId);

      setIsLoading(false);
      navigate('/');
      window.location.reload();
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong with your request');
      }
      setIsLoading(false);
    }
  };

  /* SIGNUP FUNCTIONALITY */
  const signup = async () => {
    const { email, firstName, lastName, password, confirmPassword } =
      userDetails;
    try {
      setIsLoading(true);

      if (password !== confirmPassword) {
        toast.error('The passwords provideded do not match');
        return;
      }

      const response = await axios.post(`${DEV_API}/auth/user-register`, {
        email,
        firstName,
        lastName,
        password,
      });

      localStorage.setItem('ninja-token', response.data.data.token);
      localStorage.setItem('ninja-user', response.data.data.userId);
      setIsLoading(false);
      navigate('/');
      window.location.reload();
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong with your request');
      }
      setIsLoading(false);
    }
  };

  /* -------------------- LOGOUT -------------------- */
  const logout = () => {
    localStorage.removeItem('ninja-token');
    localStorage.removeItem('ninja-user');
    localStorage.removeItem('ninja-cart');

    toast.success('You have successfully logged out!');
    navigate('/');
    window.location.reload();
  };

  return {
    login,
    signup,
    logout,
    handleChange,
    isLoading,
    userDetails,
  };
};

export default useAuth;
