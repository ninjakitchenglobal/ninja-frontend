import CombinedHeader from '../components/CombinedHeader';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '../lib/redux/hooks';
import { toast, ToastContainer } from 'react-toastify';
import { DEV_API } from '../lib/utils/api-url';
import usePayment from '../hooks/usePayment';

import { useAppContext } from '../context/AppContext';

//IMPORTING TYPES AND INTERFACES
import type IProduct from '../interfaces/IProduct';

const Stripe = () => {
  const cart = useAppSelector((store) => store.cartReducer);
  const { payWithStripe, isPurchaseLoading } = usePayment();

  const { user } = useAppContext();

  const [products, setProducts] = useState<IProduct[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shippingDetails, setShippingDetails] = useState({
    country: '',
    shippingAddress: '',
  });

  //FOR RECEIPT PROCESSING

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${DEV_API}/product/get-particular-products`,
          {
            params: {
              productIds: cart.join(','),
            },
          },
        );

        setProducts(res.data.data);

        setIsLoading(false);
      } catch (error: any) {
        if (error.response) {
          toast.error(error.response.data.message);
          console.log(error);
          setIsLoading(false);
        } else {
          console.log(error);
          toast.error('Something went wrong with your request');
          setIsLoading(false);
        }
      }
    };

    getProducts();
  }, []);

  const totalPrice = products?.reduce(
    (sum, product: IProduct) => sum + product.price,
    0,
  );

  const purchaseTitle = products?.map((product: IProduct) => {
    const productTitle = [];
    productTitle.push(product.title);
    return productTitle;
  });

  //ONCHANGE HANDLER FOR THE SHIPPING DETAILS
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setShippingDetails((prevDetails) => {
      return { ...prevDetails, [name]: value };
    });
  };

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
      {isLoading ? (
        <section className="flex justify-center mt-70">
          <span className="loading loading-ring loading-xl w-25 block" />
        </section>
      ) : (
        <section className="mt-30 px-10 md:mt-50">
          <div className="mb-10">
            <h1 className="text-2xl text-gray-700 font-semibold">
              {' '}
              Payment processing for:{' '}
            </h1>
            <ul className="text-gray-700 list-disc relative left-5">
              {products?.map((product: IProduct, i: number) => {
                return (
                  <li key={i} className="text-xs">
                    {' '}
                    {product.title.slice(0, 40)}... - ${product.price}{' '}
                  </li>
                );
              })}
            </ul>

            <p className="font-semibold text-gray-700">
              Total: $
              {products?.reduce(
                (sum, product: IProduct) => sum + product.price,
                0,
              )}
            </p>
          </div>

          <section className="text-gray-700">
            <div className=" mx-auto border-2 border-gray-400 p-5 rounded-lg">
              <h1 className="text-2xl text-gray-700 text-center font-semibold">
                {' '}
                Shipping Details{' '}
              </h1>

              <div className="w-[80%] mx-auto mt-10 flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Full name"
                  className="border-2 border-gray-400 rounded-lg p-2 w-full"
                  name="fullName"
                />
                <input
                  type="text"
                  placeholder="Phone number"
                  className="border-2 border-gray-400 rounded-lg p-2 w-full"
                  name="phoneNumber"
                />

                <input
                  type="text"
                  placeholder="Destination Country"
                  className="border-2 border-gray-400 rounded-lg p-2 w-full"
                  name="country"
                  value={shippingDetails.country}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="Shipping Address"
                  className="border-2 border-gray-400 rounded-lg p-2 w-full"
                  name="shippingAddress"
                  value={shippingDetails.shippingAddress}
                  onChange={handleChange}
                />
              </div>
              <button
                onClick={() => {
                  payWithStripe(
                    Number(totalPrice),
                    cart.length,
                    purchaseTitle!.join(', '),
                    user,
                    shippingDetails,
                    cart
                  );
                }}
                className="bg-slate-600 w-60 text-white font-semibold text-sm md:text-base rounded-lg mx-auto mt-5 p-2 flex flex-col gap-4 cursor-pointer"
              >
                {isPurchaseLoading ? (
                  <span className=" loading loading-ring loading-xl font-bold text-white block mx-auto"></span>
                ) : (
                  'Pay with Stripe'
                )}
              </button>
            </div>
          </section>
        </section>
      )}
    </>
  );
};

export default Stripe;
