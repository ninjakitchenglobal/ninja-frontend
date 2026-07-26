import { DEV_API } from '../lib/utils/api-url';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';
import type IProduct from '../interfaces/IProduct';

interface IUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}

export interface IUserOrder {
  _id: string;
  email: string;
  destinationCountry: string;
  address: string;
  orderNumber: string;
  products: IProduct[];
  orderProgress: number;
  createdAt: string;
  status: string;
}

const useProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<IUser | null>(null);
  const [userOrders, setUserOrders] = useState<IUserOrder[]>([]);

  const { user } = useAppContext();

  const getUser = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${DEV_API}/auth/get-user/${user}`);
      setUserDetails(res.data.data);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong with your request');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getUserPurchases = async () => {
    try {
      setIsLoading(true);

      const res = await axios.get(
        `${DEV_API}/purchase/get-user-purchases/${user}`,
      );

      setUserOrders(res.data.data);

      setIsLoading(false);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong with your request');
      }

      setIsLoading(false);
    }
  };

  return {
    getUser,
    isLoading,
    userDetails,
    getUserPurchases,
    userOrders,
  };
};

export default useProfile;
