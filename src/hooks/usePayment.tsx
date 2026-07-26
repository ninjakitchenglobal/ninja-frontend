import axios from 'axios';
import { useAppDispatch } from '../lib/redux/hooks';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { DEV_API } from '../lib/utils/api-url';
import { uploadAndGetPublicUrl } from '../lib/utils/supabseUpload';
import { emptyCart } from '../lib/redux/features/cartSlice';
import { addToCart } from '../lib/redux/features/cartSlice';
import { useAppContext } from '../context/AppContext';

const usePayment = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, token } = useAppContext();

  const [isPurchaseLoading, setIsPurchaseLoading] = useState(false);
  const [purchaseDetails, setPurchaseDetails] = useState<{
    email: string;
    address: string;
  }>({
    email: '',
    address: '',
  });
  const [imagePreview, setImagePreview] = useState<string>();
  const [file, setFile] = useState<any>(null);

  //const sellerId = '69a3f71ccd3889fc9fd316a7';

  /*   const buyNow = async (paymentOption: string) => {
    try {
      if (!token || !user) {
        toast.error('Please login to continue');
        navigate('/login');
        return;
      }
      if (isLoading) {
        return;
      }

      if (cart.length === 0) {
        toast.error('Your cart is empty!');
        return;
      }

      setIsLoading(true);
      const response = await axios.post(`${DEV_API}/chat/get-or-create`, {
        productIds: cart,
        buyerId: user,
        sellerId,
        chatId: null,
        paymentOption,
      });

      navigate(`/customer-care-chat/${response.data.data.chatId}`);
      setIsLoading(false); 

      navigate(`payment-page/${paymentOption}`);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong with your request');
      }
      setIsLoading(false);
    }
  };
 */
  const confirmPayment = async () => {
    try {
      if (isPurchaseLoading) {
        return;
      }

      setIsPurchaseLoading(true);

      //EDGE CASES
      const { email, address } = purchaseDetails;
      if (!email || !address) {
        toast.error('Please fill the required form');
        setIsPurchaseLoading(false);
        return;
      }

      if (email.length < 1 || address.length < 1) {
        toast.error('Please fill the required form');
        setIsPurchaseLoading(false);
        return;
      }

      if (!file) {
        toast.error('Please upload your receipt');
        setIsPurchaseLoading(false);
        return;
      }
      //UPLOAD THE PICTURE
      const pictureUrl = await uploadAndGetPublicUrl(file as File, 'receipts');

      //SAVE THE PURCHASE TO THE DATABASE

      await axios.post(`${DEV_API}/purchase/create-purchase`, {
        email,
        address,
        receipt: pictureUrl,
      });
      setIsPurchaseLoading(false);
      dispatch(emptyCart());
      navigate('/payment-confirmation');
      toast.success('Payment confirmed!');
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong with your request');
      }

      setIsPurchaseLoading(false);
    }
  };

  //STRIP PAYMENT FUNCTIONALITY
  const payWithStripe = async (
    price: number,
    quantity: number,
    name: string,
    user: string,
    shippingDetails: { country: string; shippingAddress: string },
    cart: string[],
  ) => {
    const { shippingAddress, country } = shippingDetails;

    try {
      if (!shippingAddress) {
        toast.error('Please fill in the required fields');
        return;
      }

      setIsPurchaseLoading(true);
      const res = await axios.post(
        `${DEV_API}/purchase/create-stripe-purchase`,
        {
          price,
          quantity,
          name,
          user,
          address: shippingAddress,
          destinationCountry: country,
          productIds: cart.join(','),
        },
      );

      window.location.href = res.data.data.checkoutUrl;
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong with your request');
      }

      setIsPurchaseLoading(false);
    }
  };

  const buyNow = (productId: string) => {
    if (!user || !token) {
      toast.error('Please login to proceed');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
      return;
    }
    dispatch(addToCart(productId));
    navigate('/make-payment');
  };

  return {
    buyNow,
    imagePreview,
    setImagePreview,
    setFile,
    confirmPayment,
    purchaseDetails,
    setPurchaseDetails,
    isPurchaseLoading,
    payWithStripe,
  };
};

export default usePayment;
