//IMPORTING HELPER COMPONENTS
import CombinedHeader from '../components/CombinedHeader';

//IMPORTING HOOKS
import { useNavigate } from 'react-router-dom';

const PaymentConfirmation = () => {
  const navigate = useNavigate();
  return (
    <>
      <CombinedHeader />

      <section className="mt-50">
        <div className="text-gray-700 border-2 border-gray-700 p-3 rounded-lg w-[80%] mx-auto">
          <h1 className="text-2xl font-semibold text-center mb-3">
            {' '}
            Payment confirmed!{' '}
          </h1>
          <span className="text-justify">
            <p>
              Please wait while we confirm your payment and process your order
            </p>
            <p>
              You will receive an email with your order number and shipping
              details
            </p>
            <p>
              In the event you don't receive an email, check your spam folder or
              send a picture of your payment receipt to our customer service
              email
            </p>
            <p>Thank you for choosing Ninja</p>
          </span>

          <button
            onClick={() => {
              navigate('/');
            }}
            className="bg-black text-white py-2 px-4 rounded-lg mt-3 block mx-auto cursor-pointer transition duration-200 hover:scale-105 active:scale-100"
          >
            Continue shopping
          </button>
        </div>
      </section>
    </>
  );
};

export default PaymentConfirmation;
