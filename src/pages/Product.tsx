//IMPORTING HOOKS AND DEPS
import axios from 'axios';
import { useState, useEffect } from 'react';

import usePayment from '../hooks/usePayment';

import { toast, ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';

//IMPORTING TYPES AND INTERFACES
import type IProduct from '../interfaces/IProduct';

//IMPORTING HELPER COMPONENTS
import CombinedHeader from '../components/CombinedHeader';
//STATE MANAGEMENT
import { useAppDispatch } from '../lib/redux/hooks';
import { addToCart } from '../lib/redux/features/cartSlice';

import { DEV_API } from '../lib/utils/api-url';

const ProductPage = () => {
  const [productDetails, setProductDetails] = useState<IProduct>();

  const params = useParams();
  const { buyNow } = usePayment();

  useEffect(() => {
    const getProductData = async () => {
      try {
        const productData = await axios.get(
          `${DEV_API}/product/get-product/${params.productId}`,
        );
        setProductDetails(productData.data.data);
      } catch (error: any) {
        console.log(error);
        toast.error(error);
      }
    };

    getProductData();
  }, []);

  const dispatch = useAppDispatch();

  if (!productDetails) {
    return (
      <>
        <CombinedHeader />

        <section className="flex justify-center mt-70">
          <span className="loading loading-ring loading-xl w-25 tet-gray-500 block"></span>
        </section>
      </>
    );
  }

  const { title, description, price, picture, _id: productId } = productDetails;

  return (
    <main>
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

      <section className="h-screen mt-15 p-5 md:mt-30 md:p-10 lg:p-15 xl:px-30">
        <div>
          <h1 className="text-xl font-semibold text-gray-700 lg:text-2xl">
            {' '}
            {title}{' '}
          </h1>
        </div>

        <div className="mt-10 flex flex-col gap-5 items-center lg:flex-row lg:gap-20">
          <div className="aspect-square  relative w-full">
            <img src={picture} alt="" />
          </div>

          <div className="flex flex-col gap-5 w-full">
            <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
              {' '}
              {title}{' '}
            </h1>
            <h3 className="text-xl font-semibold text-gray-700 md:text-2xl">
              Hot Sales 🔥 - ${price}{' '}
            </h3>

            <span className="flex gap-5 justify-center">
              <button
                onClick={() => {
                  dispatch(addToCart(productId));

                  toast.success('Product added to cart');
                }}
                className="text-white bg-red-400 rounded-lg py-3 px-5 w-full text-center font-semibold hover:bg-red-500 cursor-pointer"
              >
                {' '}
                ADD TO CART{' '}
              </button>
              <span
                onClick={() => {
                  buyNow(productId!);
                }}
                className="text-white bg-green-400 rounded-lg py-3 px-5  w-full text-center font-semibold hover:bg-green-500 cursor-pointer"
              >
                {' '}
                BUY NOW{' '}
              </span>
            </span>
          </div>
        </div>

        <span className="block text-gray-700 text-sm mt-20">{description}</span>

        <div className="h-20"></div>
      </section>
    </main>
  );
};

export default ProductPage;
