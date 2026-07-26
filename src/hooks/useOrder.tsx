//IMPORTING NECCESSARY DEPENDENCIES AND TYPES
import axios from 'axios';
import { useState } from 'react';
import { DEV_API } from '../lib/utils/api-url';
import type { IUserOrder } from './useProfile';
import { toast } from 'react-toastify';

const useOrder = () => {
  const [purchase, setPurchase] = useState<IUserOrder>();
  const [isLoading, setIsLoading] = useState(false);

  const getPurchase = async (purchaseId: string) => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${DEV_API}/purchase/get-particular-purchase/${purchaseId}`,
      );
      setPurchase(res.data.data);
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

  const progressOrder = async (purchaseId: string) => {
    try {
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      await axios.patch(`${DEV_API}/purchase/progress-purchase`, {
        purchaseId,
      });
      setIsLoading(false);
      toast.success('Order status progressed!');
      location.reload();
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
    getPurchase,
    isLoading,
    purchase,
    progressOrder,
  };
};

export default useOrder;
