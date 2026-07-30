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
            Payment confirmed! ✅{' '}
          </h1>
          <span className="text-center">
            <p>Payment confirmed Your order will be processed for delivery</p>
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
