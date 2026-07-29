import { DEV_API } from '../lib/utils/api-url';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../lib/redux/hooks';
import { toast } from 'react-toastify';
import { removeFromCart } from '../lib/redux/features/cartSlice';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

//IMPORTING TYPES AND INTERFACES
import type IProduct from '../interfaces/IProduct';

//IMPORTING HELPER HOOKS
import { useState } from 'react';

const useCart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((store) => store.cartReducer);
  const navigate = useNavigate();
  const { user, token } = useAppContext();

  const [isLoading, setIsLoading] = useState(false);
  const [cartDetails, setCartDetails] = useState<IProduct[]>([]);

  //GET PRODUCTS FROM SERVER
  const getCartProducts = async () => {
    try {
      setIsLoading(true);

      const productIds = cart.map((item) => item.productId);

      const res = await axios.get(
        `${DEV_API}/product/get-particular-products`,
        {
          params: {
            productIds: productIds.join(','),
          },
        },
      );

      const productsWithQuantity = res.data.data.map((product: any) => {
        const cartItem = cart.find((item) => item.productId === product._id);

        return {
          ...product,
          quantity: cartItem?.quantity ?? 0,
        };
      });

      setCartDetails(productsWithQuantity);
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

  //REMOVE CART ITEM
  const removeItem = (productId?: string) => {
    dispatch(removeFromCart(productId));
    setCartDetails((prev) => prev.filter((item) => item._id !== productId));
  };

  const proceedToCheckout = () => {
    if (!user || !token) {
      toast.error('Please login to proceed');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
      return;
    }
    navigate('/make-payment');
  };

  return {
    isLoading,
    removeItem,
    getCartProducts,
    cartDetails,
    proceedToCheckout,
  };
};

export default useCart;
