//IMPORTING HELPER COMPONENTS
import CombinedHeader from '../components/CombinedHeader';

//IMPORTING HOOKS AND DEPS
import { useNavigate } from 'react-router-dom';

//IMPORTING PAGE ASSETS

import zelle from '../assets/payment-options/zelle.png';
import dollar from '../assets/payment-options/dollar.png';
import stripe from '../assets/payment-options/stripe.png';

const PaymentOptions = () => {
  const navigate = useNavigate();

  return (
    <>
      <CombinedHeader />
      <section className="mt-20 p-5 md:p-10 lg:p-15 xl:p-20 md:mt-40">
        <div>
          <h1 className="text-2xl text-center text-gray-700 font-semibold">
            {' '}
            Select a payment method{' '}
          </h1>
          <p className="text-gray-700 font-semibold">Paying with:</p>
        </div>

        <div className="mt-5 flex flex-col gap-5 items-center">
          <span
            onClick={() => {
              navigate('/payment-options/zelle');
            }}
            className="flex items-center gap-3 border border-gray-600 rounded-lg p-2 w-[60%] cursor-pointer"
          >
            <img src={zelle} alt="" className="w-15 h-15 rounded-lg" />
            <p className=" text-gray-700 font-semibold"> Zelle </p>
          </span>

          <span
            onClick={() => {
              navigate('/payment-options/bank-transfer');
            }}
            className="flex items-center gap-3 border border-gray-600 rounded-lg p-2 w-[60%] cursor-pointer"
          >
            <img src={dollar} alt="" className="w-15 h-15 rounded-lg" />
            <p className=" text-gray-700 font-semibold"> Bank Transfer </p>
          </span>

          <span
            onClick={() => {
              navigate('/make-payment');
            }}
            className="flex items-center gap-3 border border-gray-600 rounded-lg p-2 w-[60%] cursor-pointer"
          >
            <img src={stripe} alt="" className="w-15 h-15 rounded-lg" />
            <p className=" text-gray-700 font-semibold"> Use Stripe </p>
          </span>
        </div>
      </section>
    </>
  );
};

export default PaymentOptions;
